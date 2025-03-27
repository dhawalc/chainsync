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

interface SupplierQualification {
  id: string;
  supplierName: string;
  category: string;
  qualificationStatus: 'qualified' | 'pending' | 'disqualified';
  lastAuditDate: string;
  nextAuditDate: string;
  qualityScore: number;
  complianceScore: number;
  certifications: string[];
}

// Mock data
const qualifications: SupplierQualification[] = [
  {
    id: 'QUAL001',
    supplierName: 'Tech Components Ltd',
    category: 'Electronics',
    qualificationStatus: 'qualified',
    lastAuditDate: '2024-01-15',
    nextAuditDate: '2024-07-15',
    qualityScore: 92,
    complianceScore: 95,
    certifications: ['ISO 9001', 'ISO 14001']
  },
  {
    id: 'QUAL002',
    supplierName: 'Global Materials Inc',
    category: 'Raw Materials',
    qualificationStatus: 'pending',
    lastAuditDate: '2024-02-20',
    nextAuditDate: '2024-05-20',
    qualityScore: 85,
    complianceScore: 88,
    certifications: ['ISO 9001']
  },
  {
    id: 'QUAL003',
    supplierName: 'Precision Parts Co',
    category: 'Mechanical',
    qualificationStatus: 'disqualified',
    lastAuditDate: '2023-12-10',
    nextAuditDate: '2024-06-10',
    qualityScore: 65,
    complianceScore: 70,
    certifications: []
  },
  {
    id: 'QUAL004',
    supplierName: 'Quality Chemicals',
    category: 'Chemical',
    qualificationStatus: 'qualified',
    lastAuditDate: '2024-03-01',
    nextAuditDate: '2024-09-01',
    qualityScore: 95,
    complianceScore: 98,
    certifications: ['ISO 9001', 'ISO 14001', 'ISO 45001']
  },
  {
    id: 'QUAL005',
    supplierName: 'Smart Solutions',
    category: 'Software',
    qualificationStatus: 'pending',
    lastAuditDate: '2024-02-28',
    nextAuditDate: '2024-05-28',
    qualityScore: 88,
    complianceScore: 85,
    certifications: ['ISO 27001']
  }
];

const columns: ColumnDef<SupplierQualification, unknown>[] = [
  { accessorKey: 'id', header: 'Qualification ID' },
  { accessorKey: 'supplierName', header: 'Supplier Name' },
  { accessorKey: 'category', header: 'Category' },
  {
    accessorKey: 'qualificationStatus',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('qualificationStatus') as string;
      const colors = {
        qualified: 'bg-emerald-500 hover:bg-emerald-600',
        pending: 'bg-yellow-500 hover:bg-yellow-600',
        disqualified: 'bg-red-500 hover:bg-red-600'
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
  { accessorKey: 'lastAuditDate', header: 'Last Audit' },
  { accessorKey: 'nextAuditDate', header: 'Next Audit' },
  {
    accessorKey: 'qualityScore',
    header: 'Quality Score',
    cell: ({ row }) => {
      const score = row.getValue('qualityScore') as number;
      return (
        <div className="flex items-center">
          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${score}%` }}
            />
          </div>
          <span>{score}%</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'complianceScore',
    header: 'Compliance Score',
    cell: ({ row }) => {
      const score = row.getValue('complianceScore') as number;
      return (
        <div className="flex items-center">
          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full" 
              style={{ width: `${score}%` }}
            />
          </div>
          <span>{score}%</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'certifications',
    header: 'Certifications',
    cell: ({ row }) => {
      const certs = row.getValue('certifications') as string[];
      return (
        <div className="flex flex-wrap gap-1">
          {certs.map((cert) => (
            <Badge key={cert} variant="outline" className="text-xs">
              {cert}
            </Badge>
          ))}
        </div>
      );
    },
  },
];

export default function SupplierQualificationPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredData = qualifications.filter(qual => {
    const matchesSearch = searchQuery === '' || 
      qual.supplierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      qual.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || qual.qualificationStatus === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || qual.category === selectedCategory;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <MdmPageTemplate
      title="Supplier Qualification"
      description="Manage and track supplier qualifications, audit schedules, and compliance scores. Monitor certification status and maintain qualification records."
    >
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex flex-wrap gap-2">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <PlusCircleIcon className="h-4 w-4 mr-2" />
              New Qualification
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
                placeholder="Search qualifications..."
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
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="disqualified">Disqualified</SelectItem>
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
                <SelectItem value="Mechanical">Mechanical</SelectItem>
                <SelectItem value="Chemical">Chemical</SelectItem>
                <SelectItem value="Software">Software</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h3 className="font-medium text-gray-700">Qualification List</h3>
        </div>
        <DataTable columns={columns} data={filteredData} />
      </div>
    </MdmPageTemplate>
  );
} 