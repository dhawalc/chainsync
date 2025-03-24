import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export async function GET() {
  try {
    // Return mock data for testing
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      tables: [
        { table_name: "MOCK_TABLE_1" },
        { table_name: "MOCK_TABLE_2" },
        { table_name: "MOCK_TABLE_3" }
      ]
    });
  } catch (error) {
    console.error('API /snowflake-test: Error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to connect to Snowflake'
    }, { status: 500 });
  }
} 