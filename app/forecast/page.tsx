'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ChartBarIcon, 
  ArrowTrendingUpIcon, 
  CalendarIcon, 
  AdjustmentsHorizontalIcon 
} from '@heroicons/react/24/outline';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart
} from 'recharts';

// Mock data for forecasts
const forecastData = [
  { month: 'Jan', actual: 1200, forecast: 1150, lower: 1050, upper: 1250 },
  { month: 'Feb', actual: 1300, forecast: 1250, lower: 1150, upper: 1350 },
  { month: 'Mar', actual: 1400, forecast: 1350, lower: 1250, upper: 1450 },
  { month: 'Apr', actual: 1500, forecast: 1450, lower: 1350, upper: 1550 },
  { month: 'May', actual: 1600, forecast: 1550, lower: 1450, upper: 1650 },
  { month: 'Jun', actual: 1700, forecast: 1650, lower: 1550, upper: 1750 },
  { month: 'Jul', actual: 1800, forecast: 1750, lower: 1650, upper: 1850 },
  { month: 'Aug', actual: 1750, forecast: 1800, lower: 1700, upper: 1900 },
  { month: 'Sep', actual: 1900, forecast: 1850, lower: 1750, upper: 1950 },
  { month: 'Oct', actual: 2000, forecast: 1950, lower: 1850, upper: 2050 },
  { month: 'Nov', actual: 2100, forecast: 2050, lower: 1950, upper: 2150 },
  { month: 'Dec', actual: 2200, forecast: 2150, lower: 2050, upper: 2250 },
  { month: 'Jan (Next)', actual: null, forecast: 2250, lower: 2150, upper: 2350 },
  { month: 'Feb (Next)', actual: null, forecast: 2350, lower: 2250, upper: 2450 },
  { month: 'Mar (Next)', actual: null, forecast: 2450, lower: 2350, upper: 2550 },
  { month: 'Apr (Next)', actual: null, forecast: 2550, lower: 2450, upper: 2650 },
  { month: 'May (Next)', actual: null, forecast: 2650, lower: 2550, upper: 2750 },
  { month: 'Jun (Next)', actual: null, forecast: 2750, lower: 2650, upper: 2850 },
];

const collaborativeData = [
  { month: 'Jan (Next)', statistical: 2250, sales: 2300, marketing: 2400, finance: 2200, final: 2300 },
  { month: 'Feb (Next)', statistical: 2350, sales: 2400, marketing: 2500, finance: 2300, final: 2400 },
  { month: 'Mar (Next)', statistical: 2450, sales: 2500, marketing: 2600, finance: 2400, final: 2500 },
  { month: 'Apr (Next)', statistical: 2550, sales: 2600, marketing: 2700, finance: 2500, final: 2600 },
  { month: 'May (Next)', statistical: 2650, sales: 2700, marketing: 2800, finance: 2600, final: 2700 },
  { month: 'Jun (Next)', statistical: 2750, sales: 2800, marketing: 2900, finance: 2700, final: 2800 },
];

const accuracyData = [
  { product: 'Product A', accuracy: 92 },
  { product: 'Product B', accuracy: 88 },
  { product: 'Product C', accuracy: 95 },
  { product: 'Product D', accuracy: 85 },
  { product: 'Product E', accuracy: 90 },
];

const productOptions = [
  { id: 'all', name: 'All Products' },
  { id: 'product-a', name: 'Product A - Smartphone' },
  { id: 'product-b', name: 'Product B - Tablet' },
  { id: 'product-c', name: 'Product C - Laptop' },
  { id: 'product-d', name: 'Product D - Desktop' },
  { id: 'product-e', name: 'Product E - Wearable' },
];

export default function ForecastPage() {
  const [activeTab, setActiveTab] = useState('statistical');
  const [selectedProduct, setSelectedProduct] = useState(productOptions[0].id);
  const [forecastMethod, setForecastMethod] = useState('auto');
  const [showConfidenceInterval, setShowConfidenceInterval] = useState(true);
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Demand Forecasting</h1>
          <p className="mt-2 text-gray-600">Generate and manage forecasts using statistical methods or collaborative input</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <ArrowTrendingUpIcon className="h-4 w-4 mr-2" />
            Generate Forecast
          </Button>
          <Button variant="outline" className="text-indigo-700 border-indigo-300 hover:bg-indigo-50">
            <AdjustmentsHorizontalIcon className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Product
        </label>
        <select
          className="w-full md:w-64 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
        >
          {productOptions.map(option => (
            <option key={option.id} value={option.id}>{option.name}</option>
          ))}
        </select>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-md mb-8">
          <TabsTrigger value="statistical" className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700">
            <ChartBarIcon className="h-4 w-4 mr-2" />
            Statistical Forecast
          </TabsTrigger>
          <TabsTrigger value="collaborative" className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700">
            <CalendarIcon className="h-4 w-4 mr-2" />
            Collaborative Forecast
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="statistical" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-gray-800">Forecast Accuracy</CardTitle>
                <CardDescription>Last 3 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-indigo-600">87.4%</div>
                <p className="text-sm text-green-600 mt-1">↑ 2.1% from previous period</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-gray-800">MAPE</CardTitle>
                <CardDescription>Mean Absolute Percentage Error</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-indigo-600">12.6%</div>
                <p className="text-sm text-green-600 mt-1">↓ 2.1% from previous period</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-gray-800">Forecast Horizon</CardTitle>
                <CardDescription>Current setting</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-indigo-600">12 months</div>
                <p className="text-sm text-gray-500 mt-1">Updated weekly</p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle className="text-xl font-medium text-gray-800">Statistical Forecast</CardTitle>
                  <CardDescription>
                    Automatically generated forecasts based on historical data and statistical models
                  </CardDescription>
                </div>
                <div className="mt-4 md:mt-0 flex items-center space-x-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="confidence-interval"
                      checked={showConfidenceInterval}
                      onChange={() => setShowConfidenceInterval(!showConfidenceInterval)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="confidence-interval" className="ml-2 text-sm text-gray-700">
                      Show Confidence Interval
                    </label>
                  </div>
                  <select
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={forecastMethod}
                    onChange={(e) => setForecastMethod(e.target.value)}
                  >
                    <option value="auto">Auto ARIMA</option>
                    <option value="ets">ETS</option>
                    <option value="prophet">Prophet</option>
                    <option value="lstm">LSTM</option>
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={forecastData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {showConfidenceInterval && (
                      <Area
                        type="monotone"
                        dataKey="upper"
                        stroke="transparent"
                        fill="#8884d8"
                        fillOpacity={0.2}
                        name="Upper Bound"
                      />
                    )}
                    {showConfidenceInterval && (
                      <Area
                        type="monotone"
                        dataKey="lower"
                        stroke="transparent"
                        fill="#8884d8"
                        fillOpacity={0.2}
                        name="Lower Bound"
                      />
                    )}
                    <Line
                      type="monotone"
                      dataKey="actual"
                      stroke="#8884d8"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                      name="Actual Demand"
                    />
                    <Line
                      type="monotone"
                      dataKey="forecast"
                      stroke="#82ca9d"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ r: 4 }}
                      name="Forecast"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-medium text-gray-800">Forecast Accuracy by Product</CardTitle>
              <CardDescription>
                Comparison of forecast accuracy across different products
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={accuracyData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="product" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="accuracy" fill="#8884d8" name="Accuracy %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="collaborative" className="mt-0">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-medium text-gray-800">Collaborative Forecast</CardTitle>
              <CardDescription>
                Combine statistical forecasts with manual adjustments from sales, marketing, and other teams
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={collaborativeData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="statistical" stackId="a" fill="#8884d8" name="Statistical" />
                    <Bar dataKey="sales" stackId="b" fill="#82ca9d" name="Sales Input" />
                    <Bar dataKey="marketing" stackId="c" fill="#ffc658" name="Marketing Input" />
                    <Bar dataKey="finance" stackId="d" fill="#ff8042" name="Finance Input" />
                    <Bar dataKey="final" fill="#0088FE" name="Final Forecast" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium text-gray-800">Department Contributions</CardTitle>
                <CardDescription>
                  Input from different departments for the collaborative forecast
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Sales</span>
                    <div className="w-64 bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '35%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">35%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Marketing</span>
                    <div className="w-64 bg-gray-200 rounded-full h-2.5">
                      <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">25%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Finance</span>
                    <div className="w-64 bg-gray-200 rounded-full h-2.5">
                      <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">15%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Statistical</span>
                    <div className="w-64 bg-gray-200 rounded-full h-2.5">
                      <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">25%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium text-gray-800">Forecast Adjustments</CardTitle>
                <CardDescription>
                  Recent adjustments to the collaborative forecast
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-gray-50 rounded-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-800">Sales Team</p>
                        <p className="text-sm text-gray-600">Increased Q2 forecast by 5%</p>
                      </div>
                      <span className="text-xs text-gray-500">2 days ago</span>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-800">Marketing</p>
                        <p className="text-sm text-gray-600">Added impact of new campaign</p>
                      </div>
                      <span className="text-xs text-gray-500">3 days ago</span>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-800">Finance</p>
                        <p className="text-sm text-gray-600">Adjusted for price changes</p>
                      </div>
                      <span className="text-xs text-gray-500">5 days ago</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 