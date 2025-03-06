'use client';

import { useState } from 'react';
import MdmPageTemplate from '../components/MdmPageTemplate';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { 
  PlusCircleIcon, 
  ArrowDownTrayIcon, 
  ArrowUpTrayIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowPathIcon,
  DocumentDuplicateIcon
} from '@heroicons/react/24/outline';

// Sample data
const boms = [
  { id: 'BOM1001', material: 'Final Product X', description: 'Standard BOM for Product X', plant: '1000', status: 'Active', components: 12 },
  { id: 'BOM1002', material: 'Subassembly A', description: 'Subassembly for Electronics', plant: '1000', status: 'Active', components: 8 },
  { id: 'BOM1003', material: 'Subassembly B', description: 'Mechanical Components', plant: '1000', status: 'Active', components: 6 },
  { id: 'BOM1004', material: 'Final Product Y', description: 'Standard BOM for Product Y', plant: '1000', status: 'Active', components: 15 },
  { id: 'BOM1005', material: 'Final Product Z', description: 'Alternative BOM for Product Z', plant: '1004', status: 'In Development', components: 10 },
];

const columns = [
  { accessorKey: 'id', header: 'BOM ID' },
  { accessorKey: 'material', header: 'Material' },
  { accessorKey: 'description', header: 'Description' },
  { accessorKey: 'plant', header: 'Plant' },
  { accessorKey: 'components', header: 'Components' },
  { accessorKey: 'status', header: 'Status' },
  { 
    id: 'actions',
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" className="text-indigo-700 border-indigo-300 hover:bg-indigo-50">Edit</Button>
        <Button variant="outline" size="sm" className="text-indigo-700 border-indigo-300 hover:bg-indigo-50">View</Button>
        <Button variant="outline" size="sm" className="text-indigo-700 border-indigo-300 hover:bg-indigo-50">
          <DocumentDuplicateIcon className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];

export default function BomMasterPage() {
  return (
    <MdmPageTemplate
      title="Bill of Materials"
      description="Manage bill of materials (BOM) data including components, quantities, and relationships. Define product structures and maintain engineering and manufacturing BOMs."
    >
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex flex-wrap gap-2">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <PlusCircleIcon className="h-4 w-4 mr-2" />
              New BOM
            </Button>
            <Button variant="outline" className="text-indigo-700 border-indigo-300 hover:bg-indigo-50">
              <ArrowUpTrayIcon className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button variant="outline" className="text-indigo-700 border-indigo-300 hover:bg-indigo-50">
              <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" className="text-indigo-700 border-indigo-300 hover:bg-indigo-50">
              <ArrowPathIcon className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
          
          <div className="flex gap-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search BOMs..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full md:w-64"
              />
            </div>
            <Button variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-50">
              <FunnelIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h3 className="font-medium text-gray-700">Bill of Materials List</h3>
        </div>
        <DataTable columns={columns} data={boms} />
      </div>
    </MdmPageTemplate>
  );
} 