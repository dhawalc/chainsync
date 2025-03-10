'use client';

import React, { useState, useEffect } from 'react';
import { Select } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  ResponsiveContainer 
} from 'recharts';
import { ChevronDownIcon, ChevronRightIcon, ArrowDownTrayIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

// Mock data for the report
const productOptions = [
  { value: 'product-a', label: 'Product A - Smartphone' },
  { value: 'product-b', label: 'Product B - Tablet' },
  { value: 'product-c', label: 'Product C - Laptop' },
  { value: 'product-d', label: 'Product D - Desktop' },
  { value: 'product-e', label: 'Product E - Wearable' },
];

const timeBucketOptions = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'rolling-quarterly', label: 'Rolling Quarterly' },
  { value: 'physical-quarter', label: 'Physical Quarter' },
];

const locationOptions = [
  { value: 'all', label: 'All Locations' },
  { value: 'factory-1', label: 'Factory 1' },
  { value: 'factory-2', label: 'Factory 2' },
  { value: 'factory-3', label: 'Factory 3' },
  { value: 'factory-4', label: 'Factory 4' },
];

// Generate dates for the next 8 weeks
const generateDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 8; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i * 7);
    dates.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
  }
  return dates;
};

const dates = generateDates();

// Generate mock data for the report
const generateReportData = () => {
  const topLevelData = {
    product: 'Product A',
    description: 'High-end Smartphone',
    location: 'Factory 1',
    data: dates.map((date, index) => {
      const required = 1000 + index * 200;
      const supply = Math.floor(required * (0.9 + Math.random() * 0.2));
      const projectedInventory = Math.max(0, supply - required + (index > 0 ? 200 : 0));
      return { date, required, supply, projectedInventory };
    })
  };

  const level2Components = [
    {
      component: 'Component 1 - Display Module',
      location: 'Factory 2',
      expanded: false,
      data: dates.map((date, index) => {
        const required = 1000 + index * 200;
        const supply = Math.floor(required * (0.85 + Math.random() * 0.3));
        const projectedInventory = Math.max(0, supply - required + (index > 0 ? 150 : 0));
        return { date, required, supply, projectedInventory };
      })
    },
    {
      component: 'Component 2 - Battery',
      location: 'Factory 3',
      expanded: false,
      data: dates.map((date, index) => {
        const required = 1000 + index * 200;
        const supply = Math.floor(required * (0.9 + Math.random() * 0.15));
        const projectedInventory = Math.max(0, supply - required + (index > 0 ? 100 : 0));
        return { date, required, supply, projectedInventory };
      })
    }
  ];

  const level3Components = [
    {
      component: 'Subcomponent 1 - LCD Panel',
      location: 'Factory 4',
      parentComponent: 'Component 1 - Display Module',
      data: dates.map((date, index) => {
        const required = 1000 + index * 200;
        const supply = Math.floor(required * (0.8 + Math.random() * 0.3));
        const projectedInventory = Math.max(0, supply - required + (index > 0 ? 120 : 0));
        return { date, required, supply, projectedInventory };
      })
    },
    {
      component: 'Subcomponent 2 - Touch Controller',
      location: 'Factory 5',
      parentComponent: 'Component 1 - Display Module',
      data: dates.map((date, index) => {
        const required = 1000 + index * 200;
        const supply = Math.floor(required * (0.85 + Math.random() * 0.25));
        const projectedInventory = Math.max(0, supply - required + (index > 0 ? 80 : 0));
        return { date, required, supply, projectedInventory };
      })
    },
    {
      component: 'Subcomponent 3 - Battery Cells',
      location: 'Factory 6',
      parentComponent: 'Component 2 - Battery',
      data: dates.map((date, index) => {
        const required = 1000 + index * 200;
        const supply = Math.floor(required * (0.9 + Math.random() * 0.2));
        const projectedInventory = Math.max(0, supply - required + (index > 0 ? 90 : 0));
        return { date, required, supply, projectedInventory };
      })
    }
  ];

  return { topLevelData, level2Components, level3Components };
};

// Generate chart data
const generateChartData = (componentData) => {
  return componentData.data.map((item) => ({
    date: item.date,
    Required: item.required,
    Supply: item.supply,
    'Projected Inventory': item.projectedInventory
  }));
};

export default function ProductReportPage() {
  const [selectedProduct, setSelectedProduct] = useState(productOptions[0].value);
  const [selectedTimeBucket, setSelectedTimeBucket] = useState(timeBucketOptions[2].value);
  const [selectedLocation, setSelectedLocation] = useState(locationOptions[0].value);
  const [showProjectedInventory, setShowProjectedInventory] = useState(true);
  const [reportData, setReportData] = useState(generateReportData());
  const [expandedComponents, setExpandedComponents] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('table');
  const [selectedComponent, setSelectedComponent] = useState(null);

  // Simulate loading data when filters change
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      setReportData(generateReportData());
      setIsLoading(false);
    };
    
    loadData();
  }, [selectedProduct, selectedTimeBucket, selectedLocation]);

  const toggleComponentExpansion = (componentName) => {
    setExpandedComponents({
      ...expandedComponents,
      [componentName]: !expandedComponents[componentName]
    });
  };

  const handleComponentSelect = (component) => {
    setSelectedComponent(component);
    setActiveTab('chart');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Product Report</h1>
        
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center">
            <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" className="flex items-center" onClick={() => setReportData(generateReportData())}>
            <ArrowPathIcon className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>
      
      {/* Report Controls */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg">Report Parameters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="bom-selection" className="block text-sm font-medium text-gray-700 mb-1">
                Top Level BOM for Report Out:
              </Label>
              <select
                id="bom-selection"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
              >
                {productOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            
            <div>
              <Label htmlFor="time-bucket" className="block text-sm font-medium text-gray-700 mb-1">
                Time Bucket:
              </Label>
              <select
                id="time-bucket"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedTimeBucket}
                onChange={(e) => setSelectedTimeBucket(e.target.value)}
              >
                {timeBucketOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            
            <div>
              <Label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location:
              </Label>
              <select
                id="location"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                {locationOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-4 flex items-center">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="projected-inventory" 
                checked={showProjectedInventory}
                onCheckedChange={(checked) => setShowProjectedInventory(checked === true)}
              />
              <Label htmlFor="projected-inventory" className="text-sm font-medium text-gray-700">
                With Projected Inventory?
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* View Tabs */}
      <div className="flex mb-6 border-b border-gray-200">
        <button
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'table' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('table')}
        >
          Table View
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'chart' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('chart')}
        >
          Chart View
        </button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : activeTab === 'table' ? (
        /* Table View */
        <div className="space-y-8">
          {/* Top Level Manufacturing Process */}
          <Card>
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-lg">Top Level of Mfg Process: {reportData.topLevelData.product}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Product</th>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Product Description</th>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Location</th>
                      {dates.map((date, index) => (
                        <th key={index} className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{date}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap font-medium" rowSpan={showProjectedInventory ? 3 : 2}>{reportData.topLevelData.product}</td>
                      <td className="px-4 py-2 whitespace-nowrap" rowSpan={showProjectedInventory ? 3 : 2}>{reportData.topLevelData.description}</td>
                      <td className="px-4 py-2 whitespace-nowrap" rowSpan={showProjectedInventory ? 3 : 2}>{reportData.topLevelData.location}</td>
                      {reportData.topLevelData.data.map((item, index) => (
                        <td key={index} className="px-4 py-2 whitespace-nowrap text-gray-700">{item.required.toLocaleString()}</td>
                      ))}
                    </tr>
                    <tr>
                      {reportData.topLevelData.data.map((item, index) => (
                        <td key={index} className="px-4 py-2 whitespace-nowrap text-blue-600">{item.supply.toLocaleString()}</td>
                      ))}
                    </tr>
                    {showProjectedInventory && (
                      <tr>
                        {reportData.topLevelData.data.map((item, index) => (
                          <td key={index} className="px-4 py-2 whitespace-nowrap text-green-600">{item.projectedInventory.toLocaleString()}</td>
                        ))}
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          {/* Level 2 Components */}
          <Card>
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-lg">Level 2 Components</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Component</th>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Location</th>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6"></th>
                      {dates.map((date, index) => (
                        <th key={index} className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{date}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reportData.level2Components.map((component, componentIndex) => (
                      <React.Fragment key={componentIndex}>
                        <tr className="cursor-pointer hover:bg-gray-50" onClick={() => handleComponentSelect(component)}>
                          <td className="px-4 py-2 whitespace-nowrap font-medium" rowSpan={showProjectedInventory ? 3 : 2}>
                            <div className="flex items-center">
                              <button 
                                className="mr-2 focus:outline-none" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleComponentExpansion(component.component);
                                }}
                              >
                                {expandedComponents[component.component] ? (
                                  <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                                ) : (
                                  <ChevronRightIcon className="h-4 w-4 text-gray-500" />
                                )}
                              </button>
                              {component.component}
                            </div>
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap" rowSpan={showProjectedInventory ? 3 : 2}>{component.location}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-500">Required</td>
                          {component.data.map((item, index) => (
                            <td key={index} className="px-4 py-2 whitespace-nowrap text-gray-700">{item.required.toLocaleString()}</td>
                          ))}
                        </tr>
                        <tr className="hover:bg-gray-50" onClick={() => handleComponentSelect(component)}>
                          <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-500">Supply</td>
                          {component.data.map((item, index) => (
                            <td key={index} className="px-4 py-2 whitespace-nowrap text-blue-600">{item.supply.toLocaleString()}</td>
                          ))}
                        </tr>
                        {showProjectedInventory && (
                          <tr className="hover:bg-gray-50" onClick={() => handleComponentSelect(component)}>
                            <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-500">Projected Inventory</td>
                            {component.data.map((item, index) => (
                              <td key={index} className="px-4 py-2 whitespace-nowrap text-green-600">{item.projectedInventory.toLocaleString()}</td>
                            ))}
                          </tr>
                        )}
                        
                        {/* Level 3 Components (if expanded) */}
                        {expandedComponents[component.component] && reportData.level3Components
                          .filter(subcomp => subcomp.parentComponent === component.component)
                          .map((subcomp, subIndex) => (
                            <React.Fragment key={subIndex}>
                              <tr className="bg-gray-50 hover:bg-gray-100" onClick={() => handleComponentSelect(subcomp)}>
                                <td className="px-4 py-2 whitespace-nowrap font-medium pl-8" rowSpan={showProjectedInventory ? 3 : 2}>
                                  {subcomp.component}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap" rowSpan={showProjectedInventory ? 3 : 2}>{subcomp.location}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-500">Required</td>
                                {subcomp.data.map((item, index) => (
                                  <td key={index} className="px-4 py-2 whitespace-nowrap text-gray-700">{item.required.toLocaleString()}</td>
                                ))}
                              </tr>
                              <tr className="bg-gray-50 hover:bg-gray-100" onClick={() => handleComponentSelect(subcomp)}>
                                <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-500">Supply</td>
                                {subcomp.data.map((item, index) => (
                                  <td key={index} className="px-4 py-2 whitespace-nowrap text-blue-600">{item.supply.toLocaleString()}</td>
                                ))}
                              </tr>
                              {showProjectedInventory && (
                                <tr className="bg-gray-50 hover:bg-gray-100" onClick={() => handleComponentSelect(subcomp)}>
                                  <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-500">Projected Inventory</td>
                                  {subcomp.data.map((item, index) => (
                                    <td key={index} className="px-4 py-2 whitespace-nowrap text-green-600">{item.projectedInventory.toLocaleString()}</td>
                                  ))}
                                </tr>
                              )}
                            </React.Fragment>
                          ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        /* Chart View */
        <Card>
          <CardHeader className="bg-gray-50">
            <CardTitle className="text-lg">
              {selectedComponent ? 
                `${selectedComponent.component || reportData.topLevelData.product} - ${selectedComponent.location || reportData.topLevelData.location}` : 
                `${reportData.topLevelData.product} - ${reportData.topLevelData.location}`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={selectedComponent ? 
                    generateChartData(selectedComponent) : 
                    generateChartData(reportData.topLevelData)}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="Required" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="Supply" 
                    stroke="#82ca9d" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                  {showProjectedInventory && (
                    <Line 
                      type="monotone" 
                      dataKey="Projected Inventory" 
                      stroke="#ffc658" 
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            {!selectedComponent && (
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Component Breakdown</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={reportData.level2Components.map(comp => ({
                        name: comp.component.split(' - ')[0],
                        required: comp.data.reduce((sum, item) => sum + item.required, 0),
                        supply: comp.data.reduce((sum, item) => sum + item.supply, 0),
                      }))}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="required" fill="#8884d8" name="Total Required" />
                      <Bar dataKey="supply" fill="#82ca9d" name="Total Supply" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Supply vs. Demand Trend</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={dates.map((date, i) => ({
                        date,
                        required: reportData.topLevelData.data[i].required,
                        supply: reportData.topLevelData.data[i].supply,
                        gap: reportData.topLevelData.data[i].supply - reportData.topLevelData.data[i].required,
                      }))}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="gap" stroke="#ff7300" name="Supply-Demand Gap" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
} 