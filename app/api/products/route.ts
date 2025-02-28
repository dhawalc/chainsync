// app/api/products/route.ts
// app/api/products/route.ts
import { NextResponse } from 'next/server';
import { initializeSnowflake, connectSnowflake, executeQuery } from '@/lib/snowflake';

export async function GET() {
  try {
    console.log("Initializing Snowflake connection...");
    const connection = initializeSnowflake();
    
    console.log("Connecting to Snowflake...");
    await connectSnowflake(connection);
    console.log("Connected to Snowflake successfully");
    
    // Log environment variables (without sensitive info)
    console.log(`Using database: ${process.env.SNOWFLAKE_DATABASE}`);
    console.log(`Using schema: ${process.env.SNOWFLAKE_SCHEMA}`);
    console.log(`Using warehouse: ${process.env.SNOWFLAKE_WAREHOUSE}`);
    
    // Query the PRODUCT_MASTER table with all columns
    console.log("Executing SELECT * FROM CHAINSYNCDB.SCM.PRODUCT_MASTER LIMIT 100 query...");
    const products = await executeQuery(
      connection,
      `SELECT * FROM CHAINSYNCDB.SCM.PRODUCT_MASTER LIMIT 100`
    );
    console.log("Products count:", products.length);
    console.log("First product:", JSON.stringify(products[0]));
    
    return NextResponse.json({ 
      success: true,
      products: products
    });
  } catch (error: any) {
    console.error('Error details:', error);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('SQL state:', error.sqlState);
    if (error.data) {
      console.error('Error data:', JSON.stringify(error.data));
    }
    return NextResponse.json({ 
      success: false,
      error: error.message 
    }, { status: 500 });
  }
}
