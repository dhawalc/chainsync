import { NextResponse } from 'next/server';
import { mockCategories } from '@/lib/mock-data';

// Define the category structure
interface Category {
  CATEGORY_ID?: string | number;
  CATEGORY_NAME?: string;
  ID?: string | number;
  NAME?: string;
  DESCRIPTION?: string;
  [key: string]: any; // Allow for additional properties
}

export async function GET() {
  try {
    return NextResponse.json({ 
      success: true,
      categories: mockCategories
    });
  } catch (error: any) {
    console.error('Error fetching product categories:', error);
    return NextResponse.json({ 
      success: false,
      error: error.message 
    }, { status: 500 });
  }
} 