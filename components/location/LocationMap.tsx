'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Location } from '@/types/location';
import L from 'leaflet';

interface LocationMapProps {
  locations: Location[];
}

// Create custom icons for internal and external locations
const internalIcon = L.icon({
  iconUrl: '/leaflet/marker-icon-red.png',
  iconRetinaUrl: '/leaflet/marker-icon-2x-red.png',
  shadowUrl: '/leaflet/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const externalIcon = L.icon({
  iconUrl: '/leaflet/marker-icon-blue.png',
  iconRetinaUrl: '/leaflet/marker-icon-2x-blue.png',
  shadowUrl: '/leaflet/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Create a wrapper component to handle the map context
function MapWrapper({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default function LocationMap({ locations }: LocationMapProps) {
  console.log('LocationMap: Component rendering started');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    console.log('LocationMap: useEffect triggered');
    setIsMounted(true);
  }, []);

  // Calculate center point based on all locations
  const center = locations.length > 0
    ? [
        locations.reduce((sum, loc) => sum + (loc.latitude || 0), 0) / locations.length,
        locations.reduce((sum, loc) => sum + (loc.longitude || 0), 0) / locations.length,
      ] as [number, number]
    : [0, 0] as [number, number];

  console.log('LocationMap: Calculated center:', center);

  // Calculate zoom level based on number of locations
  const zoom = locations.length === 0 ? 2 : locations.length === 1 ? 13 : 4;
  console.log('LocationMap: Calculated zoom:', zoom);

  if (!isMounted) {
    console.log('LocationMap: Not mounted yet, showing loading state');
    return (
      <div className="h-[600px] w-full flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  console.log('LocationMap: Mounted, rendering map with', locations.length, 'locations');
  
  return (
    <MapWrapper>
      <div className="h-[600px] w-full">
        <MapContainer
          center={center}
          zoom={zoom}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {locations.map((location) => {
            console.log('LocationMap: Rendering marker for location:', location.name);
            return (
              <Marker
                key={location.id}
                position={[location.latitude || 0, location.longitude || 0]}
                icon={location.isInternal ? internalIcon : externalIcon}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-semibold text-lg mb-2">{location.name}</h3>
                    <p className="text-sm mb-1">{location.description}</p>
                    <p className="text-sm mb-1">{location.address}</p>
                    <p className="text-sm mb-1">{`${location.city}, ${location.state} ${location.postal_code}`}</p>
                    <p className="text-sm">{location.country}</p>
                    <p className="text-sm mt-2">
                      <span className="font-medium">Type:</span> {location.type}
                    </p>
                    {location.supplier && (
                      <p className="text-sm">
                        <span className="font-medium">Supplier:</span> {location.supplier}
                      </p>
                    )}
                    <p className="text-sm">
                      <span className="font-medium">Status:</span>{' '}
                      {location.isActive ? 'Active' : 'Inactive'}
                    </p>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </MapWrapper>
  );
} 