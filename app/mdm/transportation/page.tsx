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
  TruckIcon
} from '@heroicons/react/24/outline';
import { ColumnDef } from '@tanstack/react-table';

// Add interface for transportation lane data type
interface TransportationLane {
  id: string;
  fromLocation: string;
  toLocation: string;
  mode: string;
  distance: string;
  transitTime: string;
  cost: string;
  status: string;
}

// Update sample data with proper type
const transportationLanes: TransportationLane[] = [
  { id: 'TL1001', fromLocation: 'Main Plant (1000)', toLocation: 'Distribution Center East (1001)', mode: 'Truck', distance: '250 km', transitTime: '1 day', cost: '$500', status: 'Active' },
  { id: 'TL1002', fromLocation: 'Main Plant (1000)', toLocation: 'European Plant (1004)', mode: 'Air', distance: '6500 km', transitTime: '2 days', cost: '$3500', status: 'Active' },
  { id: 'TL1003', fromLocation: 'European Plant (1004)', toLocation: 'Distribution Center East (1001)', mode: 'Ship', distance: '7000 km', transitTime: '14 days', cost: '$1800', status: 'Active' },
  { id: 'TL1004', fromLocation: 'Distribution Center East (1001)', toLocation: 'Customer Zone A', mode: 'Truck', distance: '120 km', transitTime: '1 day', cost: '$250', status: 'Active' },
  { id: 'TL1005', fromLocation: 'Main Plant (1000)', toLocation: 'Customer Zone B', mode: 'Rail', distance: '450 km', transitTime: '2 days', cost: '$650', status: 'Inactive' },
];

// Update columns with proper type
const columns: ColumnDef<TransportationLane, unknown>[] = [
  { accessorKey: 'id', header: 'Lane ID' },
  { accessorKey: 'fromLocation', header: 'From Location' },
  { accessorKey: 'toLocation', header: 'To Location' },
  { accessorKey: 'mode', header: 'Transport Mode' },
  { accessorKey: 'distance', header: 'Distance' },
  { accessorKey: 'transitTime', header: 'Transit Time' },
  { accessorKey: 'cost', header: 'Standard Cost' },
  { accessorKey: 'status', header: 'Status' },
  { 
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" className="text-indigo-700 border-indigo-300 hover:bg-indigo-50">Edit</Button>
        <Button variant="outline" size="sm" className="text-indigo-700 border-indigo-300 hover:bg-indigo-50">View</Button>
        <Button variant="outline" size="sm" className="text-indigo-700 border-indigo-300 hover:bg-indigo-50">
          <TruckIcon className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];

export default function TransportationLanePage() {
  return (
    <MdmPageTemplate
      title="Transportation Lanes"
      description="Manage transportation lanes between locations. Define shipping methods, transit times, and costs for supply chain network design and planning."
      outboundApoEnabled={false}
    >
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex flex-wrap gap-2">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <PlusCircleIcon className="h-4 w-4 mr-2" />
              New Transportation Lane
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
                placeholder="Search transportation lanes..."
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
          <h3 className="font-medium text-gray-700">Transportation Lane List</h3>
        </div>
        <DataTable columns={columns} data={transportationLanes} />
      </div>
    </MdmPageTemplate>
  );
} 