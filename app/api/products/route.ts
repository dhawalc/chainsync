// app/api/products/route.ts
import { NextResponse } from 'next/server';
import { mockProducts, mockCategories } from '@/lib/mock-data';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    let filteredProducts = [...mockProducts];
    
    // Filter by category if specified
    if (category) {
      filteredProducts = mockProducts.filter(p => p.CATEGORY === category);
    }
    
    return NextResponse.json({ 
      success: true,
      data: filteredProducts 
    });
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ 
      success: false,
      error: error.message 
    }, { status: 500 });
  }
}
