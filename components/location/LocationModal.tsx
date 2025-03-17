import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Location } from '@/types/location';
import { MapPinIcon } from '@heroicons/react/24/outline';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  location?: Location | null;
}

export default function LocationModal({ isOpen, onClose, location }: LocationModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Location>>(
    location || {
      name: '',
      address: '',
      city: '',
      state: '',
      country: '',
      postal_code: '',
      latitude: 0,
      longitude: 0,
      timezone: '',
    }
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchGeocodeData = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement geocoding API call
      // For now, using mock data
      const mockGeocode = {
        latitude: 41.8781,
        longitude: -87.6298,
        timezone: 'America/Chicago',
      };

      setFormData((prev) => ({
        ...prev,
        latitude: mockGeocode.latitude,
        longitude: mockGeocode.longitude,
        timezone: mockGeocode.timezone,
      }));
    } catch (error) {
      console.error('Error fetching geocode data:', error);
      // TODO: Show error toast
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // TODO: Implement save to API
      console.log('Saving location:', formData);
      onClose();
    } catch (error) {
      console.error('Error saving location:', error);
      // TODO: Show error toast
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {location ? 'Edit Location' : 'Add New Location'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Location Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State/Province</Label>
              <Input
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postal_code">Postal Code</Label>
              <Input
                id="postal_code"
                name="postal_code"
                value={formData.postal_code}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={fetchGeocodeData}
              disabled={isLoading || !formData.address || !formData.city || !formData.country}
            >
              <MapPinIcon className="h-4 w-4 mr-2" />
              Fetch Coordinates & Timezone
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                name="latitude"
                type="number"
                step="any"
                value={formData.latitude}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                name="longitude"
                type="number"
                step="any"
                value={formData.longitude}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Input
                id="timezone"
                name="timezone"
                value={formData.timezone}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onClose}>
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