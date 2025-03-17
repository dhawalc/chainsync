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
  CalendarIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { ColumnDef } from '@tanstack/react-table';

// Add interface for data type
interface Calendar {
  id: string;
  name: string;
  type: string;
  year: string;
  workingDays: number;
  holidays: number;
  status: string;
}

// Update sample data with proper type
const calendars: Calendar[] = [
  { id: 'CAL1001', name: 'Standard Factory Calendar', type: 'Factory', year: '2023', workingDays: 251, holidays: 10, status: 'Active' },
  { id: 'CAL1002', name: 'US Plant Calendar', type: 'Factory', year: '2023', workingDays: 249, holidays: 12, status: 'Active' },
  { id: 'CAL1003', name: 'European Plant Calendar', type: 'Factory', year: '2023', workingDays: 245, holidays: 15, status: 'Active' },
  { id: 'CAL1004', name: 'Assembly Line 1 Shifts', type: 'Resource', year: '2023', workingDays: 251, holidays: 10, status: 'Active' },
  { id: 'CAL1005', name: 'Maintenance Schedule', type: 'Maintenance', year: '2023', workingDays: 52, holidays: 0, status: 'Active' },
];

// Update columns with proper type
const columns: ColumnDef<Calendar, unknown>[] = [
  { accessorKey: 'id', header: 'Calendar ID' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'type', header: 'Type' },
  { accessorKey: 'year', header: 'Year' },
  { accessorKey: 'workingDays', header: 'Working Days' },
  { accessorKey: 'holidays', header: 'Holidays' },
  { accessorKey: 'status', header: 'Status' },
  { 
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" className="text-indigo-700 border-indigo-300 hover:bg-indigo-50">Edit</Button>
        <Button variant="outline" size="sm" className="text-indigo-700 border-indigo-300 hover:bg-indigo-50">
          <EyeIcon className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" className="text-indigo-700 border-indigo-300 hover:bg-indigo-50">
          <CalendarIcon className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];

export default function CalendarPage() {
  const [selectedYear, setSelectedYear] = useState('2023');
  
  return (
    <MdmPageTemplate
      title="Calendars"
      description="Manage factory, shift, and resource calendars. Define working days, holidays, and shifts for planning and scheduling purposes."
    >
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex flex-wrap gap-2">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <PlusCircleIcon className="h-4 w-4 mr-2" />
              New Calendar
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
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search calendars..."
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
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h3 className="font-medium text-gray-700">Calendar List</h3>
          <div className="text-sm text-gray-500">Showing calendars for {selectedYear}</div>
        </div>
        <DataTable columns={columns} data={calendars} />
      </div>
    </MdmPageTemplate>
  );
} 