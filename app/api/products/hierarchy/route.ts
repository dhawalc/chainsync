import { NextResponse } from 'next/server';
import { initializeSnowflake, connectSnowflake, executeQuery } from '@/lib/snowflake';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const hierarchyId = searchParams.get('hierarchyId');
    
    console.log("Initializing Snowflake connection for product hierarchy...");
    const connection = initializeSnowflake();
    
    console.log("Connecting to Snowflake...");
    await connectSnowflake(connection);
    console.log("Connected to Snowflake successfully");

    // Set session context
    await executeQuery(connection, `USE WAREHOUSE ${process.env.SNOWFLAKE_WAREHOUSE}`);
    await executeQuery(connection, `USE DATABASE ${process.env.SNOWFLAKE_DATABASE}`);
    await executeQuery(connection, `USE SCHEMA ${process.env.SNOWFLAKE_SCHEMA}`);

    let query;
    
    if (hierarchyId) {
      // If hierarchyId is provided, fetch products for that hierarchy
      // This is a placeholder query - adjust based on your actual schema
      query = `
        SELECT p.PRODUCT_ID, p.DESCRIPTION
        FROM PRODUCT_MASTER p
        JOIN HIERARCHY_CLOSURE hc ON p.PRODUCT_ID = hc.CHILD_ID
        WHERE hc.PARENT_ID = '${hierarchyId}'
      `;
    } else {
      // If no hierarchyId, fetch top-level hierarchies
      // This is a placeholder query - adjust based on your actual schema
      query = `
        SELECT DISTINCT h.HIERARCHY_ID, h.HIERARCHY_NAME
        FROM HIERARCHY_TREE h
        WHERE h.PARENT_ID IS NULL
      `;
    }
    
    console.log(`Executing query: ${query}`);
    const rows = await executeQuery(connection, query);
    
    return NextResponse.json({ 
      success: true,
      data: rows 
    });
  } catch (error: any) {
    console.error('Error fetching product hierarchy:', error);
    return NextResponse.json({ 
      success: false,
      error: error.message 
    }, { status: 500 });
  }
} 