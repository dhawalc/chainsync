import { NextResponse } from 'next/server';
import { mockHierarchyData, mockProducts } from '@/lib/mock-data';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const hierarchyId = searchParams.get('hierarchyId');
    
    if (hierarchyId) {
      // If hierarchyId is provided, fetch products for that hierarchy
      const node = mockHierarchyData.find(n => n.HIERARCHY_ID === hierarchyId);
      if (!node) {
        return NextResponse.json({ 
          success: false,
          error: 'Hierarchy node not found' 
        }, { status: 404 });
      }
      
      // For demo purposes, return all products in the same category
      const products = mockProducts.filter(p => p.CATEGORY === node.HIERARCHY_ID);
      
      return NextResponse.json({ 
        success: true,
        data: products 
      });
    } else {
      // If no hierarchyId, return root nodes
      const rootNodes = mockHierarchyData.filter(node => node.PARENT_ID === null);
      
      return NextResponse.json({ 
        success: true,
        data: rootNodes 
      });
    }
  } catch (error: any) {
    console.error('Error fetching product hierarchy:', error);
    return NextResponse.json({ 
      success: false,
      error: error.message 
    }, { status: 500 });
  }
} 