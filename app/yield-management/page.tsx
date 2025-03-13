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
                  }
                ]
              }
            ]
          }
        ]
      }
    ];
    
    setHierarchyData(mockHierarchyData);
    
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
      // Default yield for 7nm
      { productId: 'tech-1', month: 'default', year: currentYear.toString(), yield: 98 },
      
      // Scattered data points around weeks 13-20
      { productId: 'tech-1', month: 'Week 13', year: currentYear.toString(), yield: 97 },
      { productId: 'tech-1', month: 'Week 16', year: currentYear.toString(), yield: 98 },
      { productId: 'tech-1', month: 'Week 19', year: currentYear.toString(), yield: 96 },
      
      { productId: 'product-1', month: 'Week 14', year: currentYear.toString(), yield: 92 },
      { productId: 'product-1', month: 'Week 17', year: currentYear.toString(), yield: 95 },
      { productId: 'product-1', month: 'Week 20', year: currentYear.toString(), yield: 93 },
      
      { productId: 'product-2', month: 'Week 13', year: currentYear.toString(), yield: 88 },
      { productId: 'product-2', month: 'Week 15', year: currentYear.toString(), yield: 91 },
      { productId: 'product-2', month: 'Week 18', year: currentYear.toString(), yield: 89 }
    ];

    // Different data for different time buckets
    if (selectedBucket === 'QUARTERLY') {
      mockData = [
        { productId: 'tech-1', month: 'default', year: currentYear.toString(), yield: 98 },
        { productId: 'tech-1', month: 'Q1', year: currentYear.toString(), yield: 97 },
        { productId: 'tech-1', month: 'Q2', year: currentYear.toString(), yield: 98 }
      ];
    } else if (selectedBucket === 'MONTHLY') {
      mockData = [
        { productId: 'tech-1', month: 'default', year: currentYear.toString(), yield: 98 },
        { productId: 'tech-1', month: 'Mar', year: currentYear.toString(), yield: 97 },
        { productId: 'tech-1', month: 'Apr', year: currentYear.toString(), yield: 98 }
      ];
    } else if (selectedBucket === 'YEARLY') {
      mockData = [
        { productId: 'tech-1', month: 'default', year: currentYear.toString(), yield: 98 },
        { productId: 'tech-1', month: '2024', year: '2024', yield: 97 },
        { productId: 'tech-1', month: '2025', year: '2025', yield: 98 }
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

  // Render yield table
  const renderYieldTable = () => {
    const periods = getTimePeriods();
    
    const renderCell = (nodeId: string, period: string, isDefaultYield: boolean = false) => {
      const yieldData = getYieldValue(nodeId, period);
      const isEdited = yieldData?.isEdited;
      const value = yieldData?.yield;

      return (
        <div className="relative">
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={2}
            value={value === null || value === undefined ? '' : value}
            onChange={(e) => handleYieldChange(nodeId, period, e.target.value)}
            placeholder="-"
            className={`w-full h-10 text-center text-sm transition-all duration-200 border ${
              isEdited 
                ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300' 
                : value === null || value === undefined
                  ? 'border-gray-200 bg-gray-50 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'
                  : 'border-gray-200 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
        </div>
      );
    };

    const renderDateRangeButton = (nodeId: string) => (
      <button
        onClick={() => {
          setShowDateRangePicker(true);
          setSelectedNodeForDateRange(nodeId);
        }}
        className="w-full h-8 flex items-center justify-center gap-1.5 text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-md transition-all duration-200 text-xs font-medium shadow-sm hover:shadow dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800 dark:hover:bg-blue-900/30"
      >
        <CalendarIcon className="h-3.5 w-3.5" />
        <span>Date Range</span>
      </button>
    );

    return (
      <div className="relative">
        <div className="flex">
          {/* Fixed columns */}
          <div className="sticky left-0 z-20 bg-white">
            <table className="divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap w-[200px]">
                    Hierarchy
                  </th>
                  <th className="px-2 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap w-[80px]">
                    Default %
                  </th>
                  <th className="px-2 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap w-[90px]">
                    Date Range
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Business Unit Row */}
                <tr className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-3 whitespace-nowrap">
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
                  <td className="px-4 py-2">
                    {renderCell('business-1', 'default', true)}
                  </td>
                  <td className="px-4 py-2">
                    {renderDateRangeButton('business-1')}
                  </td>
                </tr>

                {/* Product Category Row */}
                {expandedNodes.has('business-1') && (
                  <tr className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-3 whitespace-nowrap">
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
                    <td className="px-4 py-2">
                      {renderCell('category-1', 'default', true)}
                    </td>
                    <td className="px-4 py-2">
                      {renderDateRangeButton('category-1')}
                    </td>
                  </tr>
                )}

                {/* Technology Node Row */}
                {expandedNodes.has('business-1') && expandedNodes.has('category-1') && (
                  <tr className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-3 whitespace-nowrap">
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
                    <td className="px-4 py-2">
                      {renderCell('tech-1', 'default', true)}
                    </td>
                    <td className="px-4 py-2">
                      {renderDateRangeButton('tech-1')}
                    </td>
                  </tr>
                )}

                {/* Product Line Row */}
                {expandedNodes.has('business-1') && expandedNodes.has('category-1') && expandedNodes.has('tech-1') && (
                  <tr className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-3 whitespace-nowrap">
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
                    <td className="px-4 py-2">
                      {renderCell('line-1', 'default', true)}
                    </td>
                    <td className="px-4 py-2">
                      {renderDateRangeButton('line-1')}
                    </td>
                  </tr>
                )}

                {/* Product Rows */}
                {expandedNodes.has('business-1') && expandedNodes.has('category-1') && expandedNodes.has('tech-1') && expandedNodes.has('line-1') && (
                  <>
                    <tr className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-3 whitespace-nowrap">
                        <div className="flex items-center pl-32">
                          <span className="text-sm font-medium text-gray-900">PRD1</span>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        {renderCell('product-1', 'default', true)}
                      </td>
                      <td className="px-4 py-2">
                        {renderDateRangeButton('product-1')}
                      </td>
                    </tr>

                    <tr className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-3 whitespace-nowrap">
                        <div className="flex items-center pl-32">
                          <span className="text-sm font-medium text-gray-900">PRD2006</span>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        {renderCell('product-2', 'default', true)}
                      </td>
                      <td className="px-4 py-2">
                        {renderDateRangeButton('product-2')}
                      </td>
                    </tr>

                    <tr className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-3 whitespace-nowrap">
                        <div className="flex items-center pl-32">
                          <span className="text-sm font-medium text-gray-900">PRD2678</span>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        {renderCell('product-3', 'default', true)}
                      </td>
                      <td className="px-4 py-2">
                        {renderDateRangeButton('product-3')}
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>

          {/* Scrollable time periods */}
          <div className="overflow-x-auto" style={{ scrollbarWidth: 'thin' }}>
            <table className="divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {periods.map(period => (
                    <th key={period} className="px-2 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap w-[80px]">
                      {period}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Business Unit Row */}
                <tr className="hover:bg-gray-50 transition-colors duration-200">
                  {periods.map(period => (
                    <td key={`business-1-${period}`} className="px-4 py-2">
                      {renderCell('business-1', period)}
                    </td>
                  ))}
                </tr>

                {/* Product Category Row */}
                {expandedNodes.has('business-1') && (
                  <tr className="hover:bg-gray-50 transition-colors duration-200">
                    {periods.map(period => (
                      <td key={`category-1-${period}`} className="px-4 py-2">
                        {renderCell('category-1', period)}
                      </td>
                    ))}
                  </tr>
                )}

                {/* Technology Node Row */}
                {expandedNodes.has('business-1') && expandedNodes.has('category-1') && (
                  <tr className="hover:bg-gray-50 transition-colors duration-200">
                    {periods.map(period => (
                      <td key={`tech-1-${period}`} className="px-4 py-2">
                        {renderCell('tech-1', period)}
                      </td>
                    ))}
                  </tr>
                )}

                {/* Product Line Row */}
                {expandedNodes.has('business-1') && expandedNodes.has('category-1') && expandedNodes.has('tech-1') && (
                  <tr className="hover:bg-gray-50 transition-colors duration-200">
                    {periods.map(period => (
                      <td key={`line-1-${period}`} className="px-4 py-2">
                        {renderCell('line-1', period)}
                      </td>
                    ))}
                  </tr>
                )}

                {/* Product Rows */}
                {expandedNodes.has('business-1') && expandedNodes.has('category-1') && expandedNodes.has('tech-1') && expandedNodes.has('line-1') && (
                  <>
                    <tr className="hover:bg-gray-50 transition-colors duration-200">
                      {periods.map(period => (
                        <td key={`product-1-${period}`} className="px-4 py-2">
                          {renderCell('product-1', period)}
                        </td>
                      ))}
                    </tr>

                    <tr className="hover:bg-gray-50 transition-colors duration-200">
                      {periods.map(period => (
                        <td key={`product-2-${period}`} className="px-4 py-2">
                          {renderCell('product-2', period)}
                        </td>
                      ))}
                    </tr>

                    <tr className="hover:bg-gray-50 transition-colors duration-200">
                      {periods.map(period => (
                        <td key={`product-3-${period}`} className="px-4 py-2">
                          {renderCell('product-3', period)}
                        </td>
                      ))}
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Date Range Picker Modal */}
        {showDateRangePicker && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full shadow-xl">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Set Date Range Value</h3>
              <form onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const fromDate = new Date(form.fromDate.value);
                const toDate = new Date(form.toDate.value);
                const value = parseInt(form.value.value);
                handleDateRangeSubmit(fromDate, toDate, value);
              }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">From Date</label>
                    <input
                      type="date"
                      name="fromDate"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">To Date</label>
                    <input
                      type="date"
                      name="toDate"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Value (%)</label>
                    <input
                      type="number"
                      name="value"
                      min="0"
                      max="99"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                    />
                  </div>
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowDateRangePicker(false);
                        setSelectedNodeForDateRange(null);
                      }}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 border border-transparent rounded-md"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Header Section with Gradient */}
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Yield Management
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Manage and track yield percentages across different time periods
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Time Bucket:</label>
                  <select
                    value={selectedBucket}
                    onChange={(e) => setSelectedBucket(e.target.value as TimeBucket)}
                    className="h-10 pl-4 pr-8 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-pointer hover:border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                  >
                    <option value="MONTHLY">Monthly</option>
                    <option value="QUARTERLY">Quarterly</option>
                    <option value="WEEKLY">Weekly</option>
                    <option value="YEARLY">Yearly</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded-lg p-1">
                  <button
                    onClick={() => setCurrentYear(prev => prev - 1)}
                    className="p-2 rounded-md hover:bg-white hover:shadow-sm text-gray-600 dark:text-gray-300 transition-all duration-200"
                  >
                    <ChevronLeftIcon className="h-5 w-5" />
                  </button>
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 px-2">{currentYear}</span>
                  <button
                    onClick={() => setCurrentYear(prev => prev + 1)}
                    className="p-2 rounded-md hover:bg-white hover:shadow-sm text-gray-600 dark:text-gray-300 transition-all duration-200"
                  >
                    <ChevronRightIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Toast Notification */}
          {toast.visible && (
            <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md shadow-lg transition-all duration-500 transform translate-y-0 opacity-100 dark:bg-green-900 dark:border-green-800 dark:text-green-100">
              <div className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 mr-2" />
                <p>{toast.message}</p>
              </div>
            </div>
          )}

          {/* Yield Table */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            {renderYieldTable()}
          </div>

          <div className="p-6 border-t border-gray-100 dark:border-gray-700">
            <div className="flex justify-end items-center gap-4">
              {toast.visible && (
                <div className="flex items-center text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                  <CheckCircleIcon className="h-5 w-5 mr-2" />
                  <span>Changes saved successfully</span>
                </div>
              )}
              <button
                onClick={saveChanges}
                disabled={isSaving}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-all duration-200 shadow-sm"
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