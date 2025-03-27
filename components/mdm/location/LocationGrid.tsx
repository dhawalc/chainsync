'use client';

import { Location } from './LocationMaster';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pencil } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LocationGridProps {
  locations: Location[];
  onEdit: (location: Location) => void;
}

export default function LocationGrid({ locations, onEdit }: LocationGridProps) {
  return (
    <Card className="border rounded-lg shadow-sm overflow-hidden">
      <CardHeader className="py-3 px-4">
        <CardTitle className="text-base font-medium">Location List</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="w-[100px] font-medium">Location ID</TableHead>
              <TableHead className="font-medium">Name</TableHead>
              <TableHead className="font-medium">Type</TableHead>
              <TableHead className="font-medium">Address</TableHead>
              <TableHead className="font-medium">Timezone</TableHead>
              <TableHead className="font-medium">Status</TableHead>
              <TableHead className="w-[60px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {locations.map((location) => (
              <TableRow key={location.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{location.id}</TableCell>
                <TableCell>{location.name}</TableCell>
                <TableCell>{location.type}</TableCell>
                <TableCell className="max-w-[300px] truncate">{location.address}</TableCell>
                <TableCell>{location.timezone}</TableCell>
                <TableCell>
                  <Badge 
                    variant={location.status === 'active' ? 'default' : 'secondary'}
                    className={location.status === 'active' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-muted'}
                  >
                    {location.status.charAt(0).toUpperCase() + location.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(location)}
                    className="h-8 w-8 hover:bg-muted"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
} 