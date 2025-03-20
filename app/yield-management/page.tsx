'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDownIcon, ChevronRightIcon, ChevronLeftIcon, CheckCircleIcon, CalendarIcon } from '@heroicons/react/24/solid';

// Define types for our data
interface HierarchyNode {
  id: string;
  name: string;
  type: string;
  children?: HierarchyNode[];
  isExpanded?: boolean;
}

interface YieldData {
  productId: string;
  month: string;
  year: string;
  yield: number | null;
  isEdited?: boolean;
}

type TimeBucket = 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'YEARLY';

interface DateRangeValue {
  fromDate: Date;
  toDate: Date;
  value: number;
}

export default function YieldManagement() {
  // State for time buckets
  const [selectedBucket, setSelectedBucket] = useState('MONTHLY');
  const timeBuckets = ['WEEKLY', 'MONTHLY', 'QUARTERLY', 'YEARLY'];
  
  // State for hierarchy data
  const [hierarchyData, setHierarchyData] = useState<HierarchyNode[]>([]);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['business-1', 'category-1', 'tech-1', 'line-1']));
  
  // State for yield data
  const [yieldData, setYieldData] = useState<YieldData[]>([]);
  
  // State for loading and saving
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // State for toast notifications
  const [toast, setToast] = useState<{ visible: boolean, title: string, message: string, type: 'success' | 'error' | 'info' }>({
    visible: false,
    title: '',
    message: '',
    type: 'info'
  });

  // State for current year and navigation
  const [currentYear, setCurrentYear] = useState(2025);
  
  // Mock data for months
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
  const weeks = Array.from({ length: 52 }, (_, i) => `Week ${i + 1}`);

  // Add new state for period navigation
  const [periodOffset, setPeriodOffset] = useState(0);
  const [showDateRangePicker, setShowDateRangePicker] = useState(false);
  const [dateRangeValue, setDateRangeValue] = useState<DateRangeValue | null>(null);
  const [selectedNodeForDateRange, setSelectedNodeForDateRange] = useState<string | null>(null);

  // Initialize with mock data
  useEffect(() => {
    // Mock hierarchy data
    const mockHierarchyData: HierarchyNode[] = [
      {
        id: 'business-1',
        name: 'Logic Chips',
        type: 'BUSINESS_UNIT',
        children: [
          {
            id: 'category-1',
            name: 'Microprocessors',
            type: 'PRODUCT_CATEGORY',
            children: [
              {
                id: 'tech-1',
                name: '7nm',
                type: 'TECHNOLOGY_NODE',
                children: [
                  {
                    id: 'line-1',
                    name: 'Data Center',
                    type: 'PRODUCT_LINE',
                    children: [
                      { id: 'product-1', name: 'PRD1', type: 'PRODUCT' },
                      { id: 'product-2', name: 'PRD2006', type: 'PRODUCT' },
                      { id: 'product-3', name: 'PRD2678', type: 'PRODUCT' }
                    ]
                  },
                  {
                    id: 'line-2',
                    name: 'Mobile Computing',
                    type: 'PRODUCT_LINE',
                    children: [
                      { id: 'product-4', name: 'MCU2023', type: 'PRODUCT' },
                      { id: 'product-5', name: 'MCU2024', type: 'PRODUCT' }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ];
    
    setHierarchyData(mockHierarchyData);
    // Update expandedNodes to include new line
    setExpandedNodes(new Set(['business-1', 'category-1', 'tech-1', 'line-1', 'line-2']));
    
    // Generate mock yield data
    generateMockYieldData();
  }, [selectedBucket, currentYear]);
  
  // Modify the toast useEffect to show for longer
  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        setToast(prev => ({ ...prev, visible: false }));
      }, 8000); // Changed from 3000 to 8000 (8 seconds)
      
      return () => clearTimeout(timer);
    }
  }, [toast.visible]);

  // Generate mock yield data
  const generateMockYieldData = () => {
    let mockData: YieldData[] = [
      // Set default yield for 7nm technology
      { productId: 'tech-1', month: 'default', year: currentYear.toString(), yield: 98 },
    ];

    // Add data based on time bucket
    if (selectedBucket === 'WEEKLY') {
      mockData = [
        ...mockData,
        // Data Center line products with lower yields
        { productId: 'product-1', month: 'Week 14', year: currentYear.toString(), yield: 92 },
        { productId: 'product-1', month: 'Week 17', year: currentYear.toString(), yield: 95 },
        { productId: 'product-1', month: 'Week 20', year: currentYear.toString(), yield: 93 },
        
        { productId: 'product-2', month: 'Week 13', year: currentYear.toString(), yield: 88 },
        { productId: 'product-2', month: 'Week 15', year: currentYear.toString(), yield: 91 },
        { productId: 'product-2', month: 'Week 18', year: currentYear.toString(), yield: 89 },

        // Mobile Computing line products with different yields
        { productId: 'product-4', month: 'Week 13', year: currentYear.toString(), yield: 94 },
        { productId: 'product-4', month: 'Week 16', year: currentYear.toString(), yield: 96 },
        { productId: 'product-4', month: 'Week 19', year: currentYear.toString(), yield: 95 },

        { productId: 'product-5', month: 'Week 14', year: currentYear.toString(), yield: 93 },
        { productId: 'product-5', month: 'Week 17', year: currentYear.toString(), yield: 92 },
        { productId: 'product-5', month: 'Week 20', year: currentYear.toString(), yield: 94 }
      ];
    } else if (selectedBucket === 'MONTHLY') {
      mockData = [
        ...mockData,
        // Only show values that differ from default
        { productId: 'product-1', month: 'Mar', year: currentYear.toString(), yield: 97 },
        { productId: 'product-2', month: 'Mar', year: currentYear.toString(), yield: 95 },
        { productId: 'product-2', month: 'Apr', year: currentYear.toString(), yield: 96 },
        
        // Mobile Computing line products
        { productId: 'product-4', month: 'Mar', year: currentYear.toString(), yield: 96 },
        { productId: 'product-4', month: 'Apr', year: currentYear.toString(), yield: 97 },
        { productId: 'product-5', month: 'Mar', year: currentYear.toString(), yield: 94 },
        { productId: 'product-5', month: 'Apr', year: currentYear.toString(), yield: 95 }
      ];
    } else if (selectedBucket === 'QUARTERLY') {
      mockData = [
        ...mockData,
        // Data Center line products
        { productId: 'product-1', month: 'Q1', year: currentYear.toString(), yield: 96 },
        { productId: 'product-2', month: 'Q1', year: currentYear.toString(), yield: 95 },
        { productId: 'product-2', month: 'Q2', year: currentYear.toString(), yield: 96 },
        
        // Mobile Computing line products
        { productId: 'product-4', month: 'Q1', year: currentYear.toString(), yield: 97 },
        { productId: 'product-5', month: 'Q1', year: currentYear.toString(), yield: 94 },
        { productId: 'product-5', month: 'Q2', year: currentYear.toString(), yield: 95 }
      ];
    } else if (selectedBucket === 'YEARLY') {
      mockData = [
        ...mockData,
        // Only show significant yearly variations
        { productId: 'product-2', month: '2024', year: '2024', yield: 96 },
        { productId: 'product-4', month: '2024', year: '2024', yield: 97 },
        { productId: 'product-5', month: '2024', year: '2024', yield: 95 }
      ];
    }
    
    setYieldData(mockData);
  };

  // Show toast message
  const showToast = (title: string, message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({
      visible: true,
      title,
      message,
      type
    });
  };

  // Toggle node expansion
  const toggleNodeExpansion = (nodeId: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  // Handle yield value change
  const handleYieldChange = (productId: string, month: string, value: string) => {
    // Allow empty string to clear the field
    if (value === '') {
      setYieldData(prev => 
        prev.map(item => 
          item.productId === productId && item.month === month
            ? { ...item, yield: null, isEdited: true }
            : item
        )
      );
      return;
    }

    const numValue = parseInt(value, 10);
    if (isNaN(numValue) || numValue < 0 || numValue > 99) return;
    
    setYieldData(prev => {
      const existingEntry = prev.find(item => 
        item.productId === productId && item.month === month
      );

      if (existingEntry) {
        return prev.map(item => 
          item.productId === productId && item.month === month
            ? { ...item, yield: numValue, isEdited: true }
            : item
        );
      } else {
        return [...prev, {
          productId,
          month,
          year: currentYear.toString(),
          yield: numValue,
          isEdited: true
        }];
      }
    });
  };

  // Save changes
  const saveChanges = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      showToast('Success', 'Yield data has been saved successfully', 'success');
      
      // Reset isEdited flag
      setYieldData(prev => 
        prev.map(item => ({ ...item, isEdited: false }))
      );
    }, 1000);
  };

  // Get current period
  const getCurrentPeriod = () => {
    const now = new Date();
    switch (selectedBucket) {
      case 'WEEKLY':
        // Get current week number
        const start = new Date(now.getFullYear(), 0, 1);
        const week = Math.ceil((((now.getTime() - start.getTime()) / 86400000) + start.getDay() + 1) / 7);
        return `Week ${week}`;
      case 'MONTHLY':
        return months[now.getMonth()];
      case 'QUARTERLY':
        return `Q${Math.floor(now.getMonth() / 3) + 1}`;
      case 'YEARLY':
        return now.getFullYear().toString();
      default:
        return '';
    }
  };

  // Get visible periods based on current period and offset
  const getVisiblePeriods = () => {
    const allPeriods = getTimePeriods();
    const currentPeriodIndex = allPeriods.indexOf(getCurrentPeriod());
    const visibleCount = selectedBucket === 'MONTHLY' ? 6 : 4;
    
    // Calculate start index based on current period and offset
    let startIndex = currentPeriodIndex + periodOffset;
    
    // Ensure we don't go out of bounds
    if (startIndex < 0) startIndex = 0;
    if (startIndex > allPeriods.length - visibleCount) {
      startIndex = allPeriods.length - visibleCount;
    }
    
    return allPeriods.slice(startIndex, startIndex + visibleCount);
  };

  // Handle period navigation
  const handlePeriodScroll = (direction: 'left' | 'right') => {
    setPeriodOffset(prev => {
      const newOffset = direction === 'left' ? prev - 1 : prev + 1;
      const maxOffset = getTimePeriods().length - (selectedBucket === 'MONTHLY' ? 6 : 4);
      return Math.max(Math.min(newOffset, maxOffset), -getTimePeriods().length);
    });
  };

  // Handle date range selection
  const handleDateRangeSubmit = (fromDate: Date, toDate: Date, value: number) => {
    if (!selectedNodeForDateRange) return;
    
    setDateRangeValue({ fromDate, toDate, value });
    
    // Apply the value to all periods that fall within the date range for the selected node only
    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);
    
    // Generate yield data for the date range
    const newYieldData = [...yieldData];
    
    // Helper function to check if a period falls within the date range
    const isPeriodInRange = (period: string) => {
      const periodDate = getPeriodDate(period);
      return periodDate >= startDate && periodDate <= endDate;
    };
    
    // Update yield data only for the selected node
    getTimePeriods().forEach(period => {
      if (isPeriodInRange(period)) {
        const existingIndex = newYieldData.findIndex(
          item => item.productId === selectedNodeForDateRange && item.month === period
        );
        
        if (existingIndex >= 0) {
          newYieldData[existingIndex] = {
            ...newYieldData[existingIndex],
            yield: value,
            isEdited: true
          };
        } else {
          newYieldData.push({
            productId: selectedNodeForDateRange,
            month: period,
            year: currentYear.toString(),
            yield: value,
            isEdited: true
          });
        }
      }
    });
    
    setYieldData(newYieldData);
    setShowDateRangePicker(false);
    setSelectedNodeForDateRange(null);
    
    // Show success message
    showToast('Success', 'Date range values have been applied successfully', 'success');
  };

  // Helper function to get date for a period
  const getPeriodDate = (period: string): Date => {
    const date = new Date(currentYear, 0, 1);
    
    if (period.startsWith('Week')) {
      const weekNum = parseInt(period.split(' ')[1]);
      date.setDate(date.getDate() + (weekNum - 1) * 7);
    } else if (period.startsWith('Q')) {
      const quarter = parseInt(period[1]);
      date.setMonth((quarter - 1) * 3);
    } else if (months.includes(period)) {
      date.setMonth(months.indexOf(period));
    } else {
      date.setFullYear(parseInt(period));
    }
    
    return date;
  };

  // Modify getTimePeriods to handle weeks 1-52 within the year
  const getTimePeriods = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const currentWeek = Math.ceil((((now.getTime() - new Date(now.getFullYear(), 0, 1).getTime()) / 86400000) + new Date(now.getFullYear(), 0, 1).getDay() + 1) / 7);
    const currentQuarter = Math.floor(currentMonth / 3) + 1;

    switch (selectedBucket) {
      case 'WEEKLY':
        // Generate weeks 1-52, starting display from week 13
        return Array.from({ length: 52 }, (_, i) => `Week ${i + 1}`);
      case 'MONTHLY':
        // Generate all 12 months
        return months;
      case 'QUARTERLY':
        // Generate all 4 quarters
        return quarters;
      case 'YEARLY':
        // Generate 5 years centered around current year
        return Array.from({ length: 5 }, (_, i) => 
          (currentYear - 2 + i).toString()
        );
      default:
        return months;
    }
  };

  // Reset period offset when bucket changes
  useEffect(() => {
    setPeriodOffset(0);
  }, [selectedBucket]);

  // Get yield value for a specific node and time period
  const getYieldValue = (nodeId: string, period: string) => {
    const data = yieldData.find(item => 
      item.productId === nodeId && item.month === period
    );
    
    return data ? data : null;
  };

  // Render cell for yield data
  const renderCell = (nodeId: string, period: string, isDefaultYield: boolean = false) => {
    const yieldData = getYieldValue(nodeId, period);
    const isEdited = yieldData?.isEdited;
    const value = yieldData?.yield;

    return (
      <div className="relative h-full group">
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={2}
          value={value === null || value === undefined ? '' : value}
          onChange={(e) => handleYieldChange(nodeId, period, e.target.value)}
          placeholder="-"
          className={`w-full h-9 text-center text-sm transition-colors duration-75 ${
            isEdited 
              ? 'bg-blue-50/80 text-blue-700 focus:bg-white' 
              : value === null || value === undefined
                ? 'bg-[#f5fbf5] hover:bg-[#edf8ed] focus:bg-white group-hover:bg-[#edf8ed]'
                : 'bg-[#e6ffe6] text-green-700 hover:bg-[#d9f2d9] focus:bg-white'
          } border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset selection:bg-[#b3d7ff]`}
        />
      </div>
    );
  };

  // Render date range button
  const renderDateRangeButton = (nodeId: string) => (
    <button
      onClick={() => {
        setShowDateRangePicker(true);
        setSelectedNodeForDateRange(nodeId);
      }}
      className="w-full h-8 flex items-center justify-center gap-1.5 text-green-700 bg-[#e6ffe6] hover:bg-[#d9f2d9] border border-green-200 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-xs font-medium"
    >
      <CalendarIcon className="h-3.5 w-3.5" />
      <span>Date Range</span>
    </button>
  );

  // Get visible periods
  const periods = getTimePeriods();

  // Render yield table
  const renderYieldTable = () => {
    return (
      <div className="relative">
        <table className="border-collapse w-full select-none">
          <thead>
            <tr>
              <th className="sticky left-0 z-20 px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap w-[200px] bg-[#e6ffe6] border border-gray-200">
                Hierarchy
              </th>
              <th className="sticky left-[200px] z-20 px-2 py-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap w-[80px] bg-[#e6ffe6] border border-gray-200">
                Default %
              </th>
              <th className="sticky left-[280px] z-20 px-2 py-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap w-[90px] bg-[#e6ffe6] border border-gray-200">
                Date Range
              </th>
              {periods.map((period: string) => (
                <th key={period} className="px-2 py-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap w-[80px] bg-[#e6ffe6] border border-gray-200">
                  {period}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Business Unit Row */}
            <tr className="hover:bg-gray-50/50">
              <td className="sticky left-0 z-20 px-6 py-1 whitespace-nowrap border border-gray-200 bg-white">
                <div className="flex items-center">
                  <button 
                    onClick={() => toggleNodeExpansion('business-1')}
                    className="mr-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    {expandedNodes.has('business-1') ? '▼' : '►'}
                  </button>
                  <span className="text-sm font-medium text-gray-900">Logic Chips</span>
                </div>
              </td>
              <td className="sticky left-[200px] z-20 p-0 border border-gray-200 bg-white">
                {renderCell('business-1', 'default', true)}
              </td>
              <td className="sticky left-[280px] z-20 p-1 border border-gray-200 bg-white">
                {renderDateRangeButton('business-1')}
              </td>
              {periods.map((period: string) => (
                <td key={`business-1-${period}`} className="p-0 border border-gray-200 bg-white">
                  {renderCell('business-1', period)}
                </td>
              ))}
            </tr>

            {/* Product Category Row */}
            {expandedNodes.has('business-1') && (
              <tr className="hover:bg-gray-50/50">
                <td className="sticky left-0 z-20 px-6 py-1 whitespace-nowrap border border-gray-200 bg-white">
                  <div className="flex items-center pl-8">
                    <button 
                      onClick={() => toggleNodeExpansion('category-1')}
                      className="mr-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      {expandedNodes.has('category-1') ? '▼' : '►'}
                    </button>
                    <span className="text-sm font-medium text-gray-900">Microprocessors</span>
                  </div>
                </td>
                <td className="sticky left-[200px] z-20 p-0 border border-gray-200 bg-white">
                  {renderCell('category-1', 'default', true)}
                </td>
                <td className="sticky left-[280px] z-20 p-1 border border-gray-200 bg-white">
                  {renderDateRangeButton('category-1')}
                </td>
                {periods.map((period: string) => (
                  <td key={`category-1-${period}`} className="p-0 border border-gray-200 bg-white">
                    {renderCell('category-1', period)}
                  </td>
                ))}
              </tr>
            )}

            {/* Technology Node Row */}
            {expandedNodes.has('business-1') && expandedNodes.has('category-1') && (
              <tr className="hover:bg-gray-50/50">
                <td className="sticky left-0 z-20 px-6 py-1 whitespace-nowrap border border-gray-200 bg-white">
                  <div className="flex items-center pl-16">
                    <button 
                      onClick={() => toggleNodeExpansion('tech-1')}
                      className="mr-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      {expandedNodes.has('tech-1') ? '▼' : '►'}
                    </button>
                    <span className="text-sm font-medium text-gray-900">7nm</span>
                  </div>
                </td>
                <td className="sticky left-[200px] z-20 p-0 border border-gray-200 bg-white">
                  {renderCell('tech-1', 'default', true)}
                </td>
                <td className="sticky left-[280px] z-20 p-1 border border-gray-200 bg-white">
                  {renderDateRangeButton('tech-1')}
                </td>
                {periods.map((period: string) => (
                  <td key={`tech-1-${period}`} className="p-0 border border-gray-200 bg-white">
                    {renderCell('tech-1', period)}
                  </td>
                ))}
              </tr>
            )}

            {/* Product Line Row */}
            {expandedNodes.has('business-1') && expandedNodes.has('category-1') && expandedNodes.has('tech-1') && (
              <tr className="hover:bg-gray-50/50">
                <td className="sticky left-0 z-20 px-6 py-1 whitespace-nowrap border border-gray-200 bg-white">
                  <div className="flex items-center pl-24">
                    <button 
                      onClick={() => toggleNodeExpansion('line-1')}
                      className="mr-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      {expandedNodes.has('line-1') ? '▼' : '►'}
                    </button>
                    <span className="text-sm font-medium text-gray-900">Data Center</span>
                  </div>
                </td>
                <td className="sticky left-[200px] z-20 p-0 border border-gray-200 bg-white">
                  {renderCell('line-1', 'default', true)}
                </td>
                <td className="sticky left-[280px] z-20 p-1 border border-gray-200 bg-white">
                  {renderDateRangeButton('line-1')}
                </td>
                {periods.map((period: string) => (
                  <td key={`line-1-${period}`} className="p-0 border border-gray-200 bg-white">
                    {renderCell('line-1', period)}
                  </td>
                ))}
              </tr>
            )}

            {/* Product Rows */}
            {expandedNodes.has('business-1') && expandedNodes.has('category-1') && expandedNodes.has('tech-1') && expandedNodes.has('line-1') && (
              <>
                <tr className="hover:bg-gray-50/50">
                  <td className="sticky left-0 z-20 px-6 py-1 whitespace-nowrap border border-gray-200 bg-white">
                    <div className="flex items-center pl-32">
                      <span className="text-sm font-medium text-gray-900">PRD1</span>
                    </div>
                  </td>
                  <td className="sticky left-[200px] z-20 p-0 border border-gray-200 bg-white">
                    {renderCell('product-1', 'default', true)}
                  </td>
                  <td className="sticky left-[280px] z-20 p-1 border border-gray-200 bg-white">
                    {renderDateRangeButton('product-1')}
                  </td>
                  {periods.map((period: string) => (
                    <td key={`product-1-${period}`} className="p-0 border border-gray-200 bg-white">
                      {renderCell('product-1', period)}
                    </td>
                  ))}
                </tr>

                <tr className="hover:bg-gray-50/50">
                  <td className="sticky left-0 z-20 px-6 py-1 whitespace-nowrap border border-gray-200 bg-white">
                    <div className="flex items-center pl-32">
                      <span className="text-sm font-medium text-gray-900">PRD2006</span>
                    </div>
                  </td>
                  <td className="sticky left-[200px] z-20 p-0 border border-gray-200 bg-white">
                    {renderCell('product-2', 'default', true)}
                  </td>
                  <td className="sticky left-[280px] z-20 p-1 border border-gray-200 bg-white">
                    {renderDateRangeButton('product-2')}
                  </td>
                  {periods.map((period: string) => (
                    <td key={`product-2-${period}`} className="p-0 border border-gray-200 bg-white">
                      {renderCell('product-2', period)}
                    </td>
                  ))}
                </tr>

                <tr className="hover:bg-gray-50/50">
                  <td className="sticky left-0 z-20 px-6 py-1 whitespace-nowrap border border-gray-200 bg-white">
                    <div className="flex items-center pl-32">
                      <span className="text-sm font-medium text-gray-900">PRD2678</span>
                    </div>
                  </td>
                  <td className="sticky left-[200px] z-20 p-0 border border-gray-200 bg-white">
                    {renderCell('product-3', 'default', true)}
                  </td>
                  <td className="sticky left-[280px] z-20 p-1 border border-gray-200 bg-white">
                    {renderDateRangeButton('product-3')}
                  </td>
                  {periods.map((period: string) => (
                    <td key={`product-3-${period}`} className="p-0 border border-gray-200 bg-white">
                      {renderCell('product-3', period)}
                    </td>
                  ))}
                </tr>
              </>
            )}

            {/* Mobile Computing Product Line Row */}
            {expandedNodes.has('business-1') && expandedNodes.has('category-1') && expandedNodes.has('tech-1') && (
              <tr className="hover:bg-gray-50/50">
                <td className="sticky left-0 z-20 px-6 py-1 whitespace-nowrap border border-gray-200 bg-white">
                  <div className="flex items-center pl-24">
                    <button 
                      onClick={() => toggleNodeExpansion('line-2')}
                      className="mr-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      {expandedNodes.has('line-2') ? '▼' : '►'}
                    </button>
                    <span className="text-sm font-medium text-gray-900">Mobile Computing</span>
                  </div>
                </td>
                <td className="sticky left-[200px] z-20 p-0 border border-gray-200 bg-white">
                  {renderCell('line-2', 'default', true)}
                </td>
                <td className="sticky left-[280px] z-20 p-1 border border-gray-200 bg-white">
                  {renderDateRangeButton('line-2')}
                </td>
                {periods.map((period: string) => (
                  <td key={`line-2-${period}`} className="p-0 border border-gray-200 bg-white">
                    {renderCell('line-2', period)}
                  </td>
                ))}
              </tr>
            )}

            {/* Mobile Computing Products */}
            {expandedNodes.has('business-1') && expandedNodes.has('category-1') && expandedNodes.has('tech-1') && expandedNodes.has('line-2') && (
              <>
                <tr className="hover:bg-gray-50/50">
                  <td className="sticky left-0 z-20 px-6 py-1 whitespace-nowrap border border-gray-200 bg-white">
                    <div className="flex items-center pl-32">
                      <span className="text-sm font-medium text-gray-900">MCU2023</span>
                    </div>
                  </td>
                  <td className="sticky left-[200px] z-20 p-0 border border-gray-200 bg-white">
                    {renderCell('product-4', 'default', true)}
                  </td>
                  <td className="sticky left-[280px] z-20 p-1 border border-gray-200 bg-white">
                    {renderDateRangeButton('product-4')}
                  </td>
                  {periods.map((period: string) => (
                    <td key={`product-4-${period}`} className="p-0 border border-gray-200 bg-white">
                      {renderCell('product-4', period)}
                    </td>
                  ))}
                </tr>

                <tr className="hover:bg-gray-50/50">
                  <td className="sticky left-0 z-20 px-6 py-1 whitespace-nowrap border border-gray-200 bg-white">
                    <div className="flex items-center pl-32">
                      <span className="text-sm font-medium text-gray-900">MCU2024</span>
                    </div>
                  </td>
                  <td className="sticky left-[200px] z-20 p-0 border border-gray-200 bg-white">
                    {renderCell('product-5', 'default', true)}
                  </td>
                  <td className="sticky left-[280px] z-20 p-1 border border-gray-200 bg-white">
                    {renderDateRangeButton('product-5')}
                  </td>
                  {periods.map((period: string) => (
                    <td key={`product-5-${period}`} className="p-0 border border-gray-200 bg-white">
                      {renderCell('product-5', period)}
                    </td>
                  ))}
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-indigo-900 mb-2">Yield Management</h1>
          <p className="text-gray-700 max-w-3xl">
            Manage and track yield percentages across different time periods
          </p>
        </div>

        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-gray-700">Time Bucket:</label>
                <select
                  value={selectedBucket}
                  onChange={(e) => setSelectedBucket(e.target.value as TimeBucket)}
                  className="h-10 pl-4 pr-8 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 cursor-pointer hover:border-gray-400"
                >
                  <option value="MONTHLY">Monthly</option>
                  <option value="QUARTERLY">Quarterly</option>
                  <option value="WEEKLY">Weekly</option>
                  <option value="YEARLY">Yearly</option>
                </select>
              </div>
              <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-md p-1">
                <button
                  onClick={() => setCurrentYear(prev => prev - 1)}
                  className="p-2 rounded hover:bg-gray-50 text-gray-600 transition-all duration-200"
                >
                  <ChevronLeftIcon className="h-5 w-5" />
                </button>
                <span className="text-sm font-semibold text-gray-900 px-2">{currentYear}</span>
                <button
                  onClick={() => setCurrentYear(prev => prev + 1)}
                  className="p-2 rounded hover:bg-gray-50 text-gray-600 transition-all duration-200"
                >
                  <ChevronRightIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-[#f5fbf5]">
            <h3 className="font-medium text-gray-700">Yield Data</h3>
          </div>

          {/* Toast Notification */}
          {toast.visible && (
            <div className="fixed top-4 right-4 bg-white border border-green-300 text-green-700 px-4 py-3 rounded-md shadow-lg transition-all duration-500 transform translate-y-0 opacity-100">
              <div className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 mr-2" />
                <p>{toast.message}</p>
              </div>
            </div>
          )}

          {/* Yield Table */}
          <div className="overflow-x-auto" style={{ scrollbarWidth: 'thin' }}>
            {renderYieldTable()}
          </div>

          <div className="p-4 border-t border-gray-200 bg-[#f5fbf5]">
            <div className="flex justify-end items-center gap-4">
              {toast.visible && (
                <div className="flex items-center text-sm text-green-600 font-medium">
                  <CheckCircleIcon className="h-5 w-5 mr-2" />
                  <span>Changes saved successfully</span>
                </div>
              )}
              <button
                onClick={saveChanges}
                disabled={isSaving}
                className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 transition-all duration-200"
              >
                {isSaving ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Saving...
                  </span>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 