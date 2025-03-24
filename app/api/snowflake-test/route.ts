import { NextResponse } from 'next/server';
import { getSnowflakeConnection } from '@/lib/snowflake';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export async function GET() {
  try {
    console.log('API /snowflake-test: Starting connection test');
    
    // Log environment variables (without sensitive values)
    console.log('API /snowflake-test: Environment variables:');
    console.log('  SNOWFLAKE_ACCOUNT:', process.env.SNOWFLAKE_ACCOUNT);
    console.log('  SNOWFLAKE_USERNAME:', process.env.SNOWFLAKE_USERNAME);
    console.log('  SNOWFLAKE_DATABASE:', process.env.SNOWFLAKE_DATABASE);
    console.log('  SNOWFLAKE_SCHEMA:', process.env.SNOWFLAKE_SCHEMA);
    console.log('  SNOWFLAKE_WAREHOUSE:', process.env.SNOWFLAKE_WAREHOUSE);
    console.log('  SNOWFLAKE_ROLE:', process.env.SNOWFLAKE_ROLE);
    console.log('  SNOWFLAKE_REGION:', process.env.SNOWFLAKE_REGION);
    
    console.log('API /snowflake-test: Creating connection');
    const snowflake = await getSnowflakeConnection();
    
    console.log('API /snowflake-test: Executing simple test query');
    const query = 'SELECT CURRENT_TIMESTAMP()';
    const result = await snowflake.execute(query);
    
    console.log('API /snowflake-test: Listing available tables');
    const tablesQuery = `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = CURRENT_SCHEMA()
    `;
    const tables = await snowflake.execute(tablesQuery);
    
    console.log('API /snowflake-test: Closing connection');
    
    return NextResponse.json({
      success: true,
      timestamp: result[0],
      tables: tables
    });
  } catch (error) {
    console.error('API /snowflake-test: Error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to connect to Snowflake'
    }, { status: 500 });
  }
} 