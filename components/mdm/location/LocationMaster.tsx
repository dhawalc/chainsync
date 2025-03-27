'use client';

import { useState, useEffect } from 'react';
import LocationGrid from './LocationGrid';
import LocationMap from './LocationMap';
import LocationModal from './LocationModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Download, Upload, RotateCw, Search } from 'lucide-react';

export interface Location {
  id: string;
  name: string;
  type: 'Internal' | 'External';
  address: string;
  timezone: string;
  status: 'active' | 'inactive';
  latitude: number;
  longitude: number;
}

// Mock data with 20 locations
const mockLocations: Location[] = [
  {
    id: 'LOC001',
    name: 'Main Manufacturing Plant',
    type: 'Internal',
    address: '123 Industrial Ave, Detroit, MI 48201',
    timezone: 'America/Detroit',
    status: 'active',
    latitude: 42.3314,
    longitude: -83.0458
  },
  {
    id: 'LOC002',
    name: 'West Coast Distribution',
    type: 'Internal',
    address: '456 Harbor Blvd, Los Angeles, CA',
    timezone: 'America/Los_Angeles',
    status: 'active',
    latitude: 34.0522,
    longitude: -118.2437
  },
  {
    id: 'LOC003',
    name: 'European Supplier Hub',
    type: 'External',
    address: 'Industriestraße 1, 80339 München',
    timezone: 'Europe/Berlin',
    status: 'inactive',
    latitude: 48.1351,
    longitude: 11.5820
  },
  {
    id: 'LOC004',
    name: 'Asian Manufacturing Center',
    type: 'Internal',
    address: '789 Innovation Road, Singapore 63',
    timezone: 'Asia/Singapore',
    status: 'active',
    latitude: 1.3521,
    longitude: 103.8198
  },
  {
    id: 'LOC005',
    name: 'South American Distribution',
    type: 'Internal',
    address: 'Av. das Nações Unidas, 14171 São P',
    timezone: 'America/Sao_Paulo',
    status: 'active',
    latitude: -23.5505,
    longitude: -46.6333
  },
  {
    id: 'LOC006',
    name: 'Australian Warehouse',
    type: 'Internal',
    address: '101 Collins Street, Melbourne VIC 3',
    timezone: 'Australia/Melbourne',
    status: 'inactive',
    latitude: -37.8136,
    longitude: 144.9631
  },
  {
    id: 'LOC007',
    name: 'Japanese Supplier Facility',
    type: 'External',
    address: '2-chōme-3-1 Marunouchi, Chiyoda',
    timezone: 'Asia/Tokyo',
    status: 'active',
    latitude: 35.6762,
    longitude: 139.6503
  },
  {
    id: 'LOC008',
    name: 'Mexico City Distribution',
    type: 'Internal',
    address: 'Av. Paseo de la Reforma 222, CDMX',
    timezone: 'America/Mexico_City',
    status: 'active',
    latitude: 19.4326,
    longitude: -99.1332
  },
  {
    id: 'LOC009',
    name: 'UK Operations Center',
    type: 'Internal',
    address: '1 Canada Square, London E14 5AB',
    timezone: 'Europe/London',
    status: 'active',
    latitude: 51.5049,
    longitude: -0.0164
  },
  {
    id: 'LOC010',
    name: 'Dubai Logistics Hub',
    type: 'External',
    address: 'Dubai Logistics City, UAE',
    timezone: 'Asia/Dubai',
    status: 'inactive',
    latitude: 25.0657,
    longitude: 55.1713
  },
  {
    id: 'LOC011',
    name: 'Toronto Distribution Center',
    type: 'Internal',
    address: '40 Bay Street, Toronto, ON',
    timezone: 'America/Toronto',
    status: 'active',
    latitude: 43.6435,
    longitude: -79.3791
  },
  {
    id: 'LOC012',
    name: 'Seoul Tech Center',
    type: 'External',
    address: '29 Eulji-ro, Jung-gu, Seoul',
    timezone: 'Asia/Seoul',
    status: 'active',
    latitude: 37.5665,
    longitude: 126.9780
  },
  {
    id: 'LOC013',
    name: 'Mumbai Supply Hub',
    type: 'External',
    address: 'Bandra Kurla Complex, Mumbai',
    timezone: 'Asia/Kolkata',
    status: 'inactive',
    latitude: 19.0607,
    longitude: 72.8362
  },
  {
    id: 'LOC014',
    name: 'São Paulo Tech Center',
    type: 'Internal',
    address: 'Av. Brigadeiro Faria Lima 3477',
    timezone: 'America/Sao_Paulo',
    status: 'active',
    latitude: -23.5868,
    longitude: -46.6826
  },
  {
    id: 'LOC015',
    name: 'Amsterdam Distribution',
    type: 'Internal',
    address: 'Johan Huizingalaan 763a',
    timezone: 'Europe/Amsterdam',
    status: 'active',
    latitude: 52.3676,
    longitude: 4.9041
  },
  {
    id: 'LOC016',
    name: 'Shanghai Supplier Center',
    type: 'External',
    address: '501 Middle Yincheng Road',
    timezone: 'Asia/Shanghai',
    status: 'active',
    latitude: 31.2304,
    longitude: 121.4737
  },
  {
    id: 'LOC017',
    name: 'Vancouver Warehouse',
    type: 'Internal',
    address: '555 W Hastings St, Vancouver',
    timezone: 'America/Vancouver',
    status: 'inactive',
    latitude: 49.2827,
    longitude: -123.1207
  },
  {
    id: 'LOC018',
    name: 'Stockholm Innovation Hub',
    type: 'External',
    address: 'Klarabergsviadukten 70',
    timezone: 'Europe/Stockholm',
    status: 'active',
    latitude: 59.3293,
    longitude: 18.0686
  },
  {
    id: 'LOC019',
    name: 'Cape Town Logistics',
    type: 'Internal',
    address: '1 Dock Road, V&A Waterfront',
    timezone: 'Africa/Johannesburg',
    status: 'inactive',
    latitude: -33.9037,
    longitude: 18.4196
  },
  {
    id: 'LOC020',
    name: 'Sydney Operations',
    type: 'Internal',
    address: '1 Macquarie Place, Sydney',
    timezone: 'Australia/Sydney',
    status: 'active',
    latitude: -33.8688,
    longitude: 151.2093
  }
];

export default function LocationMaster() {
  const [locations] = useState<Location[]>(mockLocations);
  const [filteredLocations, setFilteredLocations] = useState<Location[]>(mockLocations);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedStatus, setSelectedStatus] = useState('All Status');

  const handleFilter = () => {
    let filtered = [...locations];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(location =>
        location.name.toLowerCase().includes(query) ||
        location.id.toLowerCase().includes(query) ||
        location.address.toLowerCase().includes(query)
      );
    }

    // Apply type filter
    if (selectedType !== 'All Types') {
      filtered = filtered.filter(location => location.type === selectedType);
    }

    // Apply status filter
    if (selectedStatus !== 'All Status') {
      filtered = filtered.filter(location => location.status === selectedStatus.toLowerCase());
    }

    setFilteredLocations(filtered);
  };

  // Run filter when component mounts and when any filter criteria changes
  useEffect(() => {
    handleFilter();
  }, [searchQuery, selectedType, selectedStatus]);

  const handleAddLocation = () => {
    setSelectedLocation(null);
    setIsModalOpen(true);
  };

  const handleEditLocation = (location: Location) => {
    setSelectedLocation(location);
    setIsModalOpen(true);
  };

  const handleSaveLocation = (location: Location) => {
    // TODO: Implement save functionality
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto py-6 max-w-[1200px]">
      <div className="flex flex-col gap-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Location Master</h1>
          <p className="text-muted-foreground text-sm">
            Manage and monitor your global network of internal and external locations. View geographical distribution, access detailed information, and maintain location data.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleAddLocation} className="gap-2 bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4" />
              New Location
            </Button>
            <Button variant="outline" className="gap-2">
              <Upload className="h-4 w-4" />
              Import
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" className="gap-2">
              <RotateCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search locations..."
                className="pl-8 w-full sm:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select
              value={selectedType}
              onValueChange={setSelectedType}
            >
              <SelectTrigger className="w-full sm:w-[130px]">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Types">All Types</SelectItem>
                <SelectItem value="Internal">Internal</SelectItem>
                <SelectItem value="External">External</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={selectedStatus}
              onValueChange={setSelectedStatus}
            >
              <SelectTrigger className="w-full sm:w-[130px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Status">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <LocationMap
            locations={filteredLocations}
            selectedLocation={selectedLocation}
            onLocationSelect={setSelectedLocation}
          />
          
          <LocationGrid
            locations={filteredLocations}
            onEdit={handleEditLocation}
          />
        </div>
      </div>

      <LocationModal
        isOpen={isModalOpen}
        location={selectedLocation}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveLocation}
      />
    </div>
  );
} 