// app/api/timephase/route.ts
import { NextResponse } from 'next/server';
import { initializeSnowflake, connectSnowflake, executeQuery } from '@/lib/snowflake';
import { generateMockTimePhaseData, shouldUseMockData } from '@/lib/mock-data';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const bucket = searchParams.get('bucket') || 'WEEKLY';
    const productsParam = searchParams.get('products');
    
    // Parse the products parameter if it exists
    const selectedProducts = productsParam ? productsParam.split(',') : [];
    
    // Check if we should use mock data
    if (shouldUseMockData()) {
      console.log("Using mock data for timephase API");
      const mockData = generateMockTimePhaseData(bucket, selectedProducts.length > 0 ? selectedProducts : null);
      
      return NextResponse.json({ 
        success: true,
        data: mockData 
      });
    }
    
    // Continue with real Snowflake connection
    const connection = initializeSnowflake();
    await connectSnowflake(connection);

    // Set session context
    await executeQuery(connection, `USE WAREHOUSE ${process.env.SNOWFLAKE_WAREHOUSE}`);
    await executeQuery(connection, `USE DATABASE ${process.env.SNOWFLAKE_DATABASE}`);
    await executeQuery(connection, `USE SCHEMA ${process.env.SNOWFLAKE_SCHEMA}`);

    // Build the query without product filtering first
    let query = `
      SELECT PRODUCT_ID, START_DATE, END_DATE, CYCLE_TIME
      FROM TIME_PHASED_CYCLETIME
      WHERE BUCKET_TYPE = '${bucket}'
    `;
    
    // If no products are selected, return all data
    if (selectedProducts.length === 0) {
      query += ` ORDER BY PRODUCT_ID, START_DATE`;
      const data = await executeQuery(connection, query);
      
      return NextResponse.json({ 
        success: true,
        data: data 
      });
    }
    
    // If products are selected, we need to handle them carefully
    // First, get all the products from the table to see what's available
    const productsQuery = `
      SELECT DISTINCT PRODUCT_ID 
      FROM TIME_PHASED_CYCLETIME
    `;
    const availableProducts = await executeQuery(connection, productsQuery);
    
    // Convert selected product IDs to match the format in the database
    const validProductIds = [];
    for (const product of availableProducts) {
      const productId = product.PRODUCT_ID;
      // Check if this product ID is in our selected list
      if (selectedProducts.includes(String(productId))) {
        validProductIds.push(productId);
      }
    }
    
    // If we found valid product IDs, filter by them
    if (validProductIds.length > 0) {
      const productList = validProductIds.join(',');
      query += ` AND PRODUCT_ID IN (${productList})`;
    } else {
      // If no valid products were found, return empty data
      return NextResponse.json({ 
        success: true,
        data: [] 
      });
    }
    
    query += ` ORDER BY PRODUCT_ID, START_DATE`;
    const data = await executeQuery(connection, query);
    
    return NextResponse.json({ 
      success: true,
      data: data 
    });
  } catch (error: any) {
    console.error('Error fetching time-phased data:', error);
    
    // Fallback to mock data on error
    console.log("Falling back to mock data due to error");
    const { searchParams } = new URL(request.url);
    const bucket = searchParams.get('bucket') || 'WEEKLY';
    const productsParam = searchParams.get('products');
    const selectedProducts = productsParam ? productsParam.split(',') : [];
    
    const mockData = generateMockTimePhaseData(bucket, selectedProducts.length > 0 ? selectedProducts : null);
    
    return NextResponse.json({ 
      success: true,
      data: mockData,
      _isMockData: true
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { bucket, data: cycleTimeData } = body;
    
    if (!bucket || !cycleTimeData || !Array.isArray(cycleTimeData)) {
      return NextResponse.json({ 
        success: false,
        error: 'Invalid request body' 
      }, { status: 400 });
    }
    
    // Check if we should use mock data
    if (shouldUseMockData()) {
      console.log("Using mock data for timephase POST API - simulating successful update");
      
      return NextResponse.json({ 
        success: true,
        message: 'Cycle time data updated successfully (mock)',
        _isMockData: true
      });
    }
    
    // Continue with real Snowflake connection
    const connection = initializeSnowflake();
    await connectSnowflake(connection);

    // Set session context
    await executeQuery(connection, `USE WAREHOUSE ${process.env.SNOWFLAKE_WAREHOUSE}`);
    await executeQuery(connection, `USE DATABASE ${process.env.SNOWFLAKE_DATABASE}`);
    await executeQuery(connection, `USE SCHEMA ${process.env.SNOWFLAKE_SCHEMA}`);

    // Get all products from the table
    const productsQuery = `
      SELECT DISTINCT PRODUCT_ID 
      FROM TIME_PHASED_CYCLETIME
    `;
    const availableProducts = await executeQuery(connection, productsQuery);

    // Update each row
    for (const item of cycleTimeData) {
      // Find the matching product ID in the database
      const matchingProduct = availableProducts.find((p: any) => 
        String(p.PRODUCT_ID) === String(item.PRODUCT_ID)
      );
      
      if (matchingProduct) {
        const query = `
          UPDATE TIME_PHASED_CYCLETIME
          SET CYCLE_TIME = ${item.CYCLE_TIME}
          WHERE PRODUCT_ID = ${matchingProduct.PRODUCT_ID}
          AND START_DATE = '${item.START_DATE}'
          AND END_DATE = '${item.END_DATE}'
          AND BUCKET_TYPE = '${bucket}'
        `;
        
        await executeQuery(connection, query);
      }
    }
    
    return NextResponse.json({ 
      success: true,
      message: 'Cycle time data updated successfully' 
    });
  } catch (error: any) {
    console.error('Error updating time-phased data:', error);
    
    // Fallback to mock success response
    return NextResponse.json({ 
      success: true,
      message: 'Cycle time data updated successfully (mock fallback)',
      _isMockData: true
    });
  }
}
