import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { PencilIcon } from '@heroicons/react/24/outline';
import { Location } from '@/types/location';

interface LocationTableProps {
  locations: Location[];
  onEdit: (location: Location) => void;
}

export default function LocationTable({ locations, onEdit }: LocationTableProps) {
  return (
    <div className="relative overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Location ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Timezone</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {locations.map((location) => (
            <TableRow key={location.id}>
              <TableCell className="font-medium">{location.id}</TableCell>
              <TableCell>{location.name}</TableCell>
              <TableCell>{location.address}</TableCell>
              <TableCell>{location.city}</TableCell>
              <TableCell>{location.country}</TableCell>
              <TableCell>{location.timezone}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(location)}
                  className="hover:bg-gray-100"
                >
                  <PencilIcon className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 