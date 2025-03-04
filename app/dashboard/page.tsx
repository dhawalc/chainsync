'use client';

import { useState, useEffect } from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, Cell 
} from 'recharts';
import Link from 'next/link';
import SupplierPerformance from '../components/SupplierPerformance';

// Sample data - in a real app, this would come from your API
const inventoryData = [
  { category: 'Electronics', value: 1200, fill: '#8884d8' },
  { category: 'Computers', value: 800, fill: '#83a6ed' },
  { category: 'Smartphones', value: 600, fill: '#8dd1e1' },
  { category: 'Accessories', value: 300, fill: '#82ca9d' },
  { category: 'Other', value: 100, fill: '#a4de6c' }
];

const cycleTimeData = [
  { name: 'Jan', electronics: 24, computers: 18, smartphones: 12 },
  { name: 'Feb', electronics: 22, computers: 17, smartphones: 13 },
  { name: 'Mar', electronics: 23, computers: 16, smartphones: 11 },
  { name: 'Apr', electronics: 20, computers: 15, smartphones: 10 },
  { name: 'May', electronics: 21, computers: 14, smartphones: 9 },
  { name: 'Jun', electronics: 19, computers: 13, smartphones: 8 }
];

const productionTrendData = [
  { name: 'Week 1', planned: 400, actual: 380 },
  { name: 'Week 2', planned: 420, actual: 400 },
  { name: 'Week 3', planned: 410, actual: 395 },
  { name: 'Week 4', planned: 430, actual: 420 },
  { name: 'Week 5', planned: 450, actual: 445 },
  { name: 'Week 6', planned: 470, actual: 460 }
];

const recentActivities = [
  { id: 1, type: 'UPDATE', entity: 'Product', description: 'Updated cycle time for MacBook Pro', timestamp: '2023-06-01T14:30:00Z', user: 'john.doe@example.com' },
  { id: 2, type: 'INSERT', entity: 'Hierarchy', description: 'Added new product category: Tablets', timestamp: '2023-06-01T11:15:00Z', user: 'jane.smith@example.com' },
  { id: 3, type: 'UPDATE', entity: 'Cycle Time', description: 'Modified production schedule for Q3', timestamp: '2023-05-31T16:45:00Z', user: 'john.doe@example.com' },
  { id: 4, type: 'DELETE', entity: 'Product', description: 'Removed discontinued product: Galaxy S10', timestamp: '2023-05-31T09:20:00Z', user: 'admin@example.com' },
  { id: 5, type: 'UPDATE', entity: 'Inventory', description: 'Adjusted inventory levels for iPhones', timestamp: '2023-05-30T15:10:00Z', user: 'jane.smith@example.com' }
];

// Mock data for dashboard
const inventorySummary = [
  { name: 'In Stock', value: 65, color: '#10b981' },
  { name: 'Low Stock', value: 20, color: '#f59e0b' },
  { name: 'Out of Stock', value: 5, color: '#ef4444' },
  { name: 'Overstocked', value: 10, color: '#3b82f6' },
];

const monthlyOrders = [
  { month: 'Jan', orders: 120, revenue: 150000 },
  { month: 'Feb', orders: 140, revenue: 168000 },
  { month: 'Mar', orders: 160, revenue: 192000 },
  { month: 'Apr', orders: 180, revenue: 216000 },
  { month: 'May', orders: 200, revenue: 240000 },
  { month: 'Jun', orders: 220, revenue: 264000 },
];

const topProducts = [
  { name: 'MacBook Pro', sales: 1200, growth: 15 },
  { name: 'iPhone 13', sales: 2500, growth: 8 },
  { name: 'iPad Pro', sales: 800, growth: 12 },
  { name: 'AirPods Pro', sales: 1800, growth: 20 },
  { name: 'Apple Watch', sales: 950, growth: 10 },
];

export default function Dashboard() {
  const [kpis, setKpis] = useState({
    totalProducts: 245,
    avgCycleTime: 18.5,
    inventoryValue: '$2.4M',
    productionEfficiency: '92%'
  });
  
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Get activity type badge color
  const getActivityTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'INSERT':
        return 'bg-green-100 text-green-800';
      case 'UPDATE':
        return 'bg-blue-100 text-blue-800';
      case 'DELETE':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  // Get growth indicator
  const getGrowthIndicator = (growth: number) => {
    if (growth > 0) {
      return (
        <span className="text-green-600 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
          </svg>
          {growth}%
        </span>
      );
    } else if (growth < 0) {
      return (
        <span className="text-red-600 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
          {Math.abs(growth)}%
        </span>
      );
    } else {
      return (
        <span className="text-gray-600">0%</span>
      );
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="mt-4 text-gray-600">Loading dashboard...</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Supply Chain Dashboard</h1>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <p className="text-2xl font-semibold text-gray-900">{formatCurrency(1230000)}</p>
              </div>
              <div className="bg-blue-100 p-2 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <span className="text-green-600 flex items-center text-sm font-medium">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                </svg>
                12.5%
              </span>
              <span className="text-gray-500 text-sm ml-2">vs last month</span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Orders</p>
                <p className="text-2xl font-semibold text-gray-900">1,024</p>
              </div>
              <div className="bg-green-100 p-2 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <span className="text-green-600 flex items-center text-sm font-medium">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                </svg>
                8.2%
              </span>
              <span className="text-gray-500 text-sm ml-2">vs last month</span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">On-Time Delivery</p>
                <p className="text-2xl font-semibold text-gray-900">94.2%</p>
              </div>
              <div className="bg-yellow-100 p-2 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <span className="text-green-600 flex items-center text-sm font-medium">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                </svg>
                1.5%
              </span>
              <span className="text-gray-500 text-sm ml-2">vs last month</span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Inventory Value</p>
                <p className="text-2xl font-semibold text-gray-900">{formatCurrency(850000)}</p>
              </div>
              <div className="bg-purple-100 p-2 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <span className="text-red-600 flex items-center text-sm font-medium">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
                3.2%
              </span>
              <span className="text-gray-500 text-sm ml-2">vs last month</span>
            </div>
          </div>
        </div>
        
        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Orders Chart */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">Monthly Orders & Revenue</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyOrders} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" />
                  <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
                  <Tooltip formatter={(value, name) => {
                    if (name === 'revenue') return formatCurrency(value as number);
                    return value;
                  }} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="orders" name="Orders" fill="#3b82f6" />
                  <Bar yAxisId="right" dataKey="revenue" name="Revenue" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Inventory Status Chart */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">Inventory Status</h2>
            <div className="h-80 flex items-center justify-center">
              <div className="w-full max-w-md">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={inventorySummary}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {inventorySummary.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value} products`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Products Table */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">Top Selling Products</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Sales</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Growth</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {topProducts.map((product, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{product.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{product.sales.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {getGrowthIndicator(product.growth)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Supplier Performance Component */}
          <SupplierPerformance />
        </div>
      </div>
    </div>
  );
} 