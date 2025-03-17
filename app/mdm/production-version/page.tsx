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
  CalendarIcon
} from '@heroicons/react/24/outline';
import { ColumnDef } from '@tanstack/react-table';

// Add interface for data type
interface ProductionVersion {
  id: string;
  material: string;
  plant: string;
  bom: string;
  routing: string;
  validFrom: string;
  validTo: string;
  status: string;
}

// Update sample data with proper type
const productionVersions: ProductionVersion[] = [
  { id: 'PV1001', material: 'Final Product X', plant: '1000', bom: 'BOM1001', routing: 'R1001', validFrom: '2023-01-01', validTo: '2099-12-31', status: 'Active' },
  { id: 'PV1002', material: 'Final Product Y', plant: '1000', bom: 'BOM1004', routing: 'R1004', validFrom: '2023-01-01', validTo: '2099-12-31', status: 'Active' },
  { id: 'PV1003', material: 'Final Product Z', plant: '1004', bom: 'BOM1005', routing: 'R1005', validFrom: '2023-06-01', validTo: '2099-12-31', status: 'In Development' },
  { id: 'PV1004', material: 'Final Product X', plant: '1000', bom: 'BOM1001', routing: 'R1001', validFrom: '2022-01-01', validTo: '2022-12-31', status: 'Obsolete' },
  { id: 'PV1005', material: 'Subassembly A', plant: '1000', bom: 'BOM1002', routing: 'R1002', validFrom: '2023-01-01', validTo: '2099-12-31', status: 'Active' },
];

// Update columns with proper type
const columns: ColumnDef<ProductionVersion, unknown>[] = [
  { accessorKey: 'id', header: 'Version ID' },
  { accessorKey: 'material', header: 'Material' },
  { accessorKey: 'plant', header: 'Plant' },
  { accessorKey: 'bom', header: 'BOM' },
  { accessorKey: 'routing', header: 'Routing' },
  { accessorKey: 'validFrom', header: 'Valid From' },
  { accessorKey: 'validTo', header: 'Valid To' },
  { accessorKey: 'status', header: 'Status' },
  { 
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" className="text-indigo-700 border-indigo-300 hover:bg-indigo-50">Edit</Button>
        <Button variant="outline" size="sm" className="text-indigo-700 border-indigo-300 hover:bg-indigo-50">View</Button>
        <Button variant="outline" size="sm" className="text-indigo-700 border-indigo-300 hover:bg-indigo-50">
          <CalendarIcon className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];

export default function ProductionVersionPage() {
  return (
    <MdmPageTemplate
      title="Production Version"
      description="Manage production versions that link materials, BOMs, and routings for specific plants and time periods. Define how products are manufactured at different locations."
    >
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex flex-wrap gap-2">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <PlusCircleIcon className="h-4 w-4 mr-2" />
              New Production Version
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
                placeholder="Search production versions..."
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
          <h3 className="font-medium text-gray-700">Production Version List</h3>
        </div>
        <DataTable columns={columns} data={productionVersions} />
      </div>
    </MdmPageTemplate>
  );
} 