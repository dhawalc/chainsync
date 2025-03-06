'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRightIcon } from '@heroicons/react/24/solid';

interface MdmPageTemplateProps {
  title: string;
  description: string;
  children: React.ReactNode;
  inboundEnabled?: boolean;
  outboundEccEnabled?: boolean;
  outboundApoEnabled?: boolean;
}

export default function MdmPageTemplate({
  title,
  description,
  children,
  inboundEnabled = true,
  outboundEccEnabled = true,
  outboundApoEnabled = true
}: MdmPageTemplateProps) {
  const [transferType, setTransferType] = useState<'full' | 'delta' | 'selection'>('full');
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Header with breadcrumb */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center text-sm text-gray-600">
            <span className="hover:text-indigo-600 cursor-pointer">Master Data</span>
            <ChevronRightIcon className="h-4 w-4 mx-1" />
            <span className="text-indigo-600 font-medium">{title}</span>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page header */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h1 className="text-3xl font-bold text-indigo-900 mb-3">{title}</h1>
          <p className="text-gray-700 max-w-3xl">{description}</p>
          
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="bg-indigo-50 p-4 rounded-md border border-indigo-100 flex-1 min-w-[200px]">
              <h3 className="text-indigo-800 font-medium mb-1">Total Records</h3>
              <p className="text-3xl font-bold text-indigo-900">1,245</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-md border border-emerald-100 flex-1 min-w-[200px]">
              <h3 className="text-emerald-800 font-medium mb-1">Active</h3>
              <p className="text-3xl font-bold text-emerald-700">1,182</p>
            </div>
            <div className="bg-amber-50 p-4 rounded-md border border-amber-100 flex-1 min-w-[200px]">
              <h3 className="text-amber-800 font-medium mb-1">Pending Changes</h3>
              <p className="text-3xl font-bold text-amber-700">63</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-md border border-blue-100 flex-1 min-w-[200px]">
              <h3 className="text-blue-800 font-medium mb-1">Last Sync</h3>
              <p className="text-lg font-medium text-blue-700">Today, 09:45 AM</p>
            </div>
          </div>
        </div>
        
        {/* Tabs section */}
        <Tabs defaultValue="data" className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          <div className="px-6 pt-4 border-b border-gray-200">
            <TabsList className="mb-0 bg-transparent p-0 space-x-6">
              <TabsTrigger 
                value="data" 
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-indigo-600 rounded-none px-1 py-3"
              >
                Data Maintenance
              </TabsTrigger>
              {inboundEnabled && 
                <TabsTrigger 
                  value="inbound" 
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-indigo-600 rounded-none px-1 py-3"
                >
                  Inbound Transfer
                </TabsTrigger>
              }
              {outboundEccEnabled && 
                <TabsTrigger 
                  value="outbound-ecc" 
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-indigo-600 rounded-none px-1 py-3"
                >
                  Outbound to ECC
                </TabsTrigger>
              }
              {outboundApoEnabled && 
                <TabsTrigger 
                  value="outbound-apo" 
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-indigo-600 rounded-none px-1 py-3"
                >
                  Outbound to APO
                </TabsTrigger>
              }
              <TabsTrigger 
                value="hierarchy" 
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-indigo-600 rounded-none px-1 py-3"
              >
                Hierarchical View
              </TabsTrigger>
              <TabsTrigger 
                value="rules" 
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-indigo-600 rounded-none px-1 py-3"
              >
                Business Rules
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="data" className="p-6 mt-0">
            {children}
          </TabsContent>
          
          {inboundEnabled && (
            <TabsContent value="inbound" className="p-6 mt-0">
              <div className="max-w-4xl">
                <h2 className="text-xl font-semibold mb-4 text-indigo-900">Inbound to PDMT</h2>
                <p className="text-gray-700 mb-6">Configure and execute data transfers from source systems to the Product Data Management Tool.</p>
                
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                  <h3 className="text-lg font-medium mb-4 text-gray-800">Transfer Type</h3>
                  <div className="flex flex-wrap gap-3">
                    <button 
                      className={`px-4 py-2 rounded-md transition-colors ${transferType === 'full' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                      onClick={() => setTransferType('full')}
                    >
                      Full Transfer
                    </button>
                    <button 
                      className={`px-4 py-2 rounded-md transition-colors ${transferType === 'delta' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                      onClick={() => setTransferType('delta')}
                    >
                      Delta Transfer
                    </button>
                    <button 
                      className={`px-4 py-2 rounded-md transition-colors ${transferType === 'selection' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                      onClick={() => setTransferType('selection')}
                    >
                      Selection Condition
                    </button>
                  </div>
                  
                  {transferType === 'selection' && (
                    <div className="mt-4">
                      <h4 className="text-md font-medium mb-2 text-gray-800">Selection Conditions</h4>
                      <textarea 
                        className="w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        rows={5}
                        placeholder="Enter selection conditions..."
                      ></textarea>
                    </div>
                  )}
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                  <h3 className="text-lg font-medium mb-4 text-gray-800">Schedule</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                      <input type="date" className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                      <input type="time" className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="inline-flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                      <span className="ml-2 text-gray-700">Recurring transfer</span>
                    </label>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                    Schedule Transfer
                  </button>
                  <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors ml-3">
                    Start Now
                  </button>
                </div>
              </div>
            </TabsContent>
          )}
          
          {outboundEccEnabled && (
            <TabsContent value="outbound-ecc" className="p-6 mt-0">
              <div className="max-w-4xl">
                <h2 className="text-xl font-semibold mb-4 text-indigo-900">Outbound to ECC</h2>
                <p className="text-gray-700 mb-6">Configure and manage data transfers to your ECC system.</p>
                
                {/* Similar content to inbound tab */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                  <h3 className="text-lg font-medium mb-4 text-gray-800">Transfer Configuration</h3>
                  {/* Configuration options would go here */}
                </div>
              </div>
            </TabsContent>
          )}
          
          {outboundApoEnabled && (
            <TabsContent value="outbound-apo" className="p-6 mt-0">
              <div className="max-w-4xl">
                <h2 className="text-xl font-semibold mb-4 text-indigo-900">Outbound to APO</h2>
                <p className="text-gray-700 mb-6">Configure and manage data transfers to your APO system.</p>
                
                {/* Similar content to inbound tab */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                  <h3 className="text-lg font-medium mb-4 text-gray-800">Transfer Configuration</h3>
                  {/* Configuration options would go here */}
                </div>
              </div>
            </TabsContent>
          )}
          
          <TabsContent value="hierarchy" className="p-6 mt-0">
            <div className="max-w-4xl">
              <h2 className="text-xl font-semibold mb-4 text-indigo-900">Hierarchical Maintenance</h2>
              <p className="text-gray-700 mb-6">Manage hierarchical relationships for {title.toLowerCase()}.</p>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium mb-4 text-gray-800">Hierarchy Viewer</h3>
                {/* Hierarchical tree view would go here */}
                <div className="h-96 flex items-center justify-center border border-dashed border-gray-300 rounded-md">
                  <p className="text-gray-500">Hierarchy visualization will appear here</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="rules" className="p-6 mt-0">
            <div className="max-w-4xl">
              <h2 className="text-xl font-semibold mb-4 text-indigo-900">Business Rules</h2>
              <p className="text-gray-700 mb-6">Configure rules for field derivation and validation.</p>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium mb-4 text-gray-800">Rule Configuration</h3>
                {/* Rules configuration interface would go here */}
                <div className="h-96 flex items-center justify-center border border-dashed border-gray-300 rounded-md">
                  <p className="text-gray-500">Rule configuration interface will appear here</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 