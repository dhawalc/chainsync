'use client';

import { useState, useEffect } from 'react';
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { SparklesIcon } from '@heroicons/react/24/outline';
import DemandInsightsModal from '../components/ai/DemandInsightsModal';

interface ForecastData {
  product_id: string;
  product_name: string;
  category: string;
  historical_data: {
    period: string;
    actual_demand: number;
  }[];
  forecast_data: {
    period: string;
    forecasted_demand: number;
    lower_bound: number;
    upper_bound: number;
  }[];
}

export default function DemandForecasting() {
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [forecastPeriod, setForecastPeriod] = useState<number>(6);
  const [confidenceInterval, setConfidenceInterval] = useState<number>(95);
  const [toast, setToast] = useState<{ visible: boolean, title: string, message: string, type: 'success' | 'error' | 'info' }>({
    visible: false,
    title: '',
    message: '',
    type: 'info'
  });
  const [isInsightsModalOpen, setIsInsightsModalOpen] = useState(false);
  
  // Fetch forecast data
  useEffect(() => {
    const fetchForecastData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/forecasting');
        const data = await response.json();
        
        if (data.success) {
          setForecastData(data.data);
        } else {
          showToast('Error', data.error || 'Failed to fetch forecast data', 'error');
        }
      } catch (error) {
        console.error('Error fetching forecast data:', error);
        showToast('Error', 'Failed to fetch forecast data', 'error');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchForecastData();
  }, []);
  
  // Show toast notification
  const showToast = (title: string, message: string, type: 'success' | 'error' | 'info') => {
    setToast({ visible: true, title, message, type });
    setTimeout(() => {
      setToast({ ...toast, visible: false });
    }, 3000);
  };
  
  // Get unique products
  const uniqueProducts = Array.from(new Set(forecastData.map(item => item.product_id)))
    .map(productId => {
      const item = forecastData.find(d => d.product_id === productId);
      return { id: productId, name: item?.product_name || productId };
    });
  
  // Get unique categories
  const uniqueCategories = Array.from(new Set(forecastData.map(item => item.category)));
  
  // Filter forecast data
  const filteredData = forecastData.filter(item => {
    if (selectedProduct !== 'all' && item.product_id !== selectedProduct) return false;
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    return true;
  });
  
  // Generate forecast
  const generateForecast = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/forecasting/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          product_id: selectedProduct === 'all' ? null : selectedProduct,
          category: selectedCategory === 'all' ? null : selectedCategory,
          forecast_period: forecastPeriod,
          confidence_interval: confidenceInterval
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setForecastData(data.data);
        showToast('Success', 'Forecast generated successfully', 'success');
      } else {
        showToast('Error', data.error || 'Failed to generate forecast', 'error');
      }
    } catch (error) {
      console.error('Error generating forecast:', error);
      showToast('Error', 'Failed to generate forecast', 'error');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Combine historical and forecast data for charts
  const getCombinedChartData = (item: ForecastData) => {
    const historical = item.historical_data.map(d => ({
      period: d.period,
      actual: d.actual_demand,
      forecast: null,
      lower: null,
      upper: null
    }));
    
    const forecast = item.forecast_data.map(d => ({
      period: d.period,
      actual: null,
      forecast: d.forecasted_demand,
      lower: d.lower_bound,
      upper: d.upper_bound
    }));
    
    return [...historical, ...forecast];
  };
  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Demand Forecasting</h1>
        <button
          onClick={() => setIsInsightsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <SparklesIcon className="h-5 w-5 mr-2" />
          AI Insights
        </button>
      </div>
      
      {/* Toast Notification */}
      {toast.visible && (
        <div className={`mb-6 p-4 rounded-md ${
          toast.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' :
          toast.type === 'error' ? 'bg-red-50 text-red-800 border border-red-200' :
          'bg-blue-50 text-blue-800 border border-blue-200'
        }`}>
          <div className="flex">
            <div className="flex-shrink-0">
              {toast.type === 'success' && (
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
              {toast.type === 'error' && (
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
              {toast.type === 'info' && (
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium">{toast.title}</h3>
              <div className="mt-1 text-sm">{toast.message}</div>
            </div>
          </div>
        </div>
      )}
      
      {/* Filters and Controls */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full bg-white text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              <option value="all">All Products</option>
              {uniqueProducts.map(product => (
                <option key={product.id} value={product.id}>{product.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full bg-white text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              <option value="all">All Categories</option>
              {uniqueCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Forecast Period (Months)</label>
            <input
              type="number"
              min="1"
              max="24"
              value={forecastPeriod}
              onChange={(e) => setForecastPeriod(parseInt(e.target.value))}
              className="border border-gray-300 rounded-md px-3 py-2 w-full bg-white text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confidence Interval (%)</label>
            <input
              type="number"
              min="50"
              max="99"
              value={confidenceInterval}
              onChange={(e) => setConfidenceInterval(parseInt(e.target.value))}
              className="border border-gray-300 rounded-md px-3 py-2 w-full bg-white text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={generateForecast}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? 'Generating...' : 'Generate Forecast'}
          </button>
        </div>
      </div>
      
      {/* Forecast Charts */}
      {isLoading ? (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex justify-center items-center h-64">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Loading forecast data...</span>
          </div>
        </div>
      ) : filteredData.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex justify-center items-center h-64">
          <p className="text-gray-500">No forecast data available. Please select different filters or generate a new forecast.</p>
        </div>
      ) : (
        filteredData.map(item => (
          <div key={item.product_id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{item.product_name}</h2>
            <p className="text-sm text-gray-500 mb-4">Category: {item.category} | Product ID: {item.product_id}</p>
            
            <div className="h-80 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={getCombinedChartData(item)} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="actual" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.8} name="Actual Demand" />
                  <Area type="monotone" dataKey="forecast" stroke="#10b981" fill="#10b981" fillOpacity={0.8} name="Forecasted Demand" />
                  <Area type="monotone" dataKey="lower" stroke="#d1d5db" fill="#d1d5db" fillOpacity={0.5} name="Lower Bound" />
                  <Area type="monotone" dataKey="upper" stroke="#d1d5db" fill="#d1d5db" fillOpacity={0.5} name="Upper Bound" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Period</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actual Demand</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Forecasted Demand</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Lower Bound</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Upper Bound</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {item.historical_data.map(histData => (
                    <tr key={`hist-${histData.period}`} className="bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{histData.period}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{histData.actual_demand.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                    </tr>
                  ))}
                  {item.forecast_data.map(forecastData => (
                    <tr key={`forecast-${forecastData.period}`}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{forecastData.period}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">{forecastData.forecasted_demand.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{forecastData.lower_bound.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{forecastData.upper_bound.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}

      {/* AI Insights Modal */}
      <DemandInsightsModal
        isOpen={isInsightsModalOpen}
        onClose={() => setIsInsightsModalOpen(false)}
        productId={selectedProduct === 'all' ? undefined : selectedProduct}
        historicalData={filteredData.flatMap(item => item.historical_data)}
        forecastData={filteredData.flatMap(item => item.forecast_data)}
      />
    </div>
  );
} 