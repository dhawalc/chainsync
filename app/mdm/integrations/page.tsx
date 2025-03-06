'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { 
  ArrowPathIcon, 
  CloudArrowUpIcon,
  ArrowsRightLeftIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

// Sample integration data for MDM
const mdmIntegrations = [
  {
    id: 'erp-mdm',
    name: 'ERP Master Data',
    description: 'Sync master data with your Enterprise Resource Planning system',
    status: 'connected',
    lastSync: '2023-11-15T14:30:00',
    provider: 'SAP'
  },
  {
    id: 'plm',
    name: 'Product Lifecycle Management',
    description: 'Connect to your PLM system for product master data',
    status: 'disconnected',
    lastSync: null,
    provider: 'Siemens Teamcenter'
  },
  {
    id: 'supplier-portal',
    name: 'Supplier Portal',
    description: 'Integrate with your supplier portal for vendor master data',
    status: 'connected',
    lastSync: '2023-11-14T09:15:00',
    provider: 'Ariba'
  },
  {
    id: 'customer-mdm',
    name: 'Customer MDM',
    description: 'Sync customer master data with your CRM system',
    status: 'pending',
    lastSync: null,
    provider: 'Salesforce'
  }
];

export default function MdmIntegrationsPage() {
  const [syncingId, setSyncingId] = useState<string | null>(null);

  const handleSync = (id: string) => {
    setSyncingId(id);
    // Simulate sync process
    setTimeout(() => {
      setSyncingId(null);
    }, 2000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge variant="success">Connected</Badge>;
      case 'disconnected':
        return <Badge variant="error">Disconnected</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircleIcon className="h-6 w-6 text-emerald-500" />;
      case 'disconnected':
        return <XCircleIcon className="h-6 w-6 text-red-500" />;
      case 'pending':
        return <ClockIcon className="h-6 w-6 text-amber-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 bg-white min-h-screen">
      <div className="mb-10 border-b border-gray-200 pb-6">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">MDM Integration Configuration</h1>
        <p className="mt-2 text-xl text-gray-700 max-w-3xl">
          Connect your master data with external systems and services
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {mdmIntegrations.map((integration) => (
          <Card 
            key={integration.id} 
            className="border-2 border-gray-200 hover:border-indigo-300 shadow-md hover:shadow-xl rounded-xl overflow-hidden transition-all duration-300 bg-white"
          >
            <div className={`h-3 ${
              integration.status === 'connected' ? 'bg-emerald-500' : 
              integration.status === 'disconnected' ? 'bg-red-500' : 
              'bg-amber-500'
            }`}></div>
            <CardHeader className="pb-3 bg-white">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-gray-900">{integration.name}</CardTitle>
                <div className="p-2 bg-gray-100 rounded-full">
                  <Cog6ToothIcon className="h-6 w-6 text-indigo-700" />
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <CardDescription className="text-gray-700 font-medium">
                  {integration.provider}
                </CardDescription>
                {getStatusBadge(integration.status)}
              </div>
            </CardHeader>
            <CardContent className="pt-4 pb-6 bg-white">
              <p className="text-base text-gray-800 mb-6">
                {integration.description}
              </p>
              
              {integration.lastSync && (
                <p className="text-sm text-gray-600 mb-4">
                  Last synced: {new Date(integration.lastSync).toLocaleString()}
                </p>
              )}
              
              <div className="flex justify-between items-center mt-auto">
                <Button 
                  variant="outline" 
                  className="text-gray-700 border-2 border-gray-300 hover:bg-gray-100"
                >
                  Configure Mapping
                </Button>
                
                {integration.status === 'connected' && (
                  <Button 
                    onClick={() => handleSync(integration.id)}
                    disabled={syncingId === integration.id}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    {syncingId === integration.id ? (
                      <>
                        <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
                        Syncing...
                      </>
                    ) : (
                      <>
                        <ArrowPathIcon className="h-5 w-5 mr-2" />
                        Sync Now
                      </>
                    )}
                  </Button>
                )}
                
                {integration.status === 'disconnected' && (
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    <CloudArrowUpIcon className="h-5 w-5 mr-2" />
                    Connect
                  </Button>
                )}
                
                {integration.status === 'pending' && (
                  <Button disabled className="bg-amber-600 text-white opacity-70">
                    <ClockIcon className="h-5 w-5 mr-2" />
                    Pending
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-12 bg-gray-50 p-8 rounded-xl border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">MDM Data Quality Settings</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6 text-center">
          Configure data quality rules and validation settings for master data integration
        </p>
        <div className="text-center">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 text-lg">
            Configure Data Quality Rules
          </Button>
        </div>
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Integration Logs</h2>
        <Card className="border-2 border-gray-200 shadow-md rounded-xl overflow-hidden bg-white">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <CardTitle className="text-xl font-bold text-gray-900">Recent Sync Activities</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th scope="col" className="px-6 py-3 text-left text-sm font-bold text-gray-900">Integration</th>
                    <th scope="col" className="px-6 py-3 text-left text-sm font-bold text-gray-900">Timestamp</th>
                    <th scope="col" className="px-6 py-3 text-left text-sm font-bold text-gray-900">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-sm font-bold text-gray-900">Records</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-300">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">ERP Master Data</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2023-11-15 14:30:00</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Badge variant="success">Success</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1,245</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Supplier Portal</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2023-11-14 09:15:00</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Badge variant="success">Success</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">328</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">ERP Master Data</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2023-11-13 10:45:00</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Badge variant="error">Failed</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 