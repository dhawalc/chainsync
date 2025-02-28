// app/api/audit/route.ts
import { NextResponse } from 'next/server';
import { initializeSnowflake, connectSnowflake } from '@/lib/snowflake';

export async function GET() {
  const connection = initializeSnowflake();
  try {
    await connectSnowflake(connection);
    const rows = await new Promise((resolve, reject) => {
      connection.execute({
        sqlText: 'SELECT * FROM AUDIT_LOGS',
        complete: (err, stmt, rows) => {
          if (err) reject(err);
          else resolve(rows);
        },
      });
    });
    return NextResponse.json(rows);
  } catch (error: any) {
    console.error('Error fetching audit logs:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
