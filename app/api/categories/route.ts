// app/api/categories/route.ts
import { NextResponse } from 'next/server';
import { initializeSnowflake, connectSnowflake, executeQuery } from '@/lib/snowflake';

export async function GET() {
  try {
    const connection = initializeSnowflake();
    await connectSnowflake(connection);
    
    // Set the warehouse, database, and schema
    await executeQuery(connection, `USE WAREHOUSE ${process.env.SNOWFLAKE_WAREHOUSE}`);
    await executeQuery(connection, `USE DATABASE ${process.env.SNOWFLAKE_DATABASE}`);
    await executeQuery(connection, `USE SCHEMA ${process.env.SNOWFLAKE_SCHEMA}`);
    
    // Execute the query
    const rows = await executeQuery(connection, 'SELECT * FROM CATEGORIES');
    
    return NextResponse.json(rows);
  } catch (error: any) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
