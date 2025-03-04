import { NextResponse } from 'next/server';
import { initializeSnowflake, connectSnowflake, executeQuery } from '@/lib/snowflake';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    
    console.log("Initializing Snowflake connection for exploration...");
    const connection = initializeSnowflake();
    
    console.log("Connecting to Snowflake...");
    await connectSnowflake(connection);
    console.log("Connected to Snowflake successfully");

    // Set session context
    await executeQuery(connection, `USE WAREHOUSE ${process.env.SNOWFLAKE_WAREHOUSE}`);
    await executeQuery(connection, `USE DATABASE ${process.env.SNOWFLAKE_DATABASE}`);
    await executeQuery(connection, `USE SCHEMA ${process.env.SNOWFLAKE_SCHEMA}`);

    let sqlQuery = '';
    
    switch(query) {
      case 'tables':
        sqlQuery = "SHOW TABLES";
        break;
      case 'time_phased_structure':
        sqlQuery = "DESCRIBE TABLE TIME_PHASED_CYCLETIME";
        break;
      case 'product_structure':
        sqlQuery = "DESCRIBE TABLE PRODUCT_MASTER";
        break;
      case 'hierarchy_tables':
        sqlQuery = "SHOW TABLES LIKE '%HIERARCHY%' OR '%TREE%' OR '%CLOSURE%'";
        break;
      case 'bucket_types':
        sqlQuery = "SELECT DISTINCT BUCKET_TYPE FROM TIME_PHASED_CYCLETIME";
        break;
      case 'product_sample':
        sqlQuery = "SELECT * FROM PRODUCT_MASTER LIMIT 10";
        break;
      case 'time_phased_sample':
        sqlQuery = "SELECT * FROM TIME_PHASED_CYCLETIME LIMIT 10";
        break;
      case 'hierarchy_columns':
        sqlQuery = `
          SELECT column_name, table_name 
          FROM information_schema.columns 
          WHERE table_schema = '${process.env.SNOWFLAKE_SCHEMA}'
          AND (column_name LIKE '%HIERARCHY%' OR column_name LIKE '%PARENT%' OR column_name LIKE '%CHILD%')
        `;
        break;
      default:
        sqlQuery = searchParams.get('custom_query') || "SHOW TABLES";
    }
    
    console.log(`Executing query: ${sqlQuery}`);
    const rows = await executeQuery(connection, sqlQuery);
    
    return NextResponse.json({ 
      success: true,
      query: sqlQuery,
      data: rows 
    });
  } catch (error: any) {
    console.error('Error exploring Snowflake:', error);
    return NextResponse.json({ 
      success: false,
      error: error.message 
    }, { status: 500 });
  }
} 