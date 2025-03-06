'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  ArrowPathIcon, 
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

interface ApiConnection {
  id: string;
  name: string;
  system: string;
  table: string;
  status: 'active' | 'inactive' | 'error';
  lastSync: string;
}

const sampleConnections: ApiConnection[] = [
  { id: '1', name: 'Material Master', system: 'ECC', table: 'MARA', status: 'active', lastSync: '2023-10-15 08:30:22' },
  { id: '2', name: 'Customer Master', system: 'ECC', table: 'KNA1', status: 'active', lastSync: '2023-10-15 08:32:15' },
  { id: '3', name: 'Vendor Master', system: 'ECC', table: 'LFA1', status: 'active', lastSync: '2023-10-15 08:33:40' },
  { id: '4', name: 'BOM Header', system: 'ECC', table: 'MAST', status: 'active', lastSync: '2023-10-15 08:35:12' },
  { id: '5', name: 'BOM Items', system: 'ECC', table: 'STPO', status: 'active', lastSync: '2023-10-15 08:35:12' },
  { id: '6', name: 'Routing Header', system: 'ECC', table: 'PLKO', status: 'inactive', lastSync: '2023-10-14 14:22:05' },
  { id: '7', name: 'Routing Operations', system: 'ECC', table: 'PLPO', status: 'error', lastSync: '2023-10-14 14:22:05' },
];

export default function ApiConfigurationPanel() {
  const [activeTab, setActiveTab] = useState('connections');
  const [connections, setConnections] = useState<ApiConnection[]>(sampleConnections);
  
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'active':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'inactive':
        return <InformationCircleIcon className="h-5 w-5 text-amber-500" />;
      case 'error':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };
  
  return (
    <Card className="border-gray-200">
      <CardHeader className="bg-gray-50 border-b border-gray-200">
        <CardTitle className="text-xl font-semibold text-gray-800">API Configuration</CardTitle>
        <CardDescription>
          Configure direct connections to standard SAP tables via APIs
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start rounded-none border-b border-gray-200 bg-gray-50 p-0">
            <TabsTrigger 
              value="connections" 
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-indigo-600 data-[state=active]:bg-white data-[state=active]:text-indigo-700"
            >
              Connections
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-indigo-600 data-[state=active]:bg-white data-[state=active]:text-indigo-700"
            >
              Settings
            </TabsTrigger>
            <TabsTrigger 
              value="logs" 
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-indigo-600 data-[state=active]:bg-white data-[state=active]:text-indigo-700"
            >
              Sync Logs
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="connections" className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search connections..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full md:w-64"
                />
              </div>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                Add Connection
              </Button>
            </div>
            
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      System
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Table
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Sync
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {connections.map((connection) => (
                    <tr key={connection.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {connection.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {connection.system}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {connection.table}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(connection.status)}
                          <span className="ml-2 text-sm text-gray-700">
                            {connection.status.charAt(0).toUpperCase() + connection.status.slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {connection.lastSync}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="outline" size="sm" className="text-indigo-700 border-indigo-300 hover:bg-indigo-50 mr-2">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-indigo-700 border-indigo-300 hover:bg-indigo-50">
                          <ArrowPathIcon className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">Connection Settings</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="api-url" className="block text-sm font-medium text-gray-700 mb-1">
                      SAP API Gateway URL
                    </Label>
                    <Input
                      id="api-url"
                      type="text"
                      value="https://api-gateway.example.com/sap/opu/odata/sap"
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="auth-method" className="block text-sm font-medium text-gray-700 mb-1">
                      Authentication Method
                    </Label>
                    <select
                      id="auth-method"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option>Basic Authentication</option>
                      <option>OAuth 2.0</option>
                      <option>API Key</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                      Username
                    </Label>
                    <Input
                      id="username"
                      type="text"
                      value="sap_api_user"
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value="••••••••••••"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">Sync Settings</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="sync-interval" className="block text-sm font-medium text-gray-700 mb-1">
                      Sync Interval (minutes)
                    </Label>
                    <Input
                      id="sync-interval"
                      type="number"
                      value="60"
                      min="5"
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="batch-size" className="block text-sm font-medium text-gray-700 mb-1">
                      Batch Size
                    </Label>
                    <Input
                      id="batch-size"
                      type="number"
                      value="1000"
                      min="100"
                      className="w-full"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-sync" className="text-sm font-medium text-gray-700">
                      Auto Sync
                    </Label>
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input 
                        type="checkbox" 
                        id="auto-sync" 
                        name="auto-sync" 
                        className="sr-only"
                        defaultChecked 
                      />
                      <label 
                        htmlFor="auto-sync"
                        className="block overflow-hidden h-6 rounded-full bg-gray-200 cursor-pointer"
                      >
                        <span 
                          className={`block h-6 w-6 rounded-full bg-white border-2 border-gray-200 transform transition-transform duration-200 ease-in translate-x-4`}
                        ></span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="error-retry" className="text-sm font-medium text-gray-700">
                      Auto Retry on Error
                    </Label>
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input 
                        type="checkbox" 
                        id="error-retry" 
                        name="error-retry" 
                        className="sr-only"
                        defaultChecked 
                      />
                      <label 
                        htmlFor="error-retry"
                        className="block overflow-hidden h-6 rounded-full bg-gray-200 cursor-pointer"
                      >
                        <span 
                          className={`block h-6 w-6 rounded-full bg-white border-2 border-gray-200 transform transition-transform duration-200 ease-in translate-x-4`}
                        ></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button variant="outline" className="mr-2">
                Cancel
              </Button>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                Save Settings
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="logs" className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-800">Sync Logs</h3>
              <Button variant="outline" className="text-indigo-700 border-indigo-300 hover:bg-indigo-50">
                <ArrowPathIcon className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
            
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Timestamp
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Connection
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Records
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-10-15 08:35:12</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">BOM Items (STPO)</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Success
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1,245</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">32s</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-10-15 08:35:12</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">BOM Header (MAST)</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Success
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">328</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">18s</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-10-14 14:22:05</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Routing Operations (PLPO)</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Failed
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">0</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">45s</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-6">
              <h4 className="text-md font-medium text-gray-800 mb-2">Error Details</h4>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <p className="text-sm text-gray-700 font-mono">
                  Error connecting to SAP table PLPO: Connection timeout after 30 seconds. Check network connectivity or SAP system availability.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
} 