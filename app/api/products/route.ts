// app/api/products/route.ts
import { NextResponse } from 'next/server';
import { getSnowflakeConnection } from '@/lib/snowflake';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export async function GET() {
  try {
    const snowflake = await getSnowflakeConnection();
    const query = `
      SELECT DISTINCT tp.PRODUCT_ID, pm.DESCRIPTION
      FROM TIME_PHASED_CYCLETIME tp
      LEFT JOIN PRODUCT_MASTER pm ON tp.PRODUCT_ID = pm.PRODUCT_ID
      ORDER BY tp.PRODUCT_ID
    `;
    
    const result = await snowflake.execute(query);
    return NextResponse.json({ products: result });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
