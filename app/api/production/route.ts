import { NextResponse } from 'next/server';

// Mock production data
const mockProductionData = [
  { id: 1, product_id: 'P1001', product_name: 'MacBook Pro', week: 'Week 1', planned_quantity: 500, actual_quantity: 480, efficiency: 96, status: 'On Track' },
  { id: 2, product_id: 'P1001', product_name: 'MacBook Pro', week: 'Week 2', planned_quantity: 550, actual_quantity: 540, efficiency: 98, status: 'On Track' },
  { id: 3, product_id: 'P1001', product_name: 'MacBook Pro', week: 'Week 3', planned_quantity: 600, actual_quantity: 590, efficiency: 98, status: 'On Track' },
  { id: 4, product_id: 'P1002', product_name: 'iPhone 13', week: 'Week 1', planned_quantity: 1000, actual_quantity: 950, efficiency: 95, status: 'Behind' },
  { id: 5, product_id: 'P1002', product_name: 'iPhone 13', week: 'Week 2', planned_quantity: 1200, actual_quantity: 1250, efficiency: 104, status: 'Ahead' },
  { id: 6, product_id: 'P1002', product_name: 'iPhone 13', week: 'Week 3', planned_quantity: 1300, actual_quantity: 1320, efficiency: 102, status: 'Ahead' },
  { id: 7, product_id: 'P1003', product_name: 'iPad Pro', week: 'Week 1', planned_quantity: 800, actual_quantity: 780, efficiency: 98, status: 'On Track' },
  { id: 8, product_id: 'P1003', product_name: 'iPad Pro', week: 'Week 2', planned_quantity: 850, actual_quantity: 840, efficiency: 99, status: 'On Track' },
  { id: 9, product_id: 'P1003', product_name: 'iPad Pro', week: 'Week 3', planned_quantity: 900, actual_quantity: 850, efficiency: 94, status: 'Behind' },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    const week = searchParams.get('week');
    
    let filteredData = [...mockProductionData];
    
    if (productId) {
      filteredData = filteredData.filter(item => item.product_id === productId);
    }
    
    if (week) {
      filteredData = filteredData.filter(item => item.week === week);
    }
    
    return NextResponse.json({ 
      success: true,
      data: filteredData
    });
  } catch (error: any) {
    console.error('Error fetching production data:', error);
    
    return NextResponse.json({ 
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { plans } = body;
    
    if (!plans || !Array.isArray(plans)) {
      return NextResponse.json({ 
        success: false,
        error: 'Invalid request body' 
      }, { status: 400 });
    }
    
    // In a real app, this would update the database
    // For now, we'll just return success
    
    return NextResponse.json({ 
      success: true,
      message: 'Production plans updated successfully'
    });
  } catch (error: any) {
    console.error('Error updating production plans:', error);
    
    return NextResponse.json({ 
      success: false,
      error: error.message
    }, { status: 500 });
  }
} 