import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export async function GET() {
  try {
    // Return mock data for testing
    const mockTables = [
      { table_name: "MOCK_TABLE_1" },
      { table_name: "MOCK_TABLE_2" },
      { table_name: "MOCK_TABLE_3" }
    ];
    
    return NextResponse.json({ tables: mockTables });
  } catch (error) {
    console.error('Error exploring Snowflake:', error);
    return NextResponse.json({ error: 'Failed to explore Snowflake schema' }, { status: 500 });
  }
} 