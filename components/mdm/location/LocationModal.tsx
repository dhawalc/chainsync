'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Location } from './LocationMaster';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (location: Location) => void;
  location?: Location | null;
}

export function LocationModal({
  isOpen,
  onClose,
  onSave,
  location,
}: LocationModalProps) {
  const [formData, setFormData] = useState<Partial<Location>>({
    id: '',
    name: '',
    type: 'internal',
    address: '',
    latitude: 0,
    longitude: 0,
    timezone: '',
    status: 'active',
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (location) {
      setFormData(location);
    } else {
      setFormData({
        id: '',
        name: '',
        type: 'internal',
        address: '',
        latitude: 0,
        longitude: 0,
        timezone: '',
        status: 'active',
      });
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Geocode the address to get latitude and longitude
      const geocoder = new google.maps.Geocoder();
      const result = await new Promise<google.maps.GeocoderResult>((resolve, reject) => {
        geocoder.geocode({ address: formData.address }, (results, status) => {
          if (status === 'OK' && results && results[0]) {
            resolve(results[0]);
          } else {
            reject(new Error('Geocoding failed'));
          }
        });
      });

      // Get timezone using Google Maps Time Zone API
      const timestamp = Math.floor(Date.now() / 1000);
      const location = result.geometry.location;
      const timezone = await fetch(
        `https://maps.googleapis.com/maps/api/timezone/json?location=${location.lat()},${location.lng()}&timestamp=${timestamp}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      ).then((res) => res.json());

      const newLocation: Location = {
        ...formData,
        id: formData.id || `LOC${Math.floor(Math.random() * 10000)}`,
        latitude: location.lat(),
        longitude: location.lng(),
        timezone: timezone.timeZoneId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Location;

      onSave(newLocation);
    } catch (error) {
      console.error('Error saving location:', error);
      // Handle error (show error message to user)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {location ? 'Edit Location' : 'Add New Location'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-700">
                Location Name
              </label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Enter location name"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Type</label>
              <Select
                value={formData.type}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    type: value as 'internal' | 'external',
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="internal">Internal</SelectItem>
                  <SelectItem value="external">External</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Status</label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    status: value as 'active' | 'inactive',
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-700">Address</label>
              <Input
                value={formData.address}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, address: e.target.value }))
                }
                placeholder="Enter full address"
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                Latitude, longitude, and timezone will be automatically determined
                from the address
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Location'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 