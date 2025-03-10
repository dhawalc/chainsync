'use client';

import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Mock data for charts
const monthlyPerformanceData = [
  { month: 'Jan', actual: 4000, target: 4500, variance: -500 },
  { month: 'Feb', actual: 4200, target: 4500, variance: -300 },
  { month: 'Mar', actual: 4500, target: 4500, variance: 0 },
  { month: 'Apr', actual: 4800, target: 4500, variance: 300 },
  { month: 'May', actual: 5000, target: 4800, variance: 200 },
  { month: 'Jun', actual: 4700, target: 4800, variance: -100 },
  { month: 'Jul', actual: 5200, target: 5000, variance: 200 },
  { month: 'Aug', actual: 5500, target: 5000, variance: 500 },
  { month: 'Sep', actual: 5300, target: 5200, variance: 100 },
  { month: 'Oct', actual: 5600, target: 5200, variance: 400 },
  { month: 'Nov', actual: 5400, target: 5500, variance: -100 },
  { month: 'Dec', actual: 5800, target: 5500, variance: 300 },
];

const supplierPerformanceData = [
  { name: 'On-Time Delivery', value: 87 },
  { name: 'Quality Compliance', value: 93 },
  { name: 'Cost Adherence', value: 78 },
  { name: 'Responsiveness', value: 85 },
];

const inventoryTurnoverData = [
  { month: 'Jan', turnover: 4.2 },
  { month: 'Feb', turnover: 4.3 },
  { month: 'Mar', turnover: 4.5 },
  { month: 'Apr', turnover: 4.7 },
  { month: 'May', turnover: 4.8 },
  { month: 'Jun', turnover: 5.0 },
  { month: 'Jul', turnover: 5.2 },
  { month: 'Aug', turnover: 5.3 },
  { month: 'Sep', turnover: 5.5 },
  { month: 'Oct', turnover: 5.6 },
  { month: 'Nov', turnover: 5.8 },
  { month: 'Dec', turnover: 6.0 },
];

const forecastAccuracyData = [
  { product: 'Product A', accuracy: 92 },
  { product: 'Product B', accuracy: 88 },
  { product: 'Product C', accuracy: 95 },
  { product: 'Product D', accuracy: 85 },
  { product: 'Product E', accuracy: 90 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function PerformancePage() {
  const [timeframe, setTimeframe] = useState('monthly');
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Performance Dashboard</h1>
        
        <div className="flex items-center space-x-4">
          <select 
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
          
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Export Report
          </button>
        </div>
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-1">On-Time Delivery</h3>
          <div className="flex items-end">
            <p className="text-3xl font-bold">92%</p>
            <span className="ml-2 text-sm font-medium text-green-600">↑ 3%</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">vs. Previous Period</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Inventory Turnover</h3>
          <div className="flex items-end">
            <p className="text-3xl font-bold">5.8</p>
            <span className="ml-2 text-sm font-medium text-green-600">↑ 0.2</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">vs. Previous Period</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Forecast Accuracy</h3>
          <div className="flex items-end">
            <p className="text-3xl font-bold">89%</p>
            <span className="ml-2 text-sm font-medium text-red-600">↓ 2%</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">vs. Previous Period</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Perfect Order Rate</h3>
          <div className="flex items-end">
            <p className="text-3xl font-bold">87%</p>
            <span className="ml-2 text-sm font-medium text-green-600">↑ 5%</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">vs. Previous Period</p>
        </div>
      </div>
      
      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Monthly Performance vs. Target</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyPerformanceData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="actual" fill="#8884d8" name="Actual" />
                <Bar dataKey="target" fill="#82ca9d" name="Target" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Supplier Performance Metrics</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={supplierPerformanceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {supplierPerformanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Inventory Turnover Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={inventoryTurnoverData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="turnover" 
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }} 
                  name="Inventory Turnover"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Forecast Accuracy by Product</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={forecastAccuracyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="product" type="category" />
                <Tooltip />
                <Legend />
                <Bar dataKey="accuracy" fill="#82ca9d" name="Accuracy %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
} 