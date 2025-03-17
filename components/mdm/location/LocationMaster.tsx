'use client';

import { useState } from 'react';
import MdmPageTemplate from '@/components/MdmPageTemplate';
import LocationMap from './LocationMap';
import LocationGrid from './LocationGrid';
import LocationFilters from './LocationFilters';
import { LocationModal } from './LocationModal';
import { Button } from '@/components/ui/button';
import {
  PlusIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  FunnelIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';

// Mock data for locations
const mockLocations = [
  {
    id: 'LOC001',
    name: 'Main Manufacturing Plant',
    type: 'internal',
    address: '123 Industrial Ave, Detroit, MI 48201, USA',
    latitude: 42.3314,
    longitude: -83.0458,
    timezone: 'America/Detroit',
    status: 'active',
    createdAt: '2024-01-01',
    updatedAt: '2024-03-14',
  },
  {
    id: 'LOC002',
    name: 'West Coast Distribution',
    type: 'internal',
    address: '456 Harbor Blvd, Los Angeles, CA 90012, USA',
    latitude: 34.0522,
    longitude: -118.2437,
    timezone: 'America/Los_Angeles',
    status: 'active',
    createdAt: '2024-01-02',
    updatedAt: '2024-03-14',
  },
  {
    id: 'LOC003',
    name: 'European Supplier Hub',
    type: 'external',
    address: 'Industriestraße 1, 80339 München, Germany',
    latitude: 48.1351,
    longitude: 11.5820,
    timezone: 'Europe/Berlin',
    status: 'active',
    createdAt: '2024-01-03',
    updatedAt: '2024-03-14',
  },
  {
    id: 'LOC004',
    name: 'Asian Manufacturing Center',
    type: 'internal',
    address: '789 Innovation Road, Singapore 637123',
    latitude: 1.3521,
    longitude: 103.8198,
    timezone: 'Asia/Singapore',
    status: 'active',
    createdAt: '2024-01-04',
    updatedAt: '2024-03-14',
  },
  {
    id: 'LOC005',
    name: 'South American Distribution',
    type: 'internal',
    address: 'Av. das Nações Unidas, 14171 São Paulo, Brazil',
    latitude: -23.5505,
    longitude: -46.6333,
    timezone: 'America/Sao_Paulo',
    status: 'active',
    createdAt: '2024-01-05',
    updatedAt: '2024-03-14',
  },
  {
    id: 'LOC006',
    name: 'Australian Warehouse',
    type: 'internal',
    address: '101 Collins Street, Melbourne VIC 3000, Australia',
    latitude: -37.8136,
    longitude: 144.9631,
    timezone: 'Australia/Melbourne',
    status: 'active',
    createdAt: '2024-01-06',
    updatedAt: '2024-03-14',
  },
  {
    id: 'LOC007',
    name: 'Japanese Supplier Facility',
    type: 'external',
    address: '2-chōme-3-1 Marunouchi, Chiyoda City, Tokyo 100-0005, Japan',
    latitude: 35.6762,
    longitude: 139.6503,
    timezone: 'Asia/Tokyo',
    status: 'active',
    createdAt: '2024-01-07',
    updatedAt: '2024-03-14',
  },
  {
    id: 'LOC008',
    name: 'UK Distribution Center',
    type: 'internal',
    address: '1 Canada Square, London E14 5AB, United Kingdom',
    latitude: 51.5049,
    longitude: -0.0964,
    timezone: 'Europe/London',
    status: 'active',
    createdAt: '2024-01-08',
    updatedAt: '2024-03-14',
  },
  {
    id: 'LOC009',
    name: 'Mexican Production Plant',
    type: 'internal',
    address: 'Av. Industria Automotriz 101, Toluca 50071, Mexico',
    latitude: 19.2826,
    longitude: -99.6557,
    timezone: 'America/Mexico_City',
    status: 'active',
    createdAt: '2024-01-09',
    updatedAt: '2024-03-14',
  },
  {
    id: 'LOC010',
    name: 'Indian Tech Center',
    type: 'external',
    address: 'Outer Ring Road, Bangalore, Karnataka 560103, India',
    latitude: 12.9716,
    longitude: 77.5946,
    timezone: 'Asia/Kolkata',
    status: 'active',
    createdAt: '2024-01-10',
    updatedAt: '2024-03-14',
  },
];

export type Location = {
  id: string;
  name: string;
  type: 'internal' | 'external';
  address: string;
  latitude: number;
  longitude: number;
  timezone: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
};

export default function LocationMaster() {
  const [locations, setLocations] = useState<Location[]>(mockLocations);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    search: '',
  });

  const handleAddLocation = (newLocation: Location) => {
    setLocations([...locations, newLocation]);
    setIsModalOpen(false);
  };

  const handleEditLocation = (updatedLocation: Location) => {
    setLocations(
      locations.map((loc) =>
        loc.id === updatedLocation.id ? updatedLocation : loc
      )
    );
    setIsModalOpen(false);
    setSelectedLocation(null);
  };

  const handleEdit = (location: Location) => {
    setSelectedLocation(location);
    setIsModalOpen(true);
  };

  const filteredLocations = locations.filter((location) => {
    if (filters.type !== 'all' && location.type !== filters.type) return false;
    if (filters.status !== 'all' && location.status !== filters.status)
      return false;
    if (
      filters.search &&
      !location.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      !location.id.toLowerCase().includes(filters.search.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <MdmPageTemplate
      title="Location Master"
      description="Manage and monitor your global network of internal and external locations. View geographical distribution, access detailed information, and maintain location data."
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 sm:space-y-6">
          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                New Location
              </Button>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="flex-1 sm:flex-none text-indigo-700 border-indigo-300 hover:bg-indigo-50"
                >
                  <ArrowUpTrayIcon className="h-4 w-4 mr-2" />
                  Import
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 sm:flex-none text-indigo-700 border-indigo-300 hover:bg-indigo-50"
                >
                  <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 sm:flex-none text-indigo-700 border-indigo-300 hover:bg-indigo-50"
                >
                  <ArrowPathIcon className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>

            <LocationFilters filters={filters} setFilters={setFilters} />
          </div>

          {/* Map View */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h3 className="font-medium text-gray-700">Location Map</h3>
            </div>
            <div className="h-[300px] sm:h-[400px] lg:h-[500px]">
              <LocationMap locations={filteredLocations} onEdit={handleEdit} />
            </div>
          </div>

          {/* Grid View */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h3 className="font-medium text-gray-700">Location List</h3>
            </div>
            <div className="overflow-x-auto">
              <LocationGrid locations={filteredLocations} onEdit={handleEdit} />
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <LocationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedLocation(null);
        }}
        onSave={selectedLocation ? handleEditLocation : handleAddLocation}
        location={selectedLocation}
      />
    </MdmPageTemplate>
  );
} 