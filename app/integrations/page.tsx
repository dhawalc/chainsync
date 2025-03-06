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
  ClockIcon
} from '@heroicons/react/24/outline';

// Sample integration data
const integrations = [
  {
    id: 'erp',
    name: 'ERP System',
    description: 'Connect to your Enterprise Resource Planning system',
    status: 'connected',
    lastSync: '2023-11-15T14:30:00',
    provider: 'SAP'
  },
  {
    id: 'crm',
    name: 'CRM System',
    description: 'Sync customer data with your Customer Relationship Management system',
    status: 'disconnected',
    lastSync: null,
    provider: 'Salesforce'
  },
  {
    id: 'wms',
    name: 'Warehouse Management',
    description: 'Connect to your Warehouse Management System for inventory data',
    status: 'connected',
    lastSync: '2023-11-14T09:15:00',
    provider: 'Manhattan Associates'
  },
  {
    id: 'tms',
    name: 'Transportation Management',
    description: 'Integrate with your Transportation Management System',
    status: 'pending',
    lastSync: null,
    provider: 'Oracle'
  },
  {
    id: 'forecasting',
    name: 'Demand Forecasting',
    description: 'Connect to external forecasting tools and services',
    status: 'connected',
    lastSync: '2023-11-10T16:45:00',
    provider: 'Blue Yonder'
  },
  {
    id: 'analytics',
    name: 'Analytics Platform',
    description: 'Push data to your analytics platform for advanced reporting',
    status: 'disconnected',
    lastSync: null,
    provider: 'Tableau'
  }
];

export default function IntegrationsPage() {
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
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Integrations</h1>
        <p className="mt-2 text-xl text-gray-700 max-w-3xl">
          Connect your supply chain platform with other systems and services
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {integrations.map((integration) => (
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
                  <ArrowsRightLeftIcon className="h-6 w-6 text-indigo-700" />
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
                  Configure
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
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Need a custom integration?</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6 text-center">
          Don't see the system you need? We can build custom integrations for your specific requirements.
        </p>
        <div className="text-center">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 text-lg">
            Request Custom Integration
          </Button>
        </div>
      </div>
    </div>
  );
} 