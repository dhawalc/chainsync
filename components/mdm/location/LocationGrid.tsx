'use client';

import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { PencilIcon } from '@heroicons/react/24/outline';
import type { Location } from './LocationMaster';

interface LocationGridProps {
  locations: Location[];
  onEdit: (location: Location) => void;
}

export default function LocationGrid({ locations, onEdit }: LocationGridProps) {
  const columns = [
    {
      accessorKey: 'id',
      header: 'Location ID',
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue('id')}</div>
      ),
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate" title={row.getValue('name')}>
          {row.getValue('name')}
        </div>
      ),
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('type')}</div>
      ),
    },
    {
      accessorKey: 'address',
      header: 'Address',
      cell: ({ row }) => (
        <div
          className="max-w-[250px] truncate"
          title={row.getValue('address')}
        >
          {row.getValue('address')}
        </div>
      ),
    },
    {
      accessorKey: 'timezone',
      header: 'Timezone',
      cell: ({ row }) => (
        <div className="hidden md:block">{row.getValue('timezone')}</div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <div
          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            row.getValue('status') === 'active'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {row.getValue('status')}
        </div>
      ),
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(row.original)}
            className="h-8 w-8 p-0"
          >
            <PencilIcon className="h-4 w-4 text-indigo-600" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-w-full">
      <DataTable columns={columns} data={locations} />
    </div>
  );
} 