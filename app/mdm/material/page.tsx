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
  ArrowPathIcon
} from '@heroicons/react/24/outline';

// Sample data - in a real app, this would come from your API
const materials = [
  { id: '1000001', name: 'Aluminum Sheet 3mm', type: 'ROH', group: 'METAL', unit: 'EA', status: 'Active' },
  { id: '1000002', name: 'Steel Rod 10mm', type: 'ROH', group: 'METAL', unit: 'EA', status: 'Active' },
  { id: '1000003', name: 'Plastic Housing Type A', type: 'HALB', group: 'PLASTIC', unit: 'EA', status: 'Active' },
  { id: '1000004', name: 'Circuit Board v2', type: 'HALB', group: 'ELECTRONIC', unit: 'EA', status: 'Active' },
  { id: '1000005', name: 'Final Product X', type: 'FERT', group: 'FINISHED', unit: 'EA', status: 'Active' },
];

const columns = [
  { accessorKey: 'id', header: 'Material ID' },
  { accessorKey: 'name', header: 'Description' },
  { accessorKey: 'type', header: 'Material Type' },
  { accessorKey: 'group', header: 'Material Group' },
  { accessorKey: 'unit', header: 'Base Unit' },
  { accessorKey: 'status', header: 'Status' },
  { 
    id: 'actions',
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" className="text-indigo-700 border-indigo-300 hover:bg-indigo-50">Edit</Button>
        <Button variant="outline" size="sm" className="text-indigo-700 border-indigo-300 hover:bg-indigo-50">View</Button>
      </div>
    ),
  },
];

export default function MaterialMasterPage() {
  return (
    <MdmPageTemplate
      title="Material Master"
      description="Manage material master data including basic data, classification, and attributes. Create, update, and maintain all material-related information in a centralized repository."
    >
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex flex-wrap gap-2">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <PlusCircleIcon className="h-4 w-4 mr-2" />
              New Material
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
                placeholder="Search materials..."
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
          <h3 className="font-medium text-gray-700">Material List</h3>
        </div>
        <DataTable columns={columns} data={materials} />
      </div>
    </MdmPageTemplate>
  );
} 