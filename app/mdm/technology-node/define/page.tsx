'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { 
  PlusIcon, 
  MinusIcon,
  ArrowDownTrayIcon, 
  ArrowUpTrayIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import PageHeader from '@/components/ui/page-header';

interface TechnologyNode {
  id: string;
  name: string;
  description: string;
}

const initialNodes: TechnologyNode[] = [
  { id: '3nm', name: '3nm Technology Node', description: '3 nanometer semiconductor manufacturing process' },
  { id: '5nm', name: '5nm Technology Node', description: '5 nanometer semiconductor manufacturing process' },
  { id: '7nm', name: '7nm Technology Node', description: '7 nanometer semiconductor manufacturing process' },
  { id: '10nm', name: '10nm Technology Node', description: '10 nanometer semiconductor manufacturing process' },
  { id: '28nm', name: '28nm Technology Node', description: '28 nanometer semiconductor manufacturing process' }
];

export default function DefineTechnologyNodes() {
  const [nodes, setNodes] = useState<TechnologyNode[]>(initialNodes);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedNode, setSelectedNode] = useState<TechnologyNode | null>(null);
  const [newNode, setNewNode] = useState<TechnologyNode>({ id: '', name: '', description: '' });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [exportFormat, setExportFormat] = useState('csv');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filteredNodes = nodes.filter(node => 
    node.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    node.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNode = async () => {
    if (newNode.id && newNode.name) {
      try {
        // TODO: Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setNodes([...nodes, newNode]);
        setNewNode({ id: '', name: '', description: '' });
        setShowAddDialog(false);
      } catch (error) {
        console.error('Error adding node:', error);
      }
    }
  };

  const handleDeleteNode = async () => {
    if (!selectedNode) return;
    
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setNodes(prevNodes => prevNodes.filter(node => node.id !== selectedNode.id));
      setSelectedNode(null);
      setShowDeleteDialog(false);
    } catch (error) {
      console.error('Error deleting node:', error);
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
          const importedNodes = JSON.parse(text);
          setNodes(importedNodes);
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
      const fileName = `technology-nodes.${exportFormat}`;

      if (exportFormat === 'json') {
        content = JSON.stringify(nodes, null, 2);
      } else if (exportFormat === 'csv') {
        const headers = ['Tech Node ID', 'Name', 'Description'];
        const rows = nodes.map(node => [
          node.id,
          node.name,
          node.description
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
      setNodes(initialNodes);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <PageHeader title="Define Technology Nodes" />
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
                Add Tech Node
              </Button>
              <Button 
                className={`${selectedNode ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-400'} text-white`}
                onClick={() => selectedNode && setShowDeleteDialog(true)}
                disabled={!selectedNode}
              >
                <MinusIcon className="h-4 w-4 mr-2" />
                Remove Tech Node
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
                placeholder="Search Technology Nodes..."
                className="w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Technology Nodes List */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Tech Node ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredNodes.map(node => (
                    <tr 
                      key={node.id} 
                      className={`hover:bg-gray-50 cursor-pointer ${selectedNode?.id === node.id ? 'bg-indigo-50' : ''}`}
                      onClick={() => setSelectedNode(node)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {node.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {node.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {node.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add Tech Node Dialog */}
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Technology Node</DialogTitle>
                <DialogDescription>
                  Enter the details for the new technology node.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="nodeId" className="text-sm font-medium">Tech Node ID</label>
                  <Input
                    id="nodeId"
                    value={newNode.id}
                    onChange={(e) => setNewNode({ ...newNode, id: e.target.value })}
                    placeholder="Enter tech node ID (e.g., 3nm)"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="nodeName" className="text-sm font-medium">Name</label>
                  <Input
                    id="nodeName"
                    value={newNode.name}
                    onChange={(e) => setNewNode({ ...newNode, name: e.target.value })}
                    placeholder="Enter tech node name"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="nodeDescription" className="text-sm font-medium">Description</label>
                  <Input
                    id="nodeDescription"
                    value={newNode.description}
                    onChange={(e) => setNewNode({ ...newNode, description: e.target.value })}
                    placeholder="Enter tech node description"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
                <Button 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  onClick={handleAddNode}
                >
                  Add Tech Node
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Technology Node</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete the technology node "{selectedNode?.name}"? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
                <Button 
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={handleDeleteNode}
                >
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Import Dialog */}
          <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Import Technology Nodes</DialogTitle>
                <DialogDescription>
                  Select a file to import technology node data.
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
                <DialogTitle>Export Technology Nodes</DialogTitle>
                <DialogDescription>
                  Choose the export format for your technology node data.
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