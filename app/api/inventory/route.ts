import { NextResponse } from 'next/server';

// Mock inventory data
const mockInventoryData = [
  {
    id: 'INV001',
    product_id: 'P1001',
    product_name: 'MacBook Pro',
    category: 'Electronics',
    location: 'Warehouse A',
    quantity: 120,
    unit_cost: 1200,
    reorder_point: 50,
    optimal_stock: 150,
    last_updated: '2023-05-15T10:30:00Z',
    status: 'In Stock'
  },
  {
    id: 'INV002',
    product_id: 'P1002',
    product_name: 'iPhone 13',
    category: 'Electronics',
    location: 'Warehouse A',
    quantity: 35,
    unit_cost: 800,
    reorder_point: 40,
    optimal_stock: 100,
    last_updated: '2023-05-16T09:15:00Z',
    status: 'Low Stock'
  },
  {
    id: 'INV003',
    product_id: 'P1003',
    product_name: 'iPad Pro',
    category: 'Electronics',
    location: 'Warehouse B',
    quantity: 75,
    unit_cost: 900,
    reorder_point: 30,
    optimal_stock: 80,
    last_updated: '2023-05-17T11:45:00Z',
    status: 'In Stock'
  },
  {
    id: 'INV004',
    product_id: 'P1004',
    product_name: 'AirPods Pro',
    category: 'Accessories',
    location: 'Warehouse A',
    quantity: 0,
    unit_cost: 200,
    reorder_point: 25,
    optimal_stock: 50,
    last_updated: '2023-05-18T14:20:00Z',
    status: 'Out of Stock'
  },
  {
    id: 'INV005',
    product_id: 'P1005',
    product_name: 'Apple Watch',
    category: 'Wearables',
    location: 'Warehouse C',
    quantity: 90,
    unit_cost: 350,
    reorder_point: 20,
    optimal_stock: 60,
    last_updated: '2023-05-19T16:30:00Z',
    status: 'Overstocked'
  },
  {
    id: 'INV006',
    product_id: 'P1006',
    product_name: 'Dell XPS 13',
    category: 'Electronics',
    location: 'Warehouse B',
    quantity: 45,
    unit_cost: 1100,
    reorder_point: 20,
    optimal_stock: 50,
    last_updated: '2023-05-20T10:00:00Z',
    status: 'In Stock'
  },
  {
    id: 'INV007',
    product_id: 'P1007',
    product_name: 'Samsung Galaxy S21',
    category: 'Electronics',
    location: 'Warehouse A',
    quantity: 15,
    unit_cost: 750,
    reorder_point: 20,
    optimal_stock: 60,
    last_updated: '2023-05-21T09:30:00Z',
    status: 'Low Stock'
  },
  {
    id: 'INV008',
    product_id: 'P1008',
    product_name: 'Sony WH-1000XM4',
    category: 'Accessories',
    location: 'Warehouse C',
    quantity: 60,
    unit_cost: 300,
    reorder_point: 15,
    optimal_stock: 40,
    last_updated: '2023-05-22T13:45:00Z',
    status: 'Overstocked'
  }
];

// Mock inventory history data
const mockInventoryHistory = [
  { date: '2023-04-15T10:30:00Z', quantity: 100, product_id: 'P1001' },
  { date: '2023-04-25T10:30:00Z', quantity: 110, product_id: 'P1001' },
  { date: '2023-05-05T10:30:00Z', quantity: 115, product_id: 'P1001' },
  { date: '2023-05-15T10:30:00Z', quantity: 120, product_id: 'P1001' },
  
  { date: '2023-04-16T09:15:00Z', quantity: 50, product_id: 'P1002' },
  { date: '2023-04-26T09:15:00Z', quantity: 45, product_id: 'P1002' },
  { date: '2023-05-06T09:15:00Z', quantity: 40, product_id: 'P1002' },
  { date: '2023-05-16T09:15:00Z', quantity: 35, product_id: 'P1002' },
  
  { date: '2023-04-17T11:45:00Z', quantity: 60, product_id: 'P1003' },
  { date: '2023-04-27T11:45:00Z', quantity: 65, product_id: 'P1003' },
  { date: '2023-05-07T11:45:00Z', quantity: 70, product_id: 'P1003' },
  { date: '2023-05-17T11:45:00Z', quantity: 75, product_id: 'P1003' }
];

export async function GET() {
  try {
    return NextResponse.json({ 
      success: true,
      data: mockInventoryData,
      history: mockInventoryHistory
    });
  } catch (error: any) {
    console.error('Error fetching inventory data:', error);
    
    return NextResponse.json({ 
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items } = body;
    
    if (!items || !Array.isArray(items)) {
      return NextResponse.json({ 
        success: false,
        error: 'Invalid request body' 
      }, { status: 400 });
    }
    
    // In a real app, this would update the database
    // For now, we'll just return success
    
    return NextResponse.json({ 
      success: true,
      message: 'Inventory updated successfully'
    });
  } catch (error: any) {
    console.error('Error updating inventory:', error);
    
    return NextResponse.json({ 
      success: false,
      error: error.message
    }, { status: 500 });
  }
} 