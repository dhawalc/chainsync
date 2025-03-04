import { NextResponse } from 'next/server';

// Mock forecast data - same as in the main forecasting route
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
  // ... other products (same as in the main forecasting route)
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { product_id, category, forecast_period, confidence_interval } = body;
    
    // Filter data based on product_id and category
    let filteredData = [...mockForecastData];
    
    if (product_id) {
      filteredData = filteredData.filter(item => item.product_id === product_id);
    }
    
    if (category) {
      filteredData = filteredData.filter(item => item.category === category);
    }
    
    // In a real app, we would generate new forecasts based on the parameters
    // For now, we'll just return the filtered data with adjusted forecast periods
    
    const adjustedData = filteredData.map(item => {
      // Adjust forecast period if needed
      if (forecast_period && forecast_period !== 6) {
        if (forecast_period < 6) {
          // Reduce forecast periods
          return {
            ...item,
            forecast_data: item.forecast_data.slice(0, forecast_period)
          };
        } else {
          // Extend forecast periods
          const extraPeriods = forecast_period - 6;
          const lastPeriod = item.forecast_data[item.forecast_data.length - 1];
          const extraForecastData = [];
          
          for (let i = 1; i <= extraPeriods; i++) {
            const month = ((new Date(lastPeriod.period).getMonth() + i) % 12) + 1;
            const year = new Date(lastPeriod.period).getFullYear() + Math.floor((new Date(lastPeriod.period).getMonth() + i) / 12);
            const monthName = new Date(year, month - 1).toLocaleString('en-US', { month: 'short' });
            
            extraForecastData.push({
              period: `${monthName} ${year}`,
              forecasted_demand: lastPeriod.forecasted_demand + (50 * i),
              lower_bound: lastPeriod.lower_bound + (30 * i),
              upper_bound: lastPeriod.upper_bound + (70 * i)
            });
          }
          
          return {
            ...item,
            forecast_data: [...item.forecast_data, ...extraForecastData]
          };
        }
      }
      
      return item;
    });
    
    return NextResponse.json({ 
      success: true,
      data: adjustedData
    });
  } catch (error: any) {
    console.error('Error generating forecast:', error);
    
    return NextResponse.json({ 
      success: false,
      error: error.message
    }, { status: 500 });
  }
} 