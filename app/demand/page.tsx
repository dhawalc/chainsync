'use client';

import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

// Mock data for demand planning
const historicalData = [
  { month: 'Jan', demand: 1200, forecast: null, plan: null },
  { month: 'Feb', demand: 1300, forecast: null, plan: null },
  { month: 'Mar', demand: 1400, forecast: null, plan: null },
  { month: 'Apr', demand: 1500, forecast: null, plan: null },
  { month: 'May', demand: 1600, forecast: null, plan: null },
  { month: 'Jun', demand: 1700, forecast: null, plan: null },
  { month: 'Jul', demand: 1800, forecast: null, plan: null },
  { month: 'Aug', demand: 1750, forecast: null, plan: null },
  { month: 'Sep', demand: 1900, forecast: null, plan: null },
  { month: 'Oct', demand: 2000, forecast: null, plan: null },
  { month: 'Nov', demand: 2100, forecast: null, plan: null },
  { month: 'Dec', demand: 2200, forecast: null, plan: null },
];

const forecastData = [
  { month: 'Jan', demand: 1200, forecast: 1250, plan: 1300 },
  { month: 'Feb', demand: 1300, forecast: 1350, plan: 1400 },
  { month: 'Mar', demand: 1400, forecast: 1450, plan: 1500 },
  { month: 'Apr', demand: 1500, forecast: 1550, plan: 1600 },
  { month: 'May', demand: 1600, forecast: 1650, plan: 1700 },
  { month: 'Jun', demand: 1700, forecast: 1750, plan: 1800 },
  { month: 'Jul', demand: 1800, forecast: 1850, plan: 1900 },
  { month: 'Aug', demand: 1750, forecast: 1800, plan: 1850 },
  { month: 'Sep', demand: 1900, forecast: 1950, plan: 2000 },
  { month: 'Oct', demand: 2000, forecast: 2050, plan: 2100 },
  { month: 'Nov', demand: 2100, forecast: 2150, plan: 2200 },
  { month: 'Dec', demand: 2200, forecast: 2250, plan: 2300 },
  { month: 'Jan (Next)', demand: null, forecast: 2300, plan: 2350 },
  { month: 'Feb (Next)', demand: null, forecast: 2350, plan: 2400 },
  { month: 'Mar (Next)', demand: null, forecast: 2400, plan: 2450 },
  { month: 'Apr (Next)', demand: null, forecast: 2450, plan: 2500 },
  { month: 'May (Next)', demand: null, forecast: 2500, plan: 2550 },
  { month: 'Jun (Next)', demand: null, forecast: 2550, plan: 2600 },
];

const productOptions = [
  { id: 'product-a', name: 'Product A - Smartphone' },
  { id: 'product-b', name: 'Product B - Tablet' },
  { id: 'product-c', name: 'Product C - Laptop' },
  { id: 'product-d', name: 'Product D - Desktop' },
  { id: 'product-e', name: 'Product E - Wearable' },
];

const locationOptions = [
  { id: 'global', name: 'Global' },
  { id: 'north-america', name: 'North America' },
  { id: 'europe', name: 'Europe' },
  { id: 'asia-pacific', name: 'Asia Pacific' },
  { id: 'latin-america', name: 'Latin America' },
];

export default function DemandPlanningPage() {
  const [selectedProduct, setSelectedProduct] = useState(productOptions[0].id);
  const [selectedLocation, setSelectedLocation] = useState(locationOptions[0].id);
  const [timeframe, setTimeframe] = useState('monthly');
  const [viewMode, setViewMode] = useState('chart');
  const [showHistorical, setShowHistorical] = useState(true);
  const [showForecast, setShowForecast] = useState(true);
  const [showPlan, setShowPlan] = useState(true);
  
  // Combine historical and forecast data
  const combinedData = [...forecastData];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Demand Planning</h1>
      
      {/* Controls */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product
            </label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              {productOptions.map(option => (
                <option key={option.id} value={option.id}>{option.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              {locationOptions.map(option => (
                <option key={option.id} value={option.id}>{option.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time Bucket
            </label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
            </select>
          </div>
        </div>
        
        <div className="mt-6 flex flex-wrap items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="show-historical"
                checked={showHistorical}
                onChange={() => setShowHistorical(!showHistorical)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="show-historical" className="ml-2 text-sm text-gray-700">
                Historical Demand
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="show-forecast"
                checked={showForecast}
                onChange={() => setShowForecast(!showForecast)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="show-forecast" className="ml-2 text-sm text-gray-700">
                Statistical Forecast
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="show-plan"
                checked={showPlan}
                onChange={() => setShowPlan(!showPlan)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="show-plan" className="ml-2 text-sm text-gray-700">
                Demand Plan
              </label>
            </div>
          </div>
          
          <div className="flex space-x-2 mt-4 md:mt-0">
            <button
              className={`px-3 py-1 rounded-md ${viewMode === 'chart' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setViewMode('chart')}
            >
              Chart
            </button>
            <button
              className={`px-3 py-1 rounded-md ${viewMode === 'table' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setViewMode('table')}
            >
              Table
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Chart/Table */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Demand Plan for {productOptions.find(p => p.id === selectedProduct)?.name}</h2>
        
        {viewMode === 'chart' ? (
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={combinedData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                {showHistorical && (
                  <Area 
                    type="monotone" 
                    dataKey="demand" 
                    stroke="#8884d8" 
                    fill="#8884d8" 
                    fillOpacity={0.3}
                    name="Historical Demand"
                  />
                )}
                {showForecast && (
                  <Area 
                    type="monotone" 
                    dataKey="forecast" 
                    stroke="#82ca9d" 
                    fill="#82ca9d" 
                    fillOpacity={0.3}
                    name="Statistical Forecast"
                  />
                )}
                {showPlan && (
                  <Area 
                    type="monotone" 
                    dataKey="plan" 
                    stroke="#ffc658" 
                    fill="#ffc658" 
                    fillOpacity={0.3}
                    name="Demand Plan"
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Month
                  </th>
                  {showHistorical && (
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Historical Demand
                    </th>
                  )}
                  {showForecast && (
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statistical Forecast
                    </th>
                  )}
                  {showPlan && (
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Demand Plan
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {combinedData.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.month}
                    </td>
                    {showHistorical && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.demand !== null ? item.demand.toLocaleString() : '-'}
                      </td>
                    )}
                    {showForecast && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.forecast !== null ? item.forecast.toLocaleString() : '-'}
                      </td>
                    )}
                    {showPlan && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.plan !== null ? item.plan.toLocaleString() : '-'}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Forecast Accuracy</h3>
          <p className="text-3xl font-bold">92%</p>
          <p className="text-xs text-gray-500 mt-1">Last 12 months</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Bias</h3>
          <p className="text-3xl font-bold">+2.4%</p>
          <p className="text-xs text-gray-500 mt-1">Slight over-forecasting</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-1">MAPE</h3>
          <p className="text-3xl font-bold">8.3%</p>
          <p className="text-xs text-gray-500 mt-1">Mean Absolute Percentage Error</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Forecast Horizon</h3>
          <p className="text-3xl font-bold">18 mo</p>
          <p className="text-xs text-gray-500 mt-1">Planning horizon</p>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex flex-wrap justify-end gap-4">
        <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
          Export Data
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Save Plan
        </button>
        <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
          Submit for Approval
        </button>
      </div>
    </div>
  );
} 