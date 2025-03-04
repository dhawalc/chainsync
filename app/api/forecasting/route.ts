import { NextResponse } from 'next/server';

// Mock forecast data
const mockForecastData = [
  {
    product_id: 'P1001',
    product_name: 'MacBook Pro',
    category: 'Electronics',
    historical_data: [
      { period: 'Jan 2023', actual_demand: 1200 },
      { period: 'Feb 2023', actual_demand: 1250 },
      { period: 'Mar 2023', actual_demand: 1300 },
      { period: 'Apr 2023', actual_demand: 1350 },
      { period: 'May 2023', actual_demand: 1400 },
      { period: 'Jun 2023', actual_demand: 1450 }
    ],
    forecast_data: [
      { period: 'Jul 2023', forecasted_demand: 1500, lower_bound: 1450, upper_bound: 1550 },
      { period: 'Aug 2023', forecasted_demand: 1550, lower_bound: 1480, upper_bound: 1620 },
      { period: 'Sep 2023', forecasted_demand: 1600, lower_bound: 1510, upper_bound: 1690 },
      { period: 'Oct 2023', forecasted_demand: 1650, lower_bound: 1540, upper_bound: 1760 },
      { period: 'Nov 2023', forecasted_demand: 1700, lower_bound: 1570, upper_bound: 1830 },
      { period: 'Dec 2023', forecasted_demand: 1750, lower_bound: 1600, upper_bound: 1900 }
    ]
  },
  {
    product_id: 'P1002',
    product_name: 'iPhone 13',
    category: 'Electronics',
    historical_data: [
      { period: 'Jan 2023', actual_demand: 2500 },
      { period: 'Feb 2023', actual_demand: 2400 },
      { period: 'Mar 2023', actual_demand: 2600 },
      { period: 'Apr 2023', actual_demand: 2700 },
      { period: 'May 2023', actual_demand: 2800 },
      { period: 'Jun 2023', actual_demand: 2900 }
    ],
    forecast_data: [
      { period: 'Jul 2023', forecasted_demand: 3000, lower_bound: 2900, upper_bound: 3100 },
      { period: 'Aug 2023', forecasted_demand: 3100, lower_bound: 2950, upper_bound: 3250 },
      { period: 'Sep 2023', forecasted_demand: 3200, lower_bound: 3000, upper_bound: 3400 },
      { period: 'Oct 2023', forecasted_demand: 3300, lower_bound: 3050, upper_bound: 3550 },
      { period: 'Nov 2023', forecasted_demand: 3400, lower_bound: 3100, upper_bound: 3700 },
      { period: 'Dec 2023', forecasted_demand: 3500, lower_bound: 3150, upper_bound: 3850 }
    ]
  },
  {
    product_id: 'P1003',
    product_name: 'iPad Pro',
    category: 'Electronics',
    historical_data: [
      { period: 'Jan 2023', actual_demand: 1800 },
      { period: 'Feb 2023', actual_demand: 1750 },
      { period: 'Mar 2023', actual_demand: 1900 },
      { period: 'Apr 2023', actual_demand: 1950 },
      { period: 'May 2023', actual_demand: 2000 },
      { period: 'Jun 2023', actual_demand: 2050 }
    ],
    forecast_data: [
      { period: 'Jul 2023', forecasted_demand: 2100, lower_bound: 2000, upper_bound: 2200 },
      { period: 'Aug 2023', forecasted_demand: 2150, lower_bound: 2020, upper_bound: 2280 },
      { period: 'Sep 2023', forecasted_demand: 2200, lower_bound: 2040, upper_bound: 2360 },
      { period: 'Oct 2023', forecasted_demand: 2250, lower_bound: 2060, upper_bound: 2440 },
      { period: 'Nov 2023', forecasted_demand: 2300, lower_bound: 2080, upper_bound: 2520 },
      { period: 'Dec 2023', forecasted_demand: 2350, lower_bound: 2100, upper_bound: 2600 }
    ]
  },
  {
    product_id: 'P1004',
    product_name: 'AirPods Pro',
    category: 'Accessories',
    historical_data: [
      { period: 'Jan 2023', actual_demand: 3500 },
      { period: 'Feb 2023', actual_demand: 3600 },
      { period: 'Mar 2023', actual_demand: 3700 },
      { period: 'Apr 2023', actual_demand: 3800 },
      { period: 'May 2023', actual_demand: 3900 },
      { period: 'Jun 2023', actual_demand: 4000 }
    ],
    forecast_data: [
      { period: 'Jul 2023', forecasted_demand: 4100, lower_bound: 3950, upper_bound: 4250 },
      { period: 'Aug 2023', forecasted_demand: 4200, lower_bound: 4000, upper_bound: 4400 },
      { period: 'Sep 2023', forecasted_demand: 4300, lower_bound: 4050, upper_bound: 4550 },
      { period: 'Oct 2023', forecasted_demand: 4400, lower_bound: 4100, upper_bound: 4700 },
      { period: 'Nov 2023', forecasted_demand: 4500, lower_bound: 4150, upper_bound: 4850 },
      { period: 'Dec 2023', forecasted_demand: 4600, lower_bound: 4200, upper_bound: 5000 }
    ]
  }
];

export async function GET() {
  try {
    return NextResponse.json({ 
      success: true,
      data: mockForecastData
    });
  } catch (error: any) {
    console.error('Error fetching forecast data:', error);
    
    return NextResponse.json({ 
      success: false,
      error: error.message
    }, { status: 500 });
  }
} 