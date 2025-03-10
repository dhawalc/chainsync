import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowPathIcon, 
  CloudArrowUpIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ChartBarIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface IntegrationDetailsProps {
  integration: {
    id: string;
    name: string;
    description: string;
    status: string;
    lastSync: string | null;
    provider: string;
    syncStats?: {
      totalRecords?: number;
      successCount?: number;
      errorCount?: number;
      warningCount?: number;
    };
    syncHistory?: Array<{
      id: string;
      date: string;
      status: string;
      recordsProcessed: number;
      duration: string;
    }>;
  };
  onClose: () => void;
  onSync: (id: string) => void;
  onConfigure: (id: string) => void;
  isSyncing: boolean;
}

export function IntegrationDetails({ 
  integration, 
  onClose, 
  onSync, 
  onConfigure,
  isSyncing 
}: IntegrationDetailsProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge variant="success">Connected</Badge>;
      case 'disconnected':
        return <Badge variant="error">Disconnected</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'success':
        return <Badge variant="success">Success</Badge>;
      case 'failed':
        return <Badge variant="error">Failed</Badge>;
      case 'partial':
        return <Badge variant="warning">Partial Success</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
      case 'success':
        return <CheckCircleIcon className="h-6 w-6 text-emerald-500" />;
      case 'disconnected':
      case 'failed':
        return <XCircleIcon className="h-6 w-6 text-red-500" />;
      case 'pending':
      case 'partial':
        return <ClockIcon className="h-6 w-6 text-amber-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <div className="mr-4">
            {getStatusIcon(integration.status)}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{integration.name}</h2>
            <div className="flex items-center mt-1">
              <p className="text-gray-600 mr-3">{integration.provider}</p>
              {getStatusBadge(integration.status)}
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={onClose}>
            Back
          </Button>
          
          {integration.status === 'connected' && (
            <Button 
              onClick={() => onSync(integration.id)}
              disabled={isSyncing}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              {isSyncing ? (
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
          
          <Button 
            onClick={() => onConfigure(integration.id)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Configure
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <DocumentTextIcon className="h-5 w-5 mr-2 text-indigo-600" />
              Integration Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">{integration.description}</p>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Status:</span>
                <span className="font-medium text-gray-900">{integration.status}</span>
              </div>
              
              {integration.lastSync && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Last Synced:</span>
                  <span className="font-medium text-gray-900">
                    {new Date(integration.lastSync).toLocaleString()}
                  </span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-gray-500">Provider:</span>
                <span className="font-medium text-gray-900">{integration.provider}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-500">Integration ID:</span>
                <span className="font-medium text-gray-900">{integration.id}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <ChartBarIcon className="h-5 w-5 mr-2 text-indigo-600" />
              Sync Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            {integration.syncStats ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-md text-center">
                    <p className="text-gray-500 text-sm">Total Records</p>
                    <p className="text-2xl font-bold text-gray-900">{integration.syncStats.totalRecords || 0}</p>
                  </div>
                  
                  <div className="bg-emerald-50 p-3 rounded-md text-center">
                    <p className="text-emerald-600 text-sm">Successful</p>
                    <p className="text-2xl font-bold text-emerald-700">{integration.syncStats.successCount || 0}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-red-50 p-3 rounded-md text-center">
                    <p className="text-red-600 text-sm">Errors</p>
                    <p className="text-2xl font-bold text-red-700">{integration.syncStats.errorCount || 0}</p>
                  </div>
                  
                  <div className="bg-amber-50 p-3 rounded-md text-center">
                    <p className="text-amber-600 text-sm">Warnings</p>
                    <p className="text-2xl font-bold text-amber-700">{integration.syncStats.warningCount || 0}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-32 text-center">
                <ExclamationTriangleIcon className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-gray-500">No sync statistics available</p>
                <p className="text-gray-400 text-sm mt-1">Run a sync to see statistics</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <ClockIcon className="h-5 w-5 mr-2 text-indigo-600" />
              Recent Sync History
            </CardTitle>
          </CardHeader>
          <CardContent>
            {integration.syncHistory && integration.syncHistory.length > 0 ? (
              <div className="space-y-3">
                {integration.syncHistory.map((history) => (
                  <div key={history.id} className="flex items-center justify-between p-2 border-b border-gray-100">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(history.date).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(history.date).toLocaleTimeString()} • {history.recordsProcessed} records • {history.duration}
                      </p>
                    </div>
                    {getStatusBadge(history.status)}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-32 text-center">
                <ClockIcon className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-gray-500">No sync history available</p>
                <p className="text-gray-400 text-sm mt-1">Run a sync to see history</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="font-medium text-gray-900 mb-2">Actions</h3>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="text-sm">
            View Logs
          </Button>
          <Button variant="outline" size="sm" className="text-sm">
            Test Connection
          </Button>
          <Button variant="outline" size="sm" className="text-sm">
            View Data
          </Button>
          <Button variant="outline" size="sm" className="text-sm text-red-600 hover:bg-red-50 hover:text-red-700">
            Disconnect
          </Button>
        </div>
      </div>
    </div>
  );
} 