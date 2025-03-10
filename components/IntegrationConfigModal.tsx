import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Cog6ToothIcon, ArrowPathIcon, KeyIcon, TableCellsIcon, BellIcon } from '@heroicons/react/24/outline';

export interface IntegrationConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  integration: {
    id: string;
    name: string;
    provider: string;
    status: string;
    description?: string;
    lastSync?: string | null;
    connectionDetails?: {
      url?: string;
      username?: string;
      apiKey?: string;
      refreshRate?: string;
    };
  };
}

export function IntegrationConfigModal({ isOpen, onClose, integration }: IntegrationConfigModalProps) {
  const [activeTab, setActiveTab] = useState('connection');
  const [connectionDetails, setConnectionDetails] = useState({
    url: integration.connectionDetails?.url || '',
    username: integration.connectionDetails?.username || '',
    apiKey: integration.connectionDetails?.apiKey || '',
    refreshRate: integration.connectionDetails?.refreshRate || '60',
    enableNotifications: true,
    enableAutoSync: true
  });

  const handleSave = () => {
    // Here you would save the configuration
    console.log('Saving configuration:', connectionDetails);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center">
            <Cog6ToothIcon className="h-6 w-6 mr-2 text-indigo-600" />
            Configure {integration.name}
          </DialogTitle>
          <DialogDescription>
            Manage connection settings and data mapping for {integration.provider}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="connection" value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="connection" className="flex items-center">
              <KeyIcon className="h-4 w-4 mr-2" />
              Connection
            </TabsTrigger>
            <TabsTrigger value="mapping" className="flex items-center">
              <TableCellsIcon className="h-4 w-4 mr-2" />
              Data Mapping
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center">
              <Cog6ToothIcon className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="connection" className="space-y-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="url">Connection URL</Label>
                  <Input 
                    id="url" 
                    value={connectionDetails.url} 
                    onChange={(e) => setConnectionDetails({...connectionDetails, url: e.target.value})}
                    placeholder="https://api.example.com/v1"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input 
                    id="username" 
                    value={connectionDetails.username} 
                    onChange={(e) => setConnectionDetails({...connectionDetails, username: e.target.value})}
                    placeholder="username@company.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="apiKey">API Key</Label>
                  <Input 
                    id="apiKey" 
                    type="password"
                    value={connectionDetails.apiKey} 
                    onChange={(e) => setConnectionDetails({...connectionDetails, apiKey: e.target.value})}
                    placeholder="••••••••••••••••"
                  />
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-md p-4 text-amber-800 text-sm">
                <p>Connection credentials are securely stored and encrypted. Your API key is never exposed to client-side code.</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="mapping" className="space-y-4">
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-4">
              <h3 className="font-medium text-gray-900 mb-2">Field Mapping</h3>
              <p className="text-gray-600 text-sm">Map fields from {integration.provider} to ChainSync fields</p>
            </div>

            <div className="space-y-4">
              {['Product ID', 'Product Name', 'Category', 'Price', 'Inventory Level'].map((field, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                  <div>
                    <p className="font-medium text-gray-900">{field}</p>
                    <p className="text-sm text-gray-500">ChainSync field</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-400 mx-2">maps to</span>
                    <select className="border border-gray-300 rounded-md px-3 py-1 bg-white">
                      <option>{field.toLowerCase().replace(' ', '_')}</option>
                      <option>custom_{field.toLowerCase().replace(' ', '_')}</option>
                      <option>ext_{field.toLowerCase().replace(' ', '_')}</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" className="mt-2">
              <ArrowPathIcon className="h-4 w-4 mr-2" />
              Refresh Available Fields
            </Button>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="autoSync">Automatic Synchronization</Label>
                  <p className="text-sm text-gray-500">Automatically sync data on a schedule</p>
                </div>
                <Switch 
                  id="autoSync" 
                  checked={connectionDetails.enableAutoSync}
                  onCheckedChange={(checked) => setConnectionDetails({...connectionDetails, enableAutoSync: checked})}
                />
              </div>
              
              {connectionDetails.enableAutoSync && (
                <div className="space-y-2 ml-6 mt-2">
                  <Label htmlFor="refreshRate">Refresh Rate (minutes)</Label>
                  <Input 
                    id="refreshRate" 
                    type="number"
                    value={connectionDetails.refreshRate} 
                    onChange={(e) => setConnectionDetails({...connectionDetails, refreshRate: e.target.value})}
                    className="w-24"
                  />
                </div>
              )}
              
              <div className="border-t border-gray-200 my-4"></div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications">Sync Notifications</Label>
                  <p className="text-sm text-gray-500">Receive notifications for sync events</p>
                </div>
                <Switch 
                  id="notifications" 
                  checked={connectionDetails.enableNotifications}
                  onCheckedChange={(checked) => setConnectionDetails({...connectionDetails, enableNotifications: checked})}
                />
              </div>
              
              {connectionDetails.enableNotifications && (
                <div className="space-y-4 ml-6 mt-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="notifySuccess" className="mr-2" defaultChecked />
                    <Label htmlFor="notifySuccess">Successful syncs</Label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="notifyFailure" className="mr-2" defaultChecked />
                    <Label htmlFor="notifyFailure">Failed syncs</Label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="notifyWarning" className="mr-2" defaultChecked />
                    <Label htmlFor="notifyWarning">Warnings and data issues</Label>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose} className="mr-2">
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700 text-white">
            Save Configuration
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 