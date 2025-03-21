'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { 
  PlusIcon, 
  ArrowDownTrayIcon, 
  ArrowUpTrayIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import PageHeader from '@/components/ui/page-header';

interface Process {
  id: string;
  name: string;
  description: string;
}

const initialProcesses: Process[] = [
  { id: 'ASY', name: 'Assembly', description: 'Assembly' },
  { id: 'SCD', name: 'Semiconductor Die', description: 'Semiconductor Die' },
  { id: 'BKP', name: 'Backend Processing', description: 'Backend Processing' },
  { id: 'SLT', name: 'Sort and Test', description: 'Sort and Test' },
  { id: 'SRT', name: 'Sort', description: 'Sort' },
  { id: 'THR', name: 'Thermal Processing', description: 'Thermal Processing' },
  { id: 'TST', name: 'Testing', description: 'Testing' },
  { id: 'WTD', name: 'Wafer Test and Die', description: 'Wafer Test and Die' }
];

export default function ProcessMaster() {
  const [processes, setProcesses] = useState<Process[]>(initialProcesses);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [newProcess, setNewProcess] = useState<Process>({ id: '', name: '', description: '' });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [exportFormat, setExportFormat] = useState('csv');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filteredProcesses = processes.filter(process => 
    process.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    process.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    process.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProcess = async () => {
    if (newProcess.id && newProcess.name) {
      try {
        // TODO: Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProcesses([...processes, newProcess]);
        setNewProcess({ id: '', name: '', description: '' });
        setShowAddDialog(false);
      } catch (error) {
        console.error('Error adding process:', error);
      }
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
          const importedProcesses = JSON.parse(text);
          setProcesses(importedProcesses);
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
      const fileName = `processes.${exportFormat}`;

      if (exportFormat === 'json') {
        content = JSON.stringify(processes, null, 2);
      } else if (exportFormat === 'csv') {
        const headers = ['Process ID', 'Process Name', 'Description'];
        const rows = processes.map(process => [
          process.id,
          process.name,
          process.description
        ]);
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
      setProcesses(initialProcesses);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <PageHeader title="Process Master" />
      <main className="p-6 mx-auto max-w-7xl">
        <div className="space-y-6">
          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <Button 
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                onClick={() => setShowAddDialog(true)}
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Process
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
            </div>
            <div className="flex gap-2">
              <Input 
                type="search"
                placeholder="Search Processes..."
                className="w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Process List */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Process ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Process Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProcesses.map(process => (
                    <tr key={process.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {process.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {process.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {process.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add Process Dialog */}
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Process</DialogTitle>
                <DialogDescription>
                  Enter the details for the new process.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="processId" className="text-sm font-medium">Process ID</label>
                  <Input
                    id="processId"
                    value={newProcess.id}
                    onChange={(e) => setNewProcess({ ...newProcess, id: e.target.value })}
                    placeholder="Enter process ID"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="processName" className="text-sm font-medium">Process Name</label>
                  <Input
                    id="processName"
                    value={newProcess.name}
                    onChange={(e) => setNewProcess({ ...newProcess, name: e.target.value })}
                    placeholder="Enter process name"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="processDescription" className="text-sm font-medium">Description</label>
                  <Input
                    id="processDescription"
                    value={newProcess.description}
                    onChange={(e) => setNewProcess({ ...newProcess, description: e.target.value })}
                    placeholder="Enter process description"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
                <Button 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  onClick={handleAddProcess}
                >
                  Add Process
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Import Dialog */}
          <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Import Processes</DialogTitle>
                <DialogDescription>
                  Select a file to import process data.
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
                <DialogTitle>Export Processes</DialogTitle>
                <DialogDescription>
                  Choose the export format for your process data.
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