'use client';

import { useState } from 'react';
import MdmPageTemplate from '@/app/mdm/components/MdmPageTemplate';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  PlusCircleIcon, 
  ArrowDownTrayIcon, 
  ArrowUpTrayIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SupplierQuota {
  id: string;
  materialId: string;
  materialName: string;
  category: string;
  suppliers: {
    name: string;
    allocation: number;
    performance: 'high' | 'medium' | 'low';
  }[];
  totalDemand: number;
  uom: string;
  lastUpdated: string;
  status: 'active' | 'draft' | 'inactive';
}

// Mock data
const quotas: SupplierQuota[] = [
  {
    id: 'QUOTA001',
    materialId: 'MAT001',
    materialName: 'Semiconductor Chips',
    category: 'Electronics',
    suppliers: [
      { name: 'Tech Components Ltd', allocation: 40, performance: 'high' },
      { name: 'Global Materials Inc', allocation: 35, performance: 'medium' },
      { name: 'Precision Parts Co', allocation: 25, performance: 'medium' }
    ],
    totalDemand: 100000,
    uom: 'PCS',
    lastUpdated: '2024-03-15',
    status: 'active'
  },
  {
    id: 'QUOTA002',
    materialId: 'MAT002',
    materialName: 'Steel Sheets',
    category: 'Raw Materials',
    suppliers: [
      { name: 'Global Materials Inc', allocation: 50, performance: 'high' },
      { name: 'Steel Corp', allocation: 50, performance: 'high' }
    ],
    totalDemand: 50000,
    uom: 'KG',
    lastUpdated: '2024-03-10',
    status: 'active'
  },
  {
    id: 'QUOTA003',
    materialId: 'MAT003',
    materialName: 'Circuit Boards',
    category: 'Electronics',
    suppliers: [
      { name: 'Tech Components Ltd', allocation: 60, performance: 'high' },
      { name: 'Electronics Pro', allocation: 40, performance: 'medium' }
    ],
    totalDemand: 75000,
    uom: 'PCS',
    lastUpdated: '2024-03-01',
    status: 'draft'
  },
  {
    id: 'QUOTA004',
    materialId: 'MAT004',
    materialName: 'Industrial Chemicals',
    category: 'Chemical',
    suppliers: [
      { name: 'Quality Chemicals', allocation: 45, performance: 'high' },
      { name: 'ChemCorp', allocation: 30, performance: 'medium' },
      { name: 'Chemical Solutions', allocation: 25, performance: 'low' }
    ],
    totalDemand: 25000,
    uom: 'L',
    lastUpdated: '2024-02-28',
    status: 'inactive'
  }
];

const columns: ColumnDef<SupplierQuota, unknown>[] = [
  { accessorKey: 'id', header: 'Quota ID' },
  { accessorKey: 'materialId', header: 'Material ID' },
  { accessorKey: 'materialName', header: 'Material Name' },
  { accessorKey: 'category', header: 'Category' },
  {
    accessorKey: 'suppliers',
    header: 'Supplier Splits',
    cell: ({ row }) => {
      const suppliers = row.getValue('suppliers') as SupplierQuota['suppliers'];
      return (
        <div className="space-y-1">
          {suppliers.map((supplier, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className="flex-1">{supplier.name}</span>
              <div className="flex items-center gap-2">
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      supplier.performance === 'high' ? 'bg-emerald-500' :
                      supplier.performance === 'medium' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${supplier.allocation}%` }}
                  />
                </div>
                <span className="w-8 text-right">{supplier.allocation}%</span>
              </div>
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: 'totalDemand',
    header: 'Total Demand',
    cell: ({ row }) => {
      const demand = row.getValue('totalDemand') as number;
      const uom = row.getValue('uom') as string;
      return `${demand.toLocaleString()} ${uom}`;
    },
  },
  { accessorKey: 'lastUpdated', header: 'Last Updated' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      const colors = {
        active: 'bg-emerald-500 hover:bg-emerald-600',
        draft: 'bg-yellow-500 hover:bg-yellow-600',
        inactive: 'bg-gray-500 hover:bg-gray-600'
      };
      return (
        <Badge 
          variant="default"
          className={colors[status as keyof typeof colors]}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
  },
];

export default function SupplierQuotaPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredData = quotas.filter(quota => {
    const matchesSearch = searchQuery === '' || 
      quota.materialName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quota.materialId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quota.suppliers.some(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = selectedStatus === 'all' || quota.status === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || quota.category === selectedCategory;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <MdmPageTemplate
      title="Supplier Quota Splits"
      description="Manage and optimize supplier quota allocations based on performance, capacity, and strategic objectives. Track and adjust material demand distribution across suppliers."
    >
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex flex-wrap gap-2">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <PlusCircleIcon className="h-4 w-4 mr-2" />
              New Quota Split
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
                placeholder="Search quotas..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full md:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select
              value={selectedStatus}
              onValueChange={setSelectedStatus}
            >
              <SelectTrigger className="w-full sm:w-[130px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full sm:w-[130px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Raw Materials">Raw Materials</SelectItem>
                <SelectItem value="Chemical">Chemical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h3 className="font-medium text-gray-700">Quota Split List</h3>
        </div>
        <DataTable columns={columns} data={filteredData} />
      </div>
    </MdmPageTemplate>
  );
} 