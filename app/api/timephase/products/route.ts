import { NextResponse } from 'next/server';
import { mockProducts } from '@/lib/mock-data';

export async function GET() {
  try {
    // Return all products for time-phased data
    const formattedProducts = mockProducts.map(product => ({
      PRODUCT_ID: product.PRODUCT_ID,
      DESCRIPTION: product.DESCRIPTION
    }));
    
    return NextResponse.json({ 
      success: true,
      data: formattedProducts 
    });
  } catch (error: any) {
    console.error('Error fetching time-phased products:', error);
    return NextResponse.json({ 
      success: false,
      error: error.message 
    }, { status: 500 });
  }
} 