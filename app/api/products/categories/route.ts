import { NextResponse } from 'next/server';
import { initializeSnowflake, connectSnowflake, executeQuery } from '@/lib/snowflake';

export async function GET() {
  try {
    console.log("Initializing Snowflake connection for product categories...");
    const connection = initializeSnowflake();
    
    console.log("Connecting to Snowflake...");
    await connectSnowflake(connection);
    console.log("Connected to Snowflake successfully");

    // Set session context
    await executeQuery(connection, `USE WAREHOUSE ${process.env.SNOWFLAKE_WAREHOUSE}`);
    await executeQuery(connection, `USE DATABASE ${process.env.SNOWFLAKE_DATABASE}`);
    await executeQuery(connection, `USE SCHEMA ${process.env.SNOWFLAKE_SCHEMA}`);

    // First, let's get the column names from PRODUCT_CATEGORY
    const describeQuery = `DESCRIBE TABLE PRODUCT_CATEGORY`;
    console.log(`Executing query: ${describeQuery}`);
    const tableStructure = await executeQuery(connection, describeQuery);
    console.log("PRODUCT_CATEGORY structure:", tableStructure);

    // Get all columns from PRODUCT_CATEGORY
    const query = `SELECT * FROM PRODUCT_CATEGORY`;
    console.log(`Executing query: ${query}`);
    const categories = await executeQuery(connection, query);
    console.log("Raw categories data:", categories);
    
    // Create a more robust response that handles different column names
    const formattedCategories = categories.map(cat => {
      // Try to find the ID and name columns with various possible names
      const id = cat.CATEGORY_ID || cat.ID || Object.values(cat)[0];
      const name = cat.CATEGORY_NAME || cat.NAME || cat.DESCRIPTION || `Category ${id}`;
      
      return {
        CATEGORY_ID: id,
        CATEGORY_NAME: name
      };
    });
    
    return NextResponse.json({ 
      success: true,
      data: formattedCategories 
    });
  } catch (error: any) {
    console.error('Error fetching product categories:', error);
    return NextResponse.json({ 
      success: false,
      error: error.message 
    }, { status: 500 });
  }
} 