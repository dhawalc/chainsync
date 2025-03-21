'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  PlusIcon, 
  ArrowDownTrayIcon, 
  ArrowUpTrayIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import PageHeader from '@/components/ui/page-header';

interface TechnologyNode {
  id: string;
  name: string;
  description: string;
  processes: string[];
}

interface Process {
  id: string;
  name: string;
}

type ProcessMapping = {
  [key: string]: string[];
};

const mockTechnologyNodes: TechnologyNode[] = [
  { id: 'TN001', name: '3nm', description: '3nm', processes: ['ASY', 'SCD', 'SRT', 'TST', 'WTD'] },
  { id: 'TN002', name: '5nm', description: '5nm', processes: ['SCD', 'SLT', 'SRT', 'THR', 'WTD'] },
  { id: 'TN003', name: '7nm', description: '7nm', processes: ['ASY', 'SCD', 'BKP', 'SLT'] },
  { id: 'TN004', name: '10nm', description: '10nm', processes: ['BKP', 'THR', 'TST'] },
  { id: 'TN005', name: '28nm', description: '28nm', processes: ['ASY', 'SRT', 'THR', 'TST'] }
];

const processes: Process[] = [
  { id: 'ASY', name: 'Assembly' },
  { id: 'SCD', name: 'Semiconductor Die' },
  { id: 'BKP', name: 'Backend Processing' },
  { id: 'SLT', name: 'Sort and Test' },
  { id: 'SRT', name: 'Sort' },
  { id: 'THR', name: 'Thermal Processing' },
  { id: 'TST', name: 'Testing' },
  { id: 'WTD', name: 'Wafer Test and Die' },
];

const initialMapping: ProcessMapping = {
  'TN001': ['ASY', 'SCD', 'SRT', 'WTD'],
  'TN002': ['SCD', 'SLT', 'SRT', 'THR', 'WTD'],
  'TN003': ['ASY', 'SCD', 'BKP', 'SLT'],
  'TN004': ['BKP', 'THR', 'TST'],
  'TN005': ['ASY', 'SRT', 'THR', 'TST'],
};

export default function TechnologyNodeProcessMapping() {
  const [mapping, setMapping] = useState<ProcessMapping>(initialMapping);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [exportFormat, setExportFormat] = useState('csv');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleCheckboxChange = (techNodeId: string, processId: string) => {
    setMapping(prev => {
      const newMapping = { ...prev };
      if (!newMapping[techNodeId]) {
        newMapping[techNodeId] = [];
      }
      
      if (newMapping[techNodeId].includes(processId)) {
        newMapping[techNodeId] = newMapping[techNodeId].filter(id => id !== processId);
      } else {
        newMapping[techNodeId] = [...newMapping[techNodeId], processId];
      }
      
      return newMapping;
    });
  };

  const handleSave = async () => {
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Saving mapping:', mapping);
      setShowSaveDialog(false);
    } catch (error) {
      console.error('Error saving mapping:', error);
    }
  };

  const handleImport = async () => {
    if (!selectedFile) return;

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target?.result;
        if (typeof text === 'string') {
          // Parse the imported data based on file type
          const importedMapping = JSON.parse(text);
          setMapping(importedMapping);
        }
      };
      reader.readAsText(selectedFile);
      setShowImportDialog(false);
    } catch (error) {
      console.error('Error importing file:', error);
    }
  };

  const handleExport = () => {
    try {
      let content = '';
      const fileName = `process-mapping.${exportFormat}`;

      if (exportFormat === 'json') {
        content = JSON.stringify(mapping, null, 2);
      } else if (exportFormat === 'csv') {
        // Convert mapping to CSV format
        const headers = ['Technology Node', ...processes.map(p => p.id)];
        const rows = Object.entries(mapping).map(([nodeId, processIds]) => {
          const node = mockTechnologyNodes.find(n => n.id === nodeId);
          return [nodeId, ...processes.map(p => processIds.includes(p.id) ? 'X' : '')];
        });
        content = [headers, ...rows].map(row => row.join(',')).join('\n');
      }

      const blob = new Blob([content], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      setShowExportDialog(false);
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // TODO: Replace with actual API call to refresh data
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMapping(initialMapping);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <PageHeader title="Technology Node - Process Mapping" />
      <main className="p-6 mx-auto max-w-7xl">
        <div className="space-y-6">
          {/* Action Bar */}
          <div className="flex flex-wrap gap-2">
            <Button 
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
              onClick={() => {
                // Navigate to Define Technology Nodes page
                window.location.href = '/mdm/technology-node/define';
              }}
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Add/Remove Tech Node
            </Button>
            <Button 
              variant="outline" 
              className="text-indigo-700 border-indigo-300 hover:bg-indigo-50"
              onClick={() => setShowImportDialog(true)}
            >
              <ArrowUpTrayIcon className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button 
              variant="outline" 
              className="text-indigo-700 border-indigo-300 hover:bg-indigo-50"
              onClick={() => setShowExportDialog(true)}
            >
              <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button 
              variant="outline" 
              className="text-indigo-700 border-indigo-300 hover:bg-indigo-50"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <ArrowPathIcon className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white ml-auto"
              onClick={() => setShowSaveDialog(true)}
            >
              Save
            </Button>
          </div>

          {/* Process Mapping Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-[#e6ffe6]">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      Technology Node ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      Technology Node Name
                    </th>
                    {processes.map(process => (
                      <th key={process.id} className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider whitespace-nowrap">
                        {process.id}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockTechnologyNodes.map((node) => (
                    <tr key={node.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {node.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {node.name}
                      </td>
                      {processes.map(process => (
                        <td key={`${node.id}-${process.id}`} className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                          <Checkbox
                            checked={mapping[node.id]?.includes(process.id)}
                            onCheckedChange={() => handleCheckboxChange(node.id, process.id)}
                            className="border-indigo-500 data-[state=checked]:bg-indigo-500"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Save Dialog */}
          <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Save Changes</DialogTitle>
                <DialogDescription>
                  Are you sure you want to save the current process mapping?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowSaveDialog(false)}>Cancel</Button>
                <Button 
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={handleSave}
                >
                  Save Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Import Dialog */}
          <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Import Process Mapping</DialogTitle>
                <DialogDescription>
                  Select a file to import process mapping data.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <input
                  type="file"
                  accept=".json,.csv"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-indigo-50 file:text-indigo-700
                    hover:file:bg-indigo-100"
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowImportDialog(false)}>Cancel</Button>
                <Button 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  onClick={handleImport}
                  disabled={!selectedFile}
                >
                  Import
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Export Dialog */}
          <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Export Process Mapping</DialogTitle>
                <DialogDescription>
                  Choose the export format for your process mapping data.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <select 
                  className="w-full p-2 border rounded-md"
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value)}
                >
                  <option value="csv">CSV</option>
                  <option value="json">JSON</option>
                </select>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowExportDialog(false)}>Cancel</Button>
                <Button 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  onClick={handleExport}
                >
                  Export
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
} 