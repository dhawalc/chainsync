// app/api/products/route.ts
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export async function GET() {
  try {
    // Return mock data for now
    const mockProducts = [
      { PRODUCT_ID: "P001", DESCRIPTION: "Product 1" },
      { PRODUCT_ID: "P002", DESCRIPTION: "Product 2" },
      { PRODUCT_ID: "P003", DESCRIPTION: "Product 3" }
    ];
    
    return NextResponse.json({ products: mockProducts });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
