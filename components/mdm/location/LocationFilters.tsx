'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface LocationFiltersProps {
  filters: {
    type: string;
    status: string;
    search: string;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      type: string;
      status: string;
      search: string;
    }>
  >;
}

export default function LocationFilters({
  filters,
  setFilters,
}: LocationFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
      <div className="relative flex-1 sm:flex-none sm:w-64">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search locations..."
          value={filters.search}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, search: e.target.value }))
          }
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div className="flex gap-3 w-full sm:w-auto">
        <Select
          value={filters.type}
          onValueChange={(value) =>
            setFilters((prev) => ({ ...prev, type: value }))
          }
        >
          <SelectTrigger className="flex-1 sm:w-[140px]">
            <SelectValue placeholder="Location Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="internal">Internal</SelectItem>
            <SelectItem value="external">External</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.status}
          onValueChange={(value) =>
            setFilters((prev) => ({ ...prev, status: value }))
          }
        >
          <SelectTrigger className="flex-1 sm:w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
} 