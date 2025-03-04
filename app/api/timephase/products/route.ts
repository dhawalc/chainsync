import { NextResponse } from 'next/server';
import { initializeSnowflake, connectSnowflake, executeQuery } from '@/lib/snowflake';

export async function GET() {
  try {
    console.log("Initializing Snowflake connection for time-phased products...");
    const connection = initializeSnowflake();
    
    console.log("Connecting to Snowflake...");
    await connectSnowflake(connection);
    console.log("Connected to Snowflake successfully");

    // Set session context
    await executeQuery(connection, `USE WAREHOUSE ${process.env.SNOWFLAKE_WAREHOUSE}`);
    await executeQuery(connection, `USE DATABASE ${process.env.SNOWFLAKE_DATABASE}`);
    await executeQuery(connection, `USE SCHEMA ${process.env.SNOWFLAKE_SCHEMA}`);

    // Get all unique product IDs from the time-phased data
    const query = `
      SELECT DISTINCT tp.PRODUCT_ID, pm.DESCRIPTION
      FROM TIME_PHASED_CYCLETIME tp
      LEFT JOIN PRODUCT_MASTER pm ON tp.PRODUCT_ID = pm.PRODUCT_ID
      ORDER BY tp.PRODUCT_ID
    `;
    
    console.log(`Executing query: ${query}`);
    const products = await executeQuery(connection, query);
    
    // Format the products with proper descriptions
    const formattedProducts = products.map(product => ({
      PRODUCT_ID: product.PRODUCT_ID,
      DESCRIPTION: product.DESCRIPTION || `Product ${product.PRODUCT_ID}`
    }));
    
    return NextResponse.json({ 
      success: true,
      data: formattedProducts 
    });
  } catch (error: any) {
    console.error('Error fetching time-phased products:', error);
    return NextResponse.json({ 
      success: false,
      error: error.message 
    }, { status: 500 });
  }
} 