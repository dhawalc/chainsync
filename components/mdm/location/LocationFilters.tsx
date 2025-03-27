'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface LocationFiltersProps {
  onFilter: (filters: {
    search: string;
    type: string;
    status: string;
    locationType: string;
    supplier: string;
  }) => void;
}

export default function LocationFilters({ onFilter }: LocationFiltersProps) {
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    status: '',
    locationType: '',
    supplier: '',
  });

  const [activeStatus, setActiveStatus] = useState(true);
  const [inactiveStatus, setInactiveStatus] = useState(true);
  const [internalType, setInternalType] = useState(true);
  const [externalType, setExternalType] = useState(true);

  const handleChange = (field: string, value: string) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleStatusToggle = (status: 'active' | 'inactive') => {
    if (status === 'active') {
      setActiveStatus(!activeStatus);
    } else {
      setInactiveStatus(!inactiveStatus);
    }
    // Update filters based on selected statuses
    const selectedStatuses = [];
    if (status === 'active' ? !activeStatus : activeStatus) selectedStatuses.push('Active');
    if (status === 'inactive' ? !inactiveStatus : inactiveStatus) selectedStatuses.push('Inactive');
    handleChange('status', selectedStatuses.join(','));
  };

  const handleTypeToggle = (type: 'internal' | 'external') => {
    if (type === 'internal') {
      setInternalType(!internalType);
    } else {
      setExternalType(!externalType);
    }
    // Update filters based on selected types
    const selectedTypes = [];
    if (type === 'internal' ? !internalType : internalType) selectedTypes.push('Internal');
    if (type === 'external' ? !externalType : externalType) selectedTypes.push('External');
    handleChange('type', selectedTypes.join(','));
  };

  return (
    <div className="space-y-4">
      <div className="text-lg font-semibold">Filter</div>
      
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant={activeStatus ? "default" : "outline"}
            size="sm"
            onClick={() => handleStatusToggle('active')}
            className="min-w-24"
          >
            {activeStatus && <Check className="mr-2 h-4 w-4" />}
            Active
          </Button>
          <Button
            variant={inactiveStatus ? "default" : "outline"}
            size="sm"
            onClick={() => handleStatusToggle('inactive')}
            className="min-w-24"
          >
            {inactiveStatus && <Check className="mr-2 h-4 w-4" />}
            Inactive
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={internalType ? "default" : "outline"}
            size="sm"
            onClick={() => handleTypeToggle('internal')}
            className="min-w-24"
          >
            {internalType && <Check className="mr-2 h-4 w-4" />}
            Internal
          </Button>
          <Button
            variant={externalType ? "default" : "outline"}
            size="sm"
            onClick={() => handleTypeToggle('external')}
            className="min-w-24"
          >
            {externalType && <Check className="mr-2 h-4 w-4" />}
            External
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Label htmlFor="locationType">Type:</Label>
          <Select
            value={filters.locationType}
            onValueChange={(value) => handleChange('locationType', value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Multiple" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="warehouse">Warehouse</SelectItem>
              <SelectItem value="store">Store</SelectItem>
              <SelectItem value="office">Office</SelectItem>
              <SelectItem value="distribution">Distribution Center</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Label htmlFor="supplier">Supplier:</Label>
          <Select
            value={filters.supplier}
            onValueChange={(value) => handleChange('supplier', value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Multiple" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="supplier1">Supplier 1</SelectItem>
              <SelectItem value="supplier2">Supplier 2</SelectItem>
              <SelectItem value="supplier3">Supplier 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
} 