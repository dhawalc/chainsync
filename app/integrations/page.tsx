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
import { IntegrationConfigModal } from '@/components/IntegrationConfigModal';
import { DataMappingInterface } from '@/components/DataMappingInterface';
import { IntegrationDetails } from '@/components/IntegrationDetails';

// Enhanced integration data with more details
const integrations = [
  {
    id: 'erp',
    name: 'ERP System',
    description: 'Connect to your Enterprise Resource Planning system for inventory, orders, and product data.',
    status: 'connected',
    lastSync: '2023-11-15T14:30:00',
    provider: 'SAP',
    connectionDetails: {
      url: 'https://api.sap-erp.example.com/v1',
      username: 'chainsync_api',
      refreshRate: '60'
    },
    syncStats: {
      totalRecords: 12458,
      successCount: 12450,
      errorCount: 3,
      warningCount: 5
    },
    syncHistory: [
      {
        id: 'sync1',
        date: '2023-11-15T14:30:00',
        status: 'success',
        recordsProcessed: 12458,
        duration: '3m 42s'
      },
      {
        id: 'sync2',
        date: '2023-11-14T10:15:00',
        status: 'partial',
        recordsProcessed: 12455,
        duration: '3m 51s'
      },
      {
        id: 'sync3',
        date: '2023-11-13T09:30:00',
        status: 'success',
        recordsProcessed: 12450,
        duration: '3m 38s'
      }
    ]
  },
  {
    id: 'crm',
    name: 'CRM System',
    description: 'Sync customer data with your Customer Relationship Management system for better demand forecasting and customer insights.',
    status: 'disconnected',
    lastSync: null,
    provider: 'Salesforce',
    connectionDetails: {
      url: '',
      username: '',
      refreshRate: '60'
    }
  },
  {
    id: 'wms',
    name: 'Warehouse Management',
    description: 'Connect to your Warehouse Management System for real-time inventory data, stock movements, and warehouse operations.',
    status: 'connected',
    lastSync: '2023-11-14T09:15:00',
    provider: 'Manhattan Associates',
    connectionDetails: {
      url: 'https://api.manhattan.example.com/v2',
      username: 'chainsync_wms',
      refreshRate: '30'
    },
    syncStats: {
      totalRecords: 8734,
      successCount: 8730,
      errorCount: 0,
      warningCount: 4
    },
    syncHistory: [
      {
        id: 'sync1',
        date: '2023-11-14T09:15:00',
        status: 'success',
        recordsProcessed: 8734,
        duration: '2m 12s'
      },
      {
        id: 'sync2',
        date: '2023-11-13T09:10:00',
        status: 'success',
        recordsProcessed: 8720,
        duration: '2m 08s'
      }
    ]
  },
  {
    id: 'tms',
    name: 'Transportation Management',
    description: 'Integrate with your Transportation Management System for shipment tracking, carrier management, and logistics optimization.',
    status: 'pending',
    lastSync: null,
    provider: 'Oracle',
    connectionDetails: {
      url: 'https://api.oracle-tms.example.com/v1',
      username: 'chainsync_tms',
      refreshRate: '60'
    }
  },
  {
    id: 'forecasting',
    name: 'Demand Forecasting',
    description: 'Connect to external forecasting tools and services for advanced demand prediction and planning scenarios.',
    status: 'connected',
    lastSync: '2023-11-10T16:45:00',
    provider: 'Blue Yonder',
    connectionDetails: {
      url: 'https://api.blueyonder.example.com/v3',
      username: 'chainsync_forecast',
      refreshRate: '120'
    },
    syncStats: {
      totalRecords: 5280,
      successCount: 5275,
      errorCount: 2,
      warningCount: 3
    },
    syncHistory: [
      {
        id: 'sync1',
        date: '2023-11-10T16:45:00',
        status: 'success',
        recordsProcessed: 5280,
        duration: '1m 45s'
      }
    ]
  },
  {
    id: 'analytics',
    name: 'Analytics Platform',
    description: 'Push data to your analytics platform for advanced reporting, dashboards, and business intelligence.',
    status: 'disconnected',
    lastSync: null,
    provider: 'Tableau',
    connectionDetails: {
      url: '',
      username: '',
      refreshRate: '60'
    }
  }
];

export default function IntegrationsPage() {
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const [mappingInterfaceOpen, setMappingInterfaceOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);

  const handleSync = (id: string) => {
    setSyncingId(id);
    // Simulate sync process
    setTimeout(() => {
      setSyncingId(null);
    }, 2000);
  };

  const handleConfigure = (id: string) => {
    setSelectedIntegration(id);
    setConfigModalOpen(true);
  };

  const handleConfigureMapping = (id: string) => {
    setSelectedIntegration(id);
    setMappingInterfaceOpen(true);
  };

  const handleViewDetails = (id: string) => {
    setSelectedIntegration(id);
    setDetailsOpen(true);
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

  const selectedIntegrationData = integrations.find(i => i.id === selectedIntegration);

  // If details view is open, show the details component
  if (detailsOpen && selectedIntegrationData) {
    return (
      <IntegrationDetails 
        integration={selectedIntegrationData}
        onClose={() => setDetailsOpen(false)}
        onSync={handleSync}
        onConfigure={handleConfigure}
        isSyncing={syncingId === selectedIntegrationData.id}
      />
    );
  }

  // If mapping interface is open, show the mapping component
  if (mappingInterfaceOpen && selectedIntegrationData) {
    return (
      <DataMappingInterface 
        integrationId={selectedIntegrationData.id}
        integrationName={selectedIntegrationData.name}
        provider={selectedIntegrationData.provider}
        onSave={() => setMappingInterfaceOpen(false)}
        onCancel={() => setMappingInterfaceOpen(false)}
      />
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 bg-white min-h-screen">
      <div className="mb-10 border-b border-gray-200 pb-6">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Integration Configuration</h1>
        <p className="mt-2 text-xl text-gray-700 max-w-3xl">
          Configure and manage data integration between systems based on project assumptions
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
                <div className="p-2 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200" onClick={() => handleViewDetails(integration.id)}>
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
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    className="text-gray-700 border-2 border-gray-300 hover:bg-gray-100 flex items-center px-2 py-1 h-9 text-sm"
                    onClick={() => handleConfigure(integration.id)}
                  >
                    <Cog6ToothIcon className="h-4 w-4 mr-1" />
                    Config
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="text-gray-700 border-2 border-gray-300 hover:bg-gray-100 flex items-center px-2 py-1 h-9 text-sm"
                    onClick={() => handleConfigureMapping(integration.id)}
                  >
                    <ArrowsRightLeftIcon className="h-4 w-4 mr-1" />
                    Map
                  </Button>
                </div>
                
                {integration.status === 'connected' && (
                  <Button 
                    onClick={() => handleSync(integration.id)}
                    disabled={syncingId === integration.id}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white h-9 px-3 py-1 text-sm"
                  >
                    {syncingId === integration.id ? (
                      <>
                        <ArrowPathIcon className="h-4 w-4 mr-1 animate-spin" />
                        Syncing...
                      </>
                    ) : (
                      <>
                        <ArrowPathIcon className="h-4 w-4 mr-1" />
                        Sync
                      </>
                    )}
                  </Button>
                )}
                
                {integration.status === 'disconnected' && (
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white h-9 px-3 py-1 text-sm">
                    <CloudArrowUpIcon className="h-4 w-4 mr-1" />
                    Connect
                  </Button>
                )}
                
                {integration.status === 'pending' && (
                  <Button disabled className="bg-amber-600 text-white opacity-70 h-9 px-3 py-1 text-sm">
                    <ClockIcon className="h-4 w-4 mr-1" />
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

      {/* Configuration Modal */}
      {selectedIntegrationData && (
        <IntegrationConfigModal 
          isOpen={configModalOpen}
          onClose={() => setConfigModalOpen(false)}
          integration={selectedIntegrationData}
        />
      )}
    </div>
  );
} 