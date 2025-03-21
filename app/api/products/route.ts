// app/api/products/route.ts
import { NextResponse } from 'next/server';
import { initializeSnowflake, connectSnowflake, executeQuery } from '@/lib/snowflake';
import { mockProducts, mockCategories, mockProductCategories, shouldUseMockData } from '@/lib/mock-data';

export { dynamic, runtime } from '../route.config'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    // Check if we should use mock data
    if (shouldUseMockData()) {
      console.log("Using mock data for products API");
      
      let filteredProducts = [...mockProducts];
      
      // Filter by category if specified
      if (category) {
        // Get product IDs in this category
        const productIdsInCategory = mockProductCategories
          .filter(pc => pc.CATEGORY_ID === category)
          .map(pc => pc.PRODUCT_ID);
        
        // Filter products by these IDs
        filteredProducts = mockProducts.filter(p => 
          productIdsInCategory.includes(String(p.PRODUCT_ID))
        );
      }
      
      return NextResponse.json({ 
        success: true,
        data: filteredProducts 
      });
    }
    
    // Continue with real Snowflake connection
    console.log("Initializing Snowflake connection for products...");
    const connection = initializeSnowflake();
    
    console.log("Connecting to Snowflake...");
    await connectSnowflake(connection);
    console.log("Connected to Snowflake successfully");

    // Set session context
    await executeQuery(connection, `USE WAREHOUSE ${process.env.SNOWFLAKE_WAREHOUSE}`);
    await executeQuery(connection, `USE DATABASE ${process.env.SNOWFLAKE_DATABASE}`);
    await executeQuery(connection, `USE SCHEMA ${process.env.SNOWFLAKE_SCHEMA}`);

    // First, let's check the structure of PRODUCT_MASTER
    const describeQuery = `DESCRIBE TABLE PRODUCT_MASTER`;
    console.log(`Executing query: ${describeQuery}`);
    const tableStructure = await executeQuery(connection, describeQuery);
    console.log("PRODUCT_MASTER structure:", tableStructure);

    // Get all products without filtering by category
    let query = `SELECT * FROM PRODUCT_MASTER`;
    
    // We'll filter by category in JavaScript if needed
    console.log(`Executing query: ${query}`);
    let products = await executeQuery(connection, query);
    
    // If category is specified, try to filter products
    if (category) {
      console.log(`Filtering products by category: ${category}`);
      
      // Check if there's a direct category column in PRODUCT_MASTER
      const hasCategoryColumn = tableStructure.some((col: any) => 
        col.name.toUpperCase().includes('CATEGORY')
      );
      
      if (hasCategoryColumn) {
        // If we have a category column, filter in the database
        const categoryColumnName = tableStructure.find((col: any) => 
          col.name.toUpperCase().includes('CATEGORY')
        ).name;
        
        query = `SELECT * FROM PRODUCT_MASTER WHERE ${categoryColumnName} = '${category}'`;
        console.log(`Executing category filter query: ${query}`);
        products = await executeQuery(connection, query);
      } else {
        // Otherwise, try to join with PRODUCT_CATEGORY if it exists
        try {
          const joinQuery = `
            SELECT pm.* 
            FROM PRODUCT_MASTER pm
            JOIN PRODUCT_CATEGORY pc ON pm.PRODUCT_ID = pc.PRODUCT_ID
            WHERE pc.CATEGORY_ID = '${category}'
          `;
          console.log(`Trying join query: ${joinQuery}`);
          products = await executeQuery(connection, joinQuery);
        } catch (joinError) {
          console.error('Join query failed:', joinError);
          // Keep the original products if join fails
        }
      }
    }
    
    // Format the response to ensure we have PRODUCT_ID and DESCRIPTION
    const formattedProducts = products.map((product: any) => ({
      PRODUCT_ID: product.PRODUCT_ID,
      DESCRIPTION: product.DESCRIPTION || product.NAME || `Product ${product.PRODUCT_ID}`
    }));
    
    return NextResponse.json({ 
      success: true,
      data: formattedProducts 
    });
  } catch (error: any) {
    console.error('Error fetching products:', error);
    
    // Fallback to mock data on error
    console.log("Falling back to mock data due to error");
    return NextResponse.json({ 
      success: true,
      data: mockProducts,
      _isMockData: true
    });
  }
}
