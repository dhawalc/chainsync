'use client';

import { useState, Suspense } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusIcon, PencilIcon } from '@heroicons/react/24/outline';
import dynamic from 'next/dynamic';
import LocationModal from '@/components/location/LocationModal';
import { Location } from '@/types/location';

// Import map component dynamically to avoid SSR issues
const LocationMap = dynamic(
  () => import('@/components/location/LocationMap'),
  { ssr: false }
);

export default function LocationMaster() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [filters, setFilters] = useState({
    active: true,
    inactive: false,
    internal: true,
    external: true,
    type: 'all',
    supplier: 'all'
  });

  // Demo data with multiple locations
  const locations: Location[] = [
    {
      id: '1001',
      name: 'Acme HQ',
      type: 'Office',
      description: 'Acme Headquarters',
      address: '123 Main St',
      city: 'San Jose',
      state: 'CA',
      country: 'US',
      postal_code: '95112',
      latitude: 37.3382,
      longitude: -121.8863,
      timezone: 'America/Los_Angeles',
      isInternal: true,
      isActive: true,
      created_at: '2024-01-01',
      updated_at: '2024-01-01'
    },
    {
      id: '1002',
      name: 'Irvine',
      type: 'Mfg',
      description: 'Irvine Manufacturing',
      address: '456 Tech Drive',
      city: 'Irvine',
      state: 'CA',
      country: 'US',
      postal_code: '92618',
      latitude: 33.6846,
      longitude: -117.8265,
      timezone: 'America/Los_Angeles',
      isInternal: true,
      isActive: true,
      created_at: '2024-01-02',
      updated_at: '2024-01-02'
    },
    {
      id: '3001',
      name: 'Sanmina Thailand',
      type: 'Mfg',
      description: 'Sanmina Thailand',
      address: '789 Industrial Park',
      city: 'xyz',
      state: 'Bangkok',
      country: 'Thailand',
      postal_code: '10120',
      latitude: 13.7563,
      longitude: 100.5018,
      timezone: 'Asia/Bangkok',
      supplier: 'Sanmina',
      isInternal: false,
      isActive: true,
      created_at: '2024-01-03',
      updated_at: '2024-01-03'
    },
    {
      id: '2001',
      name: 'Celestica MX',
      type: 'Mfg',
      description: 'Celestica Mexico',
      address: '321 Mfg Blvd',
      city: 'Monterrey',
      state: 'NL',
      country: 'Mexico',
      postal_code: '64000',
      latitude: 25.6866,
      longitude: -100.3161,
      timezone: 'America/Monterrey',
      supplier: 'Celestica',
      isInternal: false,
      isActive: true,
      created_at: '2024-01-04',
      updated_at: '2024-01-04'
    }
  ];

  const handleAddLocation = () => {
    setSelectedLocation(null);
    setIsModalOpen(true);
  };

  const handleEditLocation = (location: Location) => {
    setSelectedLocation(location);
    setIsModalOpen(true);
  };

  // Filter locations based on current filters
  const filteredLocations = locations.filter(location => {
    if (location.isActive && !filters.active) return false;
    if (!location.isActive && !filters.inactive) return false;
    if (location.isInternal && !filters.internal) return false;
    if (!location.isInternal && !filters.external) return false;
    if (filters.type !== 'all' && location.type !== filters.type) return false;
    if (filters.supplier !== 'all' && location.supplier !== filters.supplier) return false;
    return true;
  });

  // Get unique types and suppliers for filter dropdowns
  const types = Array.from(new Set(locations.map(l => l.type)));
  const suppliers = Array.from(new Set(locations.map(l => l.supplier).filter((s): s is string => !!s)));

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Locations</h1>
        <Button onClick={handleAddLocation}>
          <PlusIcon className="h-5 w-5 mr-1" />
          Add Location
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="active"
                checked={filters.active}
                onCheckedChange={(checked) => 
                  setFilters(prev => ({ ...prev, active: checked as boolean }))
                }
              />
              <label htmlFor="active">Active</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="inactive"
                checked={filters.inactive}
                onCheckedChange={(checked) => 
                  setFilters(prev => ({ ...prev, inactive: checked as boolean }))
                }
              />
              <label htmlFor="inactive">Inactive</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="internal"
                checked={filters.internal}
                onCheckedChange={(checked) => 
                  setFilters(prev => ({ ...prev, internal: checked as boolean }))
                }
              />
              <label htmlFor="internal">Internal</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="external"
                checked={filters.external}
                onCheckedChange={(checked) => 
                  setFilters(prev => ({ ...prev, external: checked as boolean }))
                }
              />
              <label htmlFor="external">External</label>
            </div>
            <Select
              value={filters.type}
              onValueChange={(value) => 
                setFilters(prev => ({ ...prev, type: value }))
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {types.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={filters.supplier}
              onValueChange={(value) => 
                setFilters(prev => ({ ...prev, supplier: value }))
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Supplier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Suppliers</SelectItem>
                {suppliers.map(supplier => (
                  <SelectItem key={supplier} value={supplier}>{supplier}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Map */}
      <Card>
        <CardContent className="p-4">
          <Suspense fallback={
            <div className="h-[400px] w-full flex items-center justify-center bg-gray-100">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
            </div>
          }>
            <LocationMap locations={filteredLocations} />
          </Suspense>
        </CardContent>
      </Card>

      {/* Grid */}
      <Card>
        <CardContent className="p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLocations.map((location) => (
                  <tr key={location.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{location.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{location.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{location.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{location.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{location.city}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{location.country}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{location.supplier || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {location.isActive ? 'Yes' : 'No'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditLocation(location)}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <LocationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        location={selectedLocation}
      />
    </div>
  );
} 