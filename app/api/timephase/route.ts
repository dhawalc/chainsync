// app/api/timephase/route.ts
import { NextResponse } from 'next/server';
import { initializeSnowflake, connectSnowflake, executeQuery } from '@/lib/snowflake';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const bucket = searchParams.get('bucket') || 'WEEKLY';

    console.log("Initializing Snowflake connection for timephase...");
    const connection = initializeSnowflake();
    
    console.log("Connecting to Snowflake...");
    await connectSnowflake(connection);
    console.log("Connected to Snowflake successfully");

    // Set session context
    console.log(`Using warehouse: ${process.env.SNOWFLAKE_WAREHOUSE}`);
    await executeQuery(connection, `USE WAREHOUSE ${process.env.SNOWFLAKE_WAREHOUSE}`);
    
    console.log(`Using database: ${process.env.SNOWFLAKE_DATABASE}`);
    await executeQuery(connection, `USE DATABASE ${process.env.SNOWFLAKE_DATABASE}`);
    
    console.log(`Using schema: ${process.env.SNOWFLAKE_SCHEMA}`);
    await executeQuery(connection, `USE SCHEMA ${process.env.SNOWFLAKE_SCHEMA}`);

    // Query the time phased table filtering by bucket type
    console.log(`Executing query for bucket type: ${bucket}`);
    const rows = await executeQuery(
      connection,
      `SELECT PRODUCT_ID, START_DATE, END_DATE, CYCLE_TIME 
       FROM TIME_PHASED_CYCLETIME
       WHERE BUCKET_TYPE = '${bucket}'`
    );
    
    console.log(`Retrieved ${rows.length} rows`);
    if (rows.length > 0) {
      console.log("Sample row:", JSON.stringify(rows[0]));
    }
    
    return NextResponse.json({ 
      success: true,
      data: rows 
    });
  } catch (error: any) {
    console.error('Error fetching time-phase data:', error);
    return NextResponse.json({ 
      success: false,
      error: error.message 
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { bucket, data } = body; // 'data' is an array of time-phase rows
    
    console.log("Received POST request with data:", JSON.stringify(body).substring(0, 200));
    
    const connection = initializeSnowflake();
    await connectSnowflake(connection);

    await executeQuery(connection, `USE WAREHOUSE ${process.env.SNOWFLAKE_WAREHOUSE}`);
    await executeQuery(connection, `USE DATABASE ${process.env.SNOWFLAKE_DATABASE}`);
    await executeQuery(connection, `USE SCHEMA ${process.env.SNOWFLAKE_SCHEMA}`);

    // Loop through each row and use MERGE to upsert
    for (const row of data) {
      console.log(`Processing row for product_id: ${row.PRODUCT_ID}`);
      
      // Ensure dates are properly formatted
      const startDate = row.START_DATE ? `'${row.START_DATE}'` : 'NULL';
      const endDate = row.END_DATE ? `'${row.END_DATE}'` : 'NULL';
      
      // In production, parameterize queries to avoid SQL injection
      const sql = `
        MERGE INTO TIME_PHASED_CYCLETIME AS target
        USING (
          SELECT 
            '${row.PRODUCT_ID}' AS PRODUCT_ID,
            ${startDate} AS START_DATE,
            '${bucket}' AS BUCKET_TYPE
        ) AS source
        ON target.PRODUCT_ID = source.PRODUCT_ID
           AND target.START_DATE = source.START_DATE
           AND target.BUCKET_TYPE = source.BUCKET_TYPE
        WHEN MATCHED THEN 
          UPDATE SET CYCLE_TIME = ${row.CYCLE_TIME}, END_DATE = ${endDate}
        WHEN NOT MATCHED THEN 
          INSERT (PRODUCT_ID, START_DATE, END_DATE, CYCLE_TIME, BUCKET_TYPE)
          VALUES ('${row.PRODUCT_ID}', ${startDate}, ${endDate}, ${row.CYCLE_TIME}, '${bucket}');
      `;
      
      console.log("Executing SQL:", sql);
      await executeQuery(connection, sql);
    }
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error saving time-phase data:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
