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

// Add interfaces for data types
interface ProductOption {
  value: string;
  label: string;
}

interface TimeBucketOption {
  value: string;
  label: string;
}

interface LocationOption {
  value: string;
  label: string;
}

interface DataPoint {
  date: string;
  required: number;
  supply: number;
  projectedInventory: number;
}

interface ComponentData {
  component: string;
  location: string;
  expanded?: boolean;
  parentComponent?: string;
  data: DataPoint[];
}

interface TopLevelData {
  product: string;
  description: string;
  location: string;
  data: DataPoint[];
}

interface ReportData {
  topLevelData: TopLevelData;
  level2Components: ComponentData[];
  level3Components: ComponentData[];
}

interface ChartDataPoint {
  date: string;
  Required: number;
  Supply: number;
  'Projected Inventory': number;
}

// Add interfaces for chart components
interface ChartProps {
  data: any[];
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
}

interface ReportControlsProps {
  selectedProduct: string;
  selectedTimeBucket: string;
  selectedLocation: string;
  showProjectedInventory: boolean;
  onProductChange: (value: string) => void;
  onTimeBucketChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onProjectedInventoryChange: (checked: boolean) => void;
}

interface ReportTableProps {
  data: DataPoint[];
  dates: string[];
  showProjectedInventory: boolean;
  onComponentSelect: (component: ComponentData) => void;
}

interface ReportChartProps {
  data: ChartDataPoint[];
  showProjectedInventory: boolean;
}

// Add type for chart data
type ChartData = DataPoint[] | ComponentData[] | TopLevelData[];

// Add utility function for chart data type checking
const isDataPoint = (data: ChartData): data is DataPoint[] => {
  return data.length > 0 && 'date' in data[0] && 'required' in data[0];
};

const isComponentData = (data: ChartData): data is ComponentData[] => {
  return data.length > 0 && 'component' in data[0] && 'data' in data[0];
};

const isTopLevelData = (data: ChartData): data is TopLevelData[] => {
  return data.length > 0 && 'product' in data[0] && 'data' in data[0];
};

// Add types for chart data
interface ComponentBreakdownData {
  name: string;
  required: number;
  supply: number;
}

interface SupplyDemandData {
  date: string;
  required: number;
  supply: number;
  gap: number;
}

// Add utility functions with proper types
const calculateTotalRequired = (data: DataPoint[]): number => {
  return data.reduce((sum, item) => sum + item.required, 0);
};

const calculateTotalSupply = (data: DataPoint[]): number => {
  return data.reduce((sum, item) => sum + item.supply, 0);
};

const calculateSupplyDemandGap = (required: number, supply: number): number => {
  return supply - required;
};

// Add types for event handlers
type ProductChangeHandler = (value: string) => void;
type TimeBucketChangeHandler = (value: string) => void;
type LocationChangeHandler = (value: string) => void;
type ProjectedInventoryChangeHandler = (checked: boolean) => void;
type ComponentExpansionHandler = (componentName: string) => void;
type ComponentSelectHandler = (component: ComponentData) => void;

// Add type for loading state
interface LoadingState {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

// Add type for report state
interface ReportState {
  reportData: ReportData;
  setReportData: (data: ReportData) => void;
}

// Add type for component state
interface ComponentState {
  expandedComponents: Record<string, boolean>;
  selectedComponent: ComponentData | null;
  activeTab: 'table' | 'chart';
  setExpandedComponents: (components: Record<string, boolean>) => void;
  setSelectedComponent: (component: ComponentData | null) => void;
  setActiveTab: (tab: 'table' | 'chart') => void;
}

// Add ReportControls component with proper types
const ReportControls: React.FC<ReportControlsProps> = ({
  selectedProduct,
  selectedTimeBucket,
  selectedLocation,
  showProjectedInventory,
  onProductChange,
  onTimeBucketChange,
  onLocationChange,
  onProjectedInventoryChange,
}) => {
  return (
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
              onChange={(e) => onProductChange(e.target.value)}
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
              onChange={(e) => onTimeBucketChange(e.target.value)}
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
              onChange={(e) => onLocationChange(e.target.value)}
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
              onCheckedChange={(checked) => onProjectedInventoryChange(checked === true)}
            />
            <Label htmlFor="projected-inventory" className="text-sm font-medium text-gray-700">
              With Projected Inventory?
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Add ReportTable component with proper types
const ReportTable: React.FC<ReportTableProps> = ({
  data,
  dates,
  showProjectedInventory,
  onComponentSelect,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Date</th>
            {dates.map((date, index) => (
              <th key={index} className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{date}</th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-500">Required</td>
            {data.map((item, index) => (
              <td key={index} className="px-4 py-2 whitespace-nowrap text-gray-700">{formatNumber(item.required)}</td>
            ))}
          </tr>
          <tr>
            <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-500">Supply</td>
            {data.map((item, index) => (
              <td key={index} className="px-4 py-2 whitespace-nowrap text-blue-600">{formatNumber(item.supply)}</td>
            ))}
          </tr>
          {showProjectedInventory && (
            <tr>
              <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-500">Projected Inventory</td>
              {data.map((item, index) => (
                <td key={index} className="px-4 py-2 whitespace-nowrap text-green-600">{formatNumber(item.projectedInventory)}</td>
              ))}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// Add ReportChart component with proper types
const ReportChart: React.FC<ReportChartProps> = ({
  data,
  showProjectedInventory,
}) => {
  return (
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
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
  );
};

// Mock data for the report
const productOptions: ProductOption[] = [
  { value: 'product-a', label: 'Product A - Smartphone' },
  { value: 'product-b', label: 'Product B - Tablet' },
  { value: 'product-c', label: 'Product C - Laptop' },
  { value: 'product-d', label: 'Product D - Desktop' },
  { value: 'product-e', label: 'Product E - Wearable' },
];

const timeBucketOptions: TimeBucketOption[] = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'rolling-quarterly', label: 'Rolling Quarterly' },
  { value: 'physical-quarter', label: 'Physical Quarter' },
];

const locationOptions: LocationOption[] = [
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
const generateReportData = (): ReportData => {
  const topLevelData: TopLevelData = {
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

  const level2Components: ComponentData[] = [
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

  const level3Components: ComponentData[] = [
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

// Update generateChartData to handle both types
const generateChartData = (componentData: ComponentData | TopLevelData): ChartDataPoint[] => {
  return componentData.data.map((item) => ({
    date: item.date,
    Required: item.required,
    Supply: item.supply,
    'Projected Inventory': item.projectedInventory
  }));
};

// Add a utility function for consistent number formatting
const formatNumber = (num: number) => {
  // Use a simple approach that works the same on server and client
  return num.toString();
};

// Add utility function for component breakdown data
const generateComponentBreakdownData = (components: ComponentData[]): ComponentBreakdownData[] => {
  return components.map(comp => ({
    name: comp.component.split(' - ')[0],
    required: calculateTotalRequired(comp.data),
    supply: calculateTotalSupply(comp.data),
  }));
};

// Add utility function for supply demand data
const generateSupplyDemandData = (dates: string[], data: DataPoint[]): SupplyDemandData[] => {
  return dates.map((date, i) => ({
    date,
    required: data[i].required,
    supply: data[i].supply,
    gap: calculateSupplyDemandGap(data[i].required, data[i].supply),
  }));
};

// Update the main component with proper types
export default function ProductReportPage() {
  // State management with proper types
  const [selectedProduct, setSelectedProduct] = useState<string>(productOptions[0].value);
  const [selectedTimeBucket, setSelectedTimeBucket] = useState<string>(timeBucketOptions[2].value);
  const [selectedLocation, setSelectedLocation] = useState<string>(locationOptions[0].value);
  const [showProjectedInventory, setShowProjectedInventory] = useState<boolean>(true);
  const [reportData, setReportData] = useState<ReportData>(generateReportData());
  const [expandedComponents, setExpandedComponents] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'table' | 'chart'>('table');
  const [selectedComponent, setSelectedComponent] = useState<ComponentData | null>(null);

  // Event handlers with proper types
  const handleProductChange: ProductChangeHandler = (value) => {
    setSelectedProduct(value);
  };

  const handleTimeBucketChange: TimeBucketChangeHandler = (value) => {
    setSelectedTimeBucket(value);
  };

  const handleLocationChange: LocationChangeHandler = (value) => {
    setSelectedLocation(value);
  };

  const handleProjectedInventoryChange: ProjectedInventoryChangeHandler = (checked) => {
    setShowProjectedInventory(checked);
  };

  const handleComponentExpansion: ComponentExpansionHandler = (componentName) => {
    setExpandedComponents({
      ...expandedComponents,
      [componentName]: !expandedComponents[componentName]
    });
  };

  const handleComponentSelect: ComponentSelectHandler = (component) => {
    setSelectedComponent(component);
    setActiveTab('chart');
  };

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Product Report</h1>
        
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center">
            <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center" 
            onClick={() => setReportData(generateReportData())}
          >
            <ArrowPathIcon className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>
      
      <ReportControls
        selectedProduct={selectedProduct}
        selectedTimeBucket={selectedTimeBucket}
        selectedLocation={selectedLocation}
        showProjectedInventory={showProjectedInventory}
        onProductChange={handleProductChange}
        onTimeBucketChange={handleTimeBucketChange}
        onLocationChange={handleLocationChange}
        onProjectedInventoryChange={handleProjectedInventoryChange}
      />
      
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
              <ReportTable
                data={reportData.topLevelData.data}
                dates={dates}
                showProjectedInventory={showProjectedInventory}
                onComponentSelect={handleComponentSelect}
              />
            </CardContent>
          </Card>
          
          {/* Level 2 Components */}
          <Card>
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-lg">Level 2 Components</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {reportData.level2Components.map((component, index) => (
                <div key={index} className="mb-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50">
                    <div className="flex items-center">
                      <button 
                        className="mr-2 focus:outline-none" 
                        onClick={() => handleComponentExpansion(component.component)}
                      >
                        {expandedComponents[component.component] ? (
                          <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                        ) : (
                          <ChevronRightIcon className="h-4 w-4 text-gray-500" />
                        )}
                      </button>
                      <h3 className="font-medium">{component.component}</h3>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleComponentSelect(component)}
                    >
                      View Chart
                    </Button>
                  </div>
                  {expandedComponents[component.component] && (
                    <ReportTable
                      data={component.data}
                      dates={dates}
                      showProjectedInventory={showProjectedInventory}
                      onComponentSelect={handleComponentSelect}
                    />
                  )}
                </div>
              ))}
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
            <ReportChart
              data={selectedComponent ? 
                generateChartData(selectedComponent) : 
                generateChartData(reportData.topLevelData)}
              showProjectedInventory={showProjectedInventory}
            />
            
            {!selectedComponent && (
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Component Breakdown</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={generateComponentBreakdownData(reportData.level2Components)}
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
                      data={generateSupplyDemandData(dates, reportData.topLevelData.data)}
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