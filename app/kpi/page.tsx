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
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

// Add interfaces for data types
interface KpiTrendData {
  month: string;
  otd: number;
  quality: number;
  inventory: number;
  cost: number;
}

interface SupplierPerformanceData {
  name: string;
  otd: number;
  quality: number;
  responsiveness: number;
  cost: number;
}

interface InventoryBreakdownData {
  name: string;
  value: number;
}

interface RadarData {
  subject: string;
  A: number;
  B: number;
  fullMark: number;
}

interface KpiOption {
  id: keyof KpiTrendData;
  name: string;
  color: string;
}

// Mock data for KPI metrics
const kpiTrendData: KpiTrendData[] = [
  { month: 'Jan', otd: 88, quality: 92, inventory: 4.2, cost: 95 },
  { month: 'Feb', otd: 90, quality: 93, inventory: 4.3, cost: 96 },
  { month: 'Mar', otd: 89, quality: 94, inventory: 4.5, cost: 94 },
  { month: 'Apr', otd: 92, quality: 95, inventory: 4.7, cost: 93 },
  { month: 'May', otd: 94, quality: 94, inventory: 4.8, cost: 92 },
  { month: 'Jun', otd: 93, quality: 96, inventory: 5.0, cost: 91 },
  { month: 'Jul', otd: 95, quality: 95, inventory: 5.2, cost: 93 },
  { month: 'Aug', otd: 96, quality: 97, inventory: 5.3, cost: 94 },
  { month: 'Sep', otd: 94, quality: 96, inventory: 5.5, cost: 95 },
  { month: 'Oct', otd: 97, quality: 98, inventory: 5.6, cost: 96 },
  { month: 'Nov', otd: 96, quality: 97, inventory: 5.8, cost: 97 },
  { month: 'Dec', otd: 98, quality: 99, inventory: 6.0, cost: 98 },
];

const supplierPerformanceData: SupplierPerformanceData[] = [
  { name: 'Acme Components', otd: 92, quality: 95, responsiveness: 88, cost: 90 },
  { name: 'Global Materials', otd: 85, quality: 90, responsiveness: 82, cost: 95 },
  { name: 'Tech Solutions', otd: 97, quality: 98, responsiveness: 95, cost: 85 },
  { name: 'Precision Parts', otd: 94, quality: 96, responsiveness: 90, cost: 92 },
  { name: 'EcoPackaging', otd: 90, quality: 93, responsiveness: 87, cost: 96 },
];

const inventoryBreakdownData: InventoryBreakdownData[] = [
  { name: 'Raw Materials', value: 35 },
  { name: 'Work in Progress', value: 25 },
  { name: 'Finished Goods', value: 30 },
  { name: 'MRO Supplies', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const radarData: RadarData[] = [
  { subject: 'On-Time Delivery', A: 95, B: 85, fullMark: 100 },
  { subject: 'Quality', A: 98, B: 90, fullMark: 100 },
  { subject: 'Cost', A: 92, B: 96, fullMark: 100 },
  { subject: 'Inventory Turns', A: 90, B: 80, fullMark: 100 },
  { subject: 'Forecast Accuracy', A: 85, B: 88, fullMark: 100 },
  { subject: 'Lead Time', A: 88, B: 82, fullMark: 100 },
];

// Update kpiOptions with proper type
const kpiOptions: KpiOption[] = [
  { id: 'otd', name: 'On-Time Delivery', color: '#8884d8' },
  { id: 'quality', name: 'Quality Compliance', color: '#82ca9d' },
  { id: 'inventory', name: 'Inventory Turnover', color: '#ffc658' },
  { id: 'cost', name: 'Cost Adherence', color: '#ff8042' },
];

// Add a utility function for consistent number formatting
const formatNumber = (num: number) => {
  // Use a simple approach that works the same on server and client
  return num.toString();
};

// Add interfaces for chart components
interface ChartProps {
  data: any[];
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
}

interface KpiCardProps {
  kpi: KpiOption;
  currentValue: string | number;
  previousValue: string | number;
  isSelected: boolean;
  onClick: () => void;
}

// Add type for timeframe options
type TimeframeOption = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';

// Add type for chart data
type ChartData = KpiTrendData[] | SupplierPerformanceData[] | InventoryBreakdownData[] | RadarData[];

// Add utility function for chart data type checking
const isKpiTrendData = (data: ChartData): data is KpiTrendData[] => {
  return data.length > 0 && 'month' in data[0] && 'otd' in data[0];
};

const isSupplierPerformanceData = (data: ChartData): data is SupplierPerformanceData[] => {
  return data.length > 0 && 'name' in data[0] && 'otd' in data[0] && 'responsiveness' in data[0];
};

const isInventoryBreakdownData = (data: ChartData): data is InventoryBreakdownData[] => {
  return data.length > 0 && 'name' in data[0] && 'value' in data[0];
};

const isRadarData = (data: ChartData): data is RadarData[] => {
  return data.length > 0 && 'subject' in data[0] && 'A' in data[0] && 'B' in data[0];
};

// Add KpiCard component with proper types
const KpiCard: React.FC<KpiCardProps> = ({ kpi, currentValue, previousValue, isSelected, onClick }) => {
  const currentNum = Number(currentValue);
  const previousNum = Number(previousValue);
  const change = currentNum - previousNum;
  const formattedValue = kpi.id === 'inventory' 
    ? currentNum.toFixed(1)
    : `${currentNum}%`;
  const formattedChange = `${change >= 0 ? '↑' : '↓'} ${Math.abs(change).toFixed(1)}${kpi.id === 'inventory' ? '' : '%'}`;

  return (
    <div 
      className={`bg-white rounded-lg shadow-md p-6 cursor-pointer transition-all ${
        isSelected ? 'ring-2 ring-blue-500' : 'hover:shadow-lg'
      }`}
      onClick={onClick}
    >
      <h3 className="text-sm font-medium text-gray-500 mb-1">{kpi.name}</h3>
      <div className="flex items-end">
        <p className="text-3xl font-bold">{formattedValue}</p>
        <span className={`ml-2 text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {formattedChange}
        </span>
      </div>
      <p className="text-xs text-gray-500 mt-1">vs. Previous Month</p>
    </div>
  );
};

export default function KpiDashboardPage() {
  const [timeframe, setTimeframe] = useState<TimeframeOption>('monthly');
  const [selectedKpi, setSelectedKpi] = useState<keyof KpiTrendData>('otd');
  
  const selectedKpiOption = kpiOptions.find(option => option.id === selectedKpi);
  
  // Add type safety for chart data
  const getChartData = (): KpiTrendData[] => {
    switch (timeframe) {
      case 'daily':
        return kpiTrendData.slice(-7);
      case 'weekly':
        return kpiTrendData.slice(-4);
      case 'monthly':
        return kpiTrendData;
      case 'quarterly':
        return kpiTrendData.filter((_, index) => index % 3 === 0);
      case 'yearly':
        return kpiTrendData.filter((_, index) => index % 12 === 0);
      default:
        return kpiTrendData;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">KPI Dashboard</h1>
        
        <div className="flex items-center space-x-4">
          <select 
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value as TimeframeOption)}
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
        {kpiOptions.map((kpi) => (
          <KpiCard
            key={kpi.id}
            kpi={kpi}
            currentValue={kpiTrendData[kpiTrendData.length - 1][kpi.id]}
            previousValue={kpiTrendData[kpiTrendData.length - 2][kpi.id]}
            isSelected={selectedKpi === kpi.id}
            onClick={() => setSelectedKpi(kpi.id)}
          />
        ))}
      </div>
      
      {/* Main KPI Trend Chart */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">
          {selectedKpiOption?.name} Trend
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={getChartData()}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={selectedKpi === 'inventory' ? [0, 'auto'] : [0, 100]} />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey={selectedKpi} 
                stroke={selectedKpiOption?.color} 
                activeDot={{ r: 8 }} 
                name={selectedKpiOption?.name}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Top Supplier Performance</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={supplierPerformanceData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Legend />
                <Bar dataKey="otd" fill="#8884d8" name="On-Time Delivery" />
                <Bar dataKey="quality" fill="#82ca9d" name="Quality" />
                <Bar dataKey="responsiveness" fill="#ffc658" name="Responsiveness" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Inventory Breakdown</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={inventoryBreakdownData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {inventoryBreakdownData.map((entry, index) => (
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
      
      {/* Radar Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Performance Comparison</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar name="Current Period" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <Radar name="Previous Period" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
              <Legend />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
} 