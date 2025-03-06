'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { 
  ChartBarIcon, 
  TableCellsIcon,
  ArrowPathIcon,
  DocumentChartBarIcon,
  PresentationChartLineIcon
} from '@heroicons/react/24/outline';

export default function AnalysisPage() {
  return (
    <div className="container mx-auto py-8 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Analysis Tools</h1>
        <p className="mt-2 text-xl text-gray-700 max-w-3xl mx-auto">
          Powerful tools to analyze and understand your supply chain data
        </p>
        <div className="mt-4 w-24 h-1 bg-indigo-600 mx-auto rounded-full"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Link href="/analysis/explainability" className="block transform transition-all duration-300 hover:scale-105">
          <Card className="h-full border-2 border-gray-200 hover:border-indigo-400 shadow-md hover:shadow-xl rounded-xl overflow-hidden">
            <div className="h-3 bg-indigo-600"></div>
            <CardHeader className="pb-3 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold text-gray-900">Explainability Grid</CardTitle>
                <div className="p-2 bg-indigo-100 rounded-full">
                  <TableCellsIcon className="h-7 w-7 text-indigo-700" />
                </div>
              </div>
              <CardDescription className="text-gray-700 font-medium mt-2">
                Analyze supply commitments across different BOM levels
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4 pb-6">
              <p className="text-base text-gray-800 mb-6">
                Understand how demand is fulfilled through different levels of your supply chain, 
                with detailed visibility into inventory, supply, and commitments.
              </p>
              <div className="mt-auto flex justify-end">
                <span className="inline-flex items-center text-sm font-bold text-indigo-700 hover:text-indigo-900 bg-indigo-50 px-4 py-2 rounded-full">
                  Open Grid <span className="ml-1">→</span>
                </span>
              </div>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/analysis/performance" className="block transform transition-all duration-300 hover:scale-105">
          <Card className="h-full border-2 border-gray-200 hover:border-indigo-400 shadow-md hover:shadow-xl rounded-xl overflow-hidden">
            <div className="h-3 bg-indigo-600"></div>
            <CardHeader className="pb-3 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold text-gray-900">Performance Dashboard</CardTitle>
                <div className="p-2 bg-indigo-100 rounded-full">
                  <ChartBarIcon className="h-7 w-7 text-indigo-700" />
                </div>
              </div>
              <CardDescription className="text-gray-700 font-medium mt-2">
                Monitor key performance indicators
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4 pb-6">
              <p className="text-base text-gray-800 mb-6">
                Track and analyze key metrics such as on-time delivery, inventory turns, 
                and forecast accuracy to identify areas for improvement.
              </p>
              <div className="mt-auto flex justify-end">
                <span className="inline-flex items-center text-sm font-bold text-indigo-700 hover:text-indigo-900 bg-indigo-50 px-4 py-2 rounded-full">
                  View Dashboard <span className="ml-1">→</span>
                </span>
              </div>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/analysis/what-if" className="block transform transition-all duration-300 hover:scale-105">
          <Card className="h-full border-2 border-gray-200 hover:border-indigo-400 shadow-md hover:shadow-xl rounded-xl overflow-hidden">
            <div className="h-3 bg-indigo-600"></div>
            <CardHeader className="pb-3 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold text-gray-900">What-If Analysis</CardTitle>
                <div className="p-2 bg-indigo-100 rounded-full">
                  <ArrowPathIcon className="h-7 w-7 text-indigo-700" />
                </div>
              </div>
              <CardDescription className="text-gray-700 font-medium mt-2">
                Simulate different scenarios
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4 pb-6">
              <p className="text-base text-gray-800 mb-6">
                Test different supply chain scenarios to understand potential impacts 
                and make more informed decisions.
              </p>
              <div className="mt-auto flex justify-end">
                <span className="inline-flex items-center text-sm font-bold text-indigo-700 hover:text-indigo-900 bg-indigo-50 px-4 py-2 rounded-full">
                  Run Simulation <span className="ml-1">→</span>
                </span>
              </div>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="#" className="block transform transition-all duration-300 hover:scale-105">
          <Card className="h-full border-2 border-gray-200 hover:border-indigo-400 shadow-md hover:shadow-xl rounded-xl overflow-hidden">
            <div className="h-3 bg-indigo-600"></div>
            <CardHeader className="pb-3 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold text-gray-900">Exception Reports</CardTitle>
                <div className="p-2 bg-indigo-100 rounded-full">
                  <DocumentChartBarIcon className="h-7 w-7 text-indigo-700" />
                </div>
              </div>
              <CardDescription className="text-gray-700 font-medium mt-2">
                Identify and resolve issues
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4 pb-6">
              <p className="text-base text-gray-800 mb-6">
                Quickly identify and address exceptions such as late orders, stockouts, 
                excess inventory, and other supply chain disruptions.
              </p>
              <div className="mt-auto flex justify-end">
                <span className="inline-flex items-center text-sm font-bold text-indigo-700 hover:text-indigo-900 bg-indigo-50 px-4 py-2 rounded-full">
                  View Reports <span className="ml-1">→</span>
                </span>
              </div>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="#" className="block transform transition-all duration-300 hover:scale-105">
          <Card className="h-full border-2 border-gray-200 hover:border-indigo-400 shadow-md hover:shadow-xl rounded-xl overflow-hidden">
            <div className="h-3 bg-indigo-600"></div>
            <CardHeader className="pb-3 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold text-gray-900">Trend Analysis</CardTitle>
                <div className="p-2 bg-indigo-100 rounded-full">
                  <PresentationChartLineIcon className="h-7 w-7 text-indigo-700" />
                </div>
              </div>
              <CardDescription className="text-gray-700 font-medium mt-2">
                Analyze historical patterns
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4 pb-6">
              <p className="text-base text-gray-800 mb-6">
                Identify trends and patterns in your supply chain data to improve 
                forecasting accuracy and optimize inventory levels.
              </p>
              <div className="mt-auto flex justify-end">
                <span className="inline-flex items-center text-sm font-bold text-indigo-700 hover:text-indigo-900 bg-indigo-50 px-4 py-2 rounded-full">
                  Explore Trends <span className="ml-1">→</span>
                </span>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
} 