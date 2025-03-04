import { NextResponse } from 'next/server';

// In a real application, this would fetch data from your database
export async function GET() {
  try {
    // Mock data for the dashboard
    const dashboardData = {
      kpis: {
        totalProducts: 245,
        avgCycleTime: 18.5,
        inventoryValue: '$2.4M',
        productionEfficiency: '92%'
      },
      inventoryByCategory: [
        { category: 'Electronics', value: 1200, fill: '#8884d8' },
        { category: 'Computers', value: 800, fill: '#83a6ed' },
        { category: 'Smartphones', value: 600, fill: '#8dd1e1' },
        { category: 'Accessories', value: 300, fill: '#82ca9d' },
        { category: 'Other', value: 100, fill: '#a4de6c' }
      ],
      cycleTimeTrends: [
        { name: 'Jan', electronics: 24, computers: 18, smartphones: 12 },
        { name: 'Feb', electronics: 22, computers: 17, smartphones: 13 },
        { name: 'Mar', electronics: 23, computers: 16, smartphones: 11 },
        { name: 'Apr', electronics: 20, computers: 15, smartphones: 10 },
        { name: 'May', electronics: 21, computers: 14, smartphones: 9 },
        { name: 'Jun', electronics: 19, computers: 13, smartphones: 8 }
      ],
      productionTrends: [
        { name: 'Week 1', planned: 400, actual: 380 },
        { name: 'Week 2', planned: 420, actual: 400 },
        { name: 'Week 3', planned: 410, actual: 395 },
        { name: 'Week 4', planned: 430, actual: 420 },
        { name: 'Week 5', planned: 450, actual: 445 },
        { name: 'Week 6', planned: 470, actual: 460 }
      ],
      hierarchyOverview: {
        businessUnits: 3,
        productCategories: 12,
        productLines: 28,
        products: 245
      },
      recentActivities: [
        { id: 1, type: 'UPDATE', entity: 'Product', description: 'Updated cycle time for MacBook Pro', timestamp: '2023-06-01T14:30:00Z', user: 'john.doe@example.com' },
        { id: 2, type: 'INSERT', entity: 'Hierarchy', description: 'Added new product category: Tablets', timestamp: '2023-06-01T11:15:00Z', user: 'jane.smith@example.com' },
        { id: 3, type: 'UPDATE', entity: 'Cycle Time', description: 'Modified production schedule for Q3', timestamp: '2023-05-31T16:45:00Z', user: 'john.doe@example.com' },
        { id: 4, type: 'DELETE', entity: 'Product', description: 'Removed discontinued product: Galaxy S10', timestamp: '2023-05-31T09:20:00Z', user: 'admin@example.com' },
        { id: 5, type: 'UPDATE', entity: 'Inventory', description: 'Adjusted inventory levels for iPhones', timestamp: '2023-05-30T15:10:00Z', user: 'jane.smith@example.com' }
      ]
    };
    
    return NextResponse.json({ 
      success: true,
      data: dashboardData
    });
  } catch (error: any) {
    console.error('Error fetching dashboard data:', error);
    
    return NextResponse.json({ 
      success: false,
      error: error.message
    }, { status: 500 });
  }
} 