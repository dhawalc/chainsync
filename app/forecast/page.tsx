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

export default function ForecastPage() {
  const [activeTab, setActiveTab] = useState('statistical');
  
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
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-medium text-gray-800">Statistical Forecast</CardTitle>
              <CardDescription>
                Automatically generated forecasts based on historical data and statistical models
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center border border-dashed border-gray-300 rounded-md">
                <p className="text-gray-500">Forecast chart will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="collaborative" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-medium text-gray-800">Collaborative Forecast</CardTitle>
              <CardDescription>
                Combine statistical forecasts with manual adjustments from sales, marketing, and other teams
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center border border-dashed border-gray-300 rounded-md">
                <p className="text-gray-500">Collaborative forecast interface will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 