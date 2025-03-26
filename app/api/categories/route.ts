// app/api/categories/route.ts
import { NextResponse } from 'next/server';
import { mockCategories } from '@/lib/mock-data';

export async function GET() {
  try {
    return NextResponse.json(mockCategories);
  } catch (error: any) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
