'use client';

import { useState } from 'react';
import ApiConfigurationPanel from '../components/ApiConfigurationPanel';
import StandardObjectMapping from '../components/StandardObjectMapping';
import DataElementOwnership from '../components/DataElementOwnership';
import MiddleLayerConfig from '../components/MiddleLayerConfig';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowPathIcon,
  ServerIcon,
  UserGroupIcon,
  ArrowsRightLeftIcon
} from '@heroicons/react/24/outline';

export default function IntegrationPage() {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Integration Configuration</h1>
          <p className="mt-2 text-gray-600">Configure and manage data integration between systems based on project assumptions</p>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full max-w-3xl mb-8">
          <TabsTrigger value="overview" className="flex-1 data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700">
            Overview
          </TabsTrigger>
          <TabsTrigger value="api" className="flex-1 data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700">
            <ServerIcon className="h-4 w-4 mr-2" />
            API Configuration
          </TabsTrigger>
          <TabsTrigger value="mapping" className="flex-1 data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700">
            <ArrowsRightLeftIcon className="h-4 w-4 mr-2" />
            Object Mapping
          </TabsTrigger>
          <TabsTrigger value="ownership" className="flex-1 data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700">
            <UserGroupIcon className="h-4 w-4 mr-2" />
            Ownership
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Project Assumptions</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-green-600 text-sm font-bold">1</span>
                  </div>
                  <div>
                    <p className="text-gray-700">From ECC to PDMT we are pulling all Fields through API from Standard Tables only (no Z table Stagging in ECC)</p>
                    <p className="text-sm text-gray-500 mt-1">Direct API connections to standard SAP tables are configured</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-green-600 text-sm font-bold">2</span>
                  </div>
                  <div>
                    <p className="text-gray-700">From PDMT we are able to create all Standard Objects directly (no Z Table Stagging in APO)</p>
                    <p className="text-sm text-gray-500 mt-1">Direct mapping to standard APO objects without intermediate staging</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-green-600 text-sm font-bold">3</span>
                  </div>
                  <div>
                    <p className="text-gray-700">One Functional owner will own the development of one Data Elements</p>
                    <p className="text-sm text-gray-500 mt-1">Clear ownership and responsibility for each data element</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-green-600 text-sm font-bold">4</span>
                  </div>
                  <div>
                    <p className="text-gray-700">Middle Layer is only used for Mapping, no data massaging will happen in Middle Layer</p>
                    <p className="text-sm text-gray-500 mt-1">Simple field mappings without complex transformations</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Integration Status</h2>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-gray-700">API Connections</h3>
                    <span className="text-sm text-green-600 font-medium">5/7 Active</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '71%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-gray-700">Object Mappings</h3>
                    <span className="text-sm text-green-600 font-medium">4/5 Active</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-gray-700">Data Element Ownership</h3>
                    <span className="text-sm text-green-600 font-medium">7/7 Assigned</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-gray-700">Field Mappings</h3>
                    <span className="text-sm text-green-600 font-medium">5/5 Compliant</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <ServerIcon className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-800">API connection for Material Master updated</p>
                      <p className="text-xs text-gray-500">Today, 10:23 AM</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                      <ArrowsRightLeftIcon className="h-4 w-4 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-800">New field mapping added for Customer Master</p>
                      <p className="text-xs text-gray-500">Yesterday, 4:12 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <UserGroupIcon className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-800">Ownership of Production Version assigned to David Martinez</p>
                      <p className="text-xs text-gray-500">Oct 5, 2023</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Integration Architecture</h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="h-64 flex items-center justify-center border border-dashed border-gray-300 rounded-md">
                <p className="text-gray-500">Integration architecture diagram will appear here</p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="api" className="mt-0">
          <ApiConfigurationPanel />
        </TabsContent>
        
        <TabsContent value="mapping" className="mt-0">
          <div className="space-y-8">
            <StandardObjectMapping />
            <MiddleLayerConfig />
          </div>
        </TabsContent>
        
        <TabsContent value="ownership" className="mt-0">
          <DataElementOwnership />
        </TabsContent>
      </Tabs>
    </div>
  );
} 