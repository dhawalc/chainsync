import { NextResponse } from 'next/server';
import { getSnowflakeConnection } from '@/lib/snowflake';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export async function GET() {
  try {
    const snowflake = await getSnowflakeConnection();
    
    // Get list of tables
    const tablesQuery = `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = CURRENT_SCHEMA()
    `;
    
    const tables = await snowflake.execute(tablesQuery);
    
    return NextResponse.json({ tables });
  } catch (error) {
    console.error('Error exploring Snowflake:', error);
    return NextResponse.json({ error: 'Failed to explore Snowflake schema' }, { status: 500 });
  }
} 