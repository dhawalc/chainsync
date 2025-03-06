'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FilterOptions } from './types';
import { ArrowPathIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

interface FilterPanelProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onApplyFilters: () => void;
}

export default function FilterPanel({ filters, onFilterChange, onApplyFilters }: FilterPanelProps) {
  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  const handleDateRangeChange = (field: 'start' | 'end', value: string) => {
    onFilterChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [field]: value
      }
    });
  };

  return (
    <Card className="rounded-xl overflow-hidden shadow-md border-2 border-gray-200">
      <div className="bg-indigo-700 px-6 py-4">
        <h2 className="text-white font-bold text-lg flex items-center">
          <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
          Filter Options
        </h2>
      </div>
      <CardContent className="p-6 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-5">
          <div>
            <Label htmlFor="scenario" className="text-sm font-bold text-gray-800 mb-2 block">
              Scenario
            </Label>
            <Select 
              value={filters.scenario} 
              onValueChange={(value) => handleFilterChange('scenario', value)}
            >
              <SelectTrigger id="scenario" className="w-full bg-white text-gray-900 border-2 border-gray-300 focus:border-indigo-500 rounded-md">
                <SelectValue placeholder="Select scenario" />
              </SelectTrigger>
              <SelectContent className="bg-white text-gray-900 rounded-md border-2 border-gray-200">
                <SelectItem value="base">Base Plan</SelectItem>
                <SelectItem value="optimistic">Optimistic</SelectItem>
                <SelectItem value="pessimistic">Pessimistic</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="productHierarchy" className="text-sm font-bold text-gray-800 mb-2 block">
              Product Hierarchy
            </Label>
            <Select 
              value={filters.productHierarchy} 
              onValueChange={(value) => handleFilterChange('productHierarchy', value)}
            >
              <SelectTrigger id="productHierarchy" className="w-full bg-white text-gray-900 border-2 border-gray-300 focus:border-indigo-500 rounded-md">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent className="bg-white text-gray-900 rounded-md border-2 border-gray-200">
                <SelectItem value="all">All Products</SelectItem>
                <SelectItem value="category">Category</SelectItem>
                <SelectItem value="family">Family</SelectItem>
                <SelectItem value="sku">SKU</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="locationLevel" className="text-sm font-bold text-gray-800 mb-2 block">
              Location Level
            </Label>
            <Select 
              value={filters.locationLevel} 
              onValueChange={(value) => handleFilterChange('locationLevel', value)}
            >
              <SelectTrigger id="locationLevel" className="w-full bg-white text-gray-900 border-2 border-gray-300 focus:border-indigo-500 rounded-md">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent className="bg-white text-gray-900 rounded-md border-2 border-gray-200">
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="region">Region</SelectItem>
                <SelectItem value="country">Country</SelectItem>
                <SelectItem value="site">Site</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="customer" className="text-sm font-bold text-gray-800 mb-2 block">
              Customer
            </Label>
            <Select 
              value={filters.customer} 
              onValueChange={(value) => handleFilterChange('customer', value)}
            >
              <SelectTrigger id="customer" className="w-full bg-white text-gray-900 border-2 border-gray-300 focus:border-indigo-500 rounded-md">
                <SelectValue placeholder="Select customer" />
              </SelectTrigger>
              <SelectContent className="bg-white text-gray-900 rounded-md border-2 border-gray-200">
                <SelectItem value="all">All Customers</SelectItem>
                <SelectItem value="CUST001">Acme Corporation</SelectItem>
                <SelectItem value="CUST002">TechSolutions Inc.</SelectItem>
                <SelectItem value="CUST003">Global Industries</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label className="text-sm font-bold text-gray-800 mb-2 block">
              Date Range
            </Label>
            <div className="grid grid-cols-2 gap-2">
              <Input 
                type="date" 
                value={filters.dateRange.start}
                onChange={(e) => handleDateRangeChange('start', e.target.value)}
                className="text-xs bg-white text-gray-900 border-2 border-gray-300 focus:border-indigo-500 rounded-md"
              />
              <Input 
                type="date" 
                value={filters.dateRange.end}
                onChange={(e) => handleDateRangeChange('end', e.target.value)}
                className="text-xs bg-white text-gray-900 border-2 border-gray-300 focus:border-indigo-500 rounded-md"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="planner" className="text-sm font-bold text-gray-800 mb-2 block">
              Planner
            </Label>
            <Select 
              value={filters.planner} 
              onValueChange={(value) => handleFilterChange('planner', value)}
            >
              <SelectTrigger id="planner" className="w-full bg-white text-gray-900 border-2 border-gray-300 focus:border-indigo-500 rounded-md">
                <SelectValue placeholder="Select planner" />
              </SelectTrigger>
              <SelectContent className="bg-white text-gray-900 rounded-md border-2 border-gray-200">
                <SelectItem value="all">All Planners</SelectItem>
                <SelectItem value="john">John Smith</SelectItem>
                <SelectItem value="sarah">Sarah Johnson</SelectItem>
                <SelectItem value="mike">Mike Williams</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <Button 
            onClick={onApplyFilters}
            className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold px-6 py-2 text-base rounded-full transition-all duration-200 transform hover:scale-105 flex items-center"
          >
            <ArrowPathIcon className="h-5 w-5 mr-2" />
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 