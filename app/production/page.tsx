'use client';

import { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

interface ProductionPlan {
  id: number;
  product_id: string;
  product_name: string;
  week: string;
  planned_quantity: number;
  actual_quantity: number;
  efficiency: number;
  status: 'On Track' | 'Behind' | 'Ahead' | 'Completed';
}

export default function ProductionPlanning() {
  const [productionPlans, setProductionPlans] = useState<ProductionPlan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string>('all');
  const [selectedWeek, setSelectedWeek] = useState<string>('all');
  const [toast, setToast] = useState<{ visible: boolean, title: string, message: string, type: 'success' | 'error' | 'info' }>({
    visible: false,
    title: '',
    message: '',
    type: 'info'
  });
  
  // Mock data - in a real app, this would come from your API
  const mockProductionPlans: ProductionPlan[] = [
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
  
  // Fetch production plans
  useEffect(() => {
    const fetchProductionPlans = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/production');
        // const data = await response.json();
        
        // Using mock data for now
        setTimeout(() => {
          setProductionPlans(mockProductionPlans);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching production plans:', error);
        showToast('Error', 'Failed to fetch production plans', 'error');
        setIsLoading(false);
      }
    };
    
    fetchProductionPlans();
  }, []);
  
  // Show toast notification
  const showToast = (title: string, message: string, type: 'success' | 'error' | 'info') => {
    setToast({ visible: true, title, message, type });
    setTimeout(() => {
      setToast({ ...toast, visible: false });
    }, 3000);
  };
  
  // Get unique products
  const uniqueProducts = Array.from(new Set(productionPlans.map(plan => plan.product_id)))
    .map(productId => {
      const plan = productionPlans.find(p => p.product_id === productId);
      return { id: productId, name: plan?.product_name || productId };
    });
  
  // Get unique weeks
  const uniqueWeeks = Array.from(new Set(productionPlans.map(plan => plan.week)));
  
  // Filter production plans
  const filteredPlans = productionPlans.filter(plan => {
    if (selectedProduct !== 'all' && plan.product_id !== selectedProduct) return false;
    if (selectedWeek !== 'all' && plan.week !== selectedWeek) return false;
    return true;
  });
  
  // Prepare chart data
  const chartData = uniqueWeeks.map(week => {
    const weekData: any = { name: week };
    
    uniqueProducts.forEach(product => {
      const plan = productionPlans.find(p => p.product_id === product.id && p.week === week);
      if (plan) {
        weekData[`${product.name} (Planned)`] = plan.planned_quantity;
        weekData[`${product.name} (Actual)`] = plan.actual_quantity;
      }
    });
    
    return weekData;
  });
  
  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'On Track':
        return 'bg-green-100 text-green-800';
      case 'Behind':
        return 'bg-red-100 text-red-800';
      case 'Ahead':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Handle plan update
  const handleQuantityChange = (id: number, field: 'planned_quantity' | 'actual_quantity', value: string) => {
    const numValue = parseInt(value);
    if (isNaN(numValue)) return;
    
    setProductionPlans(plans => 
      plans.map(plan => {
        if (plan.id === id) {
          const updatedPlan = { ...plan, [field]: numValue };
          // Recalculate efficiency
          if (field === 'actual_quantity' || field === 'planned_quantity') {
            updatedPlan.efficiency = Math.round((updatedPlan.actual_quantity / updatedPlan.planned_quantity) * 100);
            
            // Update status based on efficiency
            if (updatedPlan.efficiency >= 98 && updatedPlan.efficiency <= 102) {
              updatedPlan.status = 'On Track';
            } else if (updatedPlan.efficiency < 98) {
              updatedPlan.status = 'Behind';
            } else {
              updatedPlan.status = 'Ahead';
            }
          }
          return updatedPlan;
        }
        return plan;
      })
    );
  };
  
  // Save production plans
  const saveProductionPlans = async () => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      // await fetch('/api/production', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ plans: productionPlans })
      // });
      
      // Simulate API call
      setTimeout(() => {
        showToast('Success', 'Production plans saved successfully', 'success');
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error saving production plans:', error);
      showToast('Error', 'Failed to save production plans', 'error');
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Production Planning</h1>
      
      {/* Toast Notification */}
      {toast.visible && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-md ${
          toast.type === 'success' ? 'bg-green-50 border-l-4 border-green-500' :
          toast.type === 'error' ? 'bg-red-50 border-l-4 border-red-500' :
          'bg-blue-50 border-l-4 border-blue-500'
        }`}>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {toast.type === 'success' && (
                <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
              {toast.type === 'error' && (
                <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
              {toast.type === 'info' && (
                <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-800">{toast.title}</h3>
              <div className="mt-1 text-sm text-gray-700">{toast.message}</div>
            </div>
          </div>
        </div>
      )}
      
      {/* Filters and Actions */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6 border border-gray-200">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center">
            <div>
              <label htmlFor="product-filter" className="block text-sm font-medium text-gray-700 mb-1">Product</label>
              <select
                id="product-filter"
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Products</option>
                {uniqueProducts.map(product => (
                  <option key={product.id} value={product.id}>{product.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="week-filter" className="block text-sm font-medium text-gray-700 mb-1">Week</label>
              <select
                id="week-filter"
                value={selectedWeek}
                onChange={(e) => setSelectedWeek(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Weeks</option>
                {uniqueWeeks.map(week => (
                  <option key={week} value={week}>{week}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <button
              onClick={saveProductionPlans}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Production Plan Chart */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">Production Overview</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {uniqueProducts.map((product, index) => (
                <>
                  <Bar 
                    key={`${product.id}-planned`} 
                    dataKey={`${product.name} (Planned)`} 
                    fill={`hsl(${index * 40}, 70%, 60%)`} 
                    fillOpacity={0.8} 
                  />
                  <Bar 
                    key={`${product.id}-actual`} 
                    dataKey={`${product.name} (Actual)`} 
                    fill={`hsl(${index * 40}, 90%, 40%)`} 
                  />
                </>
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Production Plans Table */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
                  Week
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
                  Planned Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
                  Actual Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
                  Efficiency
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      <span className="ml-2">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredPlans.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    No production plans found.
                  </td>
                </tr>
              ) : (
                filteredPlans.map((plan) => (
                  <tr key={plan.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">
                      {plan.product_name}
                      <div className="text-xs text-gray-500">{plan.product_id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {plan.week}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        value={plan.planned_quantity}
                        onChange={(e) => handleQuantityChange(plan.id, 'planned_quantity', e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-1 w-24 bg-white text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        value={plan.actual_quantity}
                        onChange={(e) => handleQuantityChange(plan.id, 'actual_quantity', e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-1 w-24 bg-white text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {plan.efficiency}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeColor(plan.status)}`}>
                        {plan.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 