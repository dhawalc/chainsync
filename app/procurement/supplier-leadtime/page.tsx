'use client';

import { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  PlusCircleIcon, 
  ArrowDownTrayIcon, 
  ArrowUpTrayIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

interface SupplierLeadTime {
  id: string;
  supplierName: string;
  materialId: string;
  materialName: string;
  standardLeadTime: number;
  minLeadTime: number;
  maxLeadTime: number;
  lastUpdated: string;
  uom: string;
}

const mockData: SupplierLeadTime[] = [
  {
    id: '1',
    supplierName: 'ABC Electronics',
    materialId: 'MAT001',
    materialName: 'Semiconductor Chip',
    standardLeadTime: 14,
    minLeadTime: 10,
    maxLeadTime: 21,
    lastUpdated: '2024-03-15',
    uom: 'days'
  },
  {
    id: '2',
    supplierName: 'Global Components',
    materialId: 'MAT002',
    materialName: 'Circuit Board',
    standardLeadTime: 21,
    minLeadTime: 15,
    maxLeadTime: 30,
    lastUpdated: '2024-03-14',
    uom: 'days'
  },
  {
    id: '3',
    supplierName: 'Tech Solutions',
    materialId: 'MAT003',
    materialName: 'Power Supply Unit',
    standardLeadTime: 30,
    minLeadTime: 25,
    maxLeadTime: 45,
    lastUpdated: '2024-03-13',
    uom: 'days'
  },
  {
    id: '4',
    supplierName: 'Precision Parts',
    materialId: 'MAT004',
    materialName: 'Metal Enclosure',
    standardLeadTime: 7,
    minLeadTime: 5,
    maxLeadTime: 10,
    lastUpdated: '2024-03-12',
    uom: 'days'
  },
  {
    id: '5',
    supplierName: 'Quality Materials',
    materialId: 'MAT005',
    materialName: 'Cooling Fan',
    standardLeadTime: 10,
    minLeadTime: 7,
    maxLeadTime: 14,
    lastUpdated: '2024-03-11',
    uom: 'days'
  }
];

const columns: ColumnDef<SupplierLeadTime, unknown>[] = [
  {
    accessorKey: 'supplierName',
    header: 'Supplier Name'
  },
  {
    accessorKey: 'materialId',
    header: 'Material ID'
  },
  {
    accessorKey: 'materialName',
    header: 'Material Name'
  },
  {
    accessorKey: 'standardLeadTime',
    header: 'Standard Lead Time',
    cell: ({ row }) => (
      <div>{row.original.standardLeadTime} {row.original.uom}</div>
    )
  },
  {
    accessorKey: 'minLeadTime',
    header: 'Min Lead Time',
    cell: ({ row }) => (
      <div>{row.original.minLeadTime} {row.original.uom}</div>
    )
  },
  {
    accessorKey: 'maxLeadTime',
    header: 'Max Lead Time',
    cell: ({ row }) => (
      <div>{row.original.maxLeadTime} {row.original.uom}</div>
    )
  },
  {
    accessorKey: 'lastUpdated',
    header: 'Last Updated'
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" className="text-indigo-700 border-indigo-300 hover:bg-indigo-50">Edit</Button>
        <Button variant="outline" size="sm" className="text-indigo-700 border-indigo-300 hover:bg-indigo-50">View</Button>
      </div>
    ),
  }
];

export default function SupplierLeadTimePage() {
  const [filters, setFilters] = useState({
    search: '',
    supplier: 'all'
  });

  const filteredData = mockData.filter(item => {
    const matchesSearch = 
      item.supplierName.toLowerCase().includes(filters.search.toLowerCase()) ||
      item.materialId.toLowerCase().includes(filters.search.toLowerCase()) ||
      item.materialName.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesSupplier = filters.supplier === 'all' || item.supplierName === filters.supplier;
    
    return matchesSearch && matchesSupplier;
  });

  const uniqueSuppliers = Array.from(new Set(mockData.map(item => item.supplierName)));

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page header */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h1 className="text-3xl font-bold text-indigo-900 mb-3">Supplier Lead Time</h1>
          <p className="text-gray-700 max-w-3xl">
            Manage and track supplier lead times for materials. Monitor standard, minimum, and maximum lead times for effective planning.
          </p>
          
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="bg-indigo-50 p-4 rounded-md border border-indigo-100 flex-1 min-w-[200px]">
              <h3 className="text-indigo-800 font-medium mb-1">Total Records</h3>
              <p className="text-3xl font-bold text-indigo-900">{mockData.length}</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-md border border-emerald-100 flex-1 min-w-[200px]">
              <h3 className="text-emerald-800 font-medium mb-1">Average Lead Time</h3>
              <p className="text-3xl font-bold text-emerald-700">
                {Math.round(mockData.reduce((acc, curr) => acc + curr.standardLeadTime, 0) / mockData.length)} days
              </p>
            </div>
            <div className="bg-amber-50 p-4 rounded-md border border-amber-100 flex-1 min-w-[200px]">
              <h3 className="text-amber-800 font-medium mb-1">Suppliers</h3>
              <p className="text-3xl font-bold text-amber-700">{uniqueSuppliers.length}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-md border border-blue-100 flex-1 min-w-[200px]">
              <h3 className="text-blue-800 font-medium mb-1">Last Updated</h3>
              <p className="text-lg font-medium text-blue-700">Today, 09:45 AM</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div className="flex flex-wrap gap-2">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                <PlusCircleIcon className="h-4 w-4 mr-2" />
                New Lead Time
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

            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search lead times..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full md:w-64"
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
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
            <h3 className="font-medium text-gray-700">Lead Time List</h3>
          </div>
          <DataTable columns={columns} data={filteredData} />
        </div>
      </div>
    </div>
  );
} 