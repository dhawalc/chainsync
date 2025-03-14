'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import type { Location } from './LocationMaster';

interface LocationMapProps {
  locations: Location[];
  onEdit: (location: Location) => void;
}

export default function LocationMap({ locations, onEdit }: LocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(
    null
  );

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
      version: 'weekly',
    });

    loader
      .load()
      .then(() => {
        if (mapRef.current) {
          const mapInstance = new google.maps.Map(mapRef.current, {
            center: { lat: 20, lng: 0 },
            zoom: 2,
            styles: [
              {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{ color: '#e9e9e9' }, { lightness: 17 }],
              },
              {
                featureType: 'landscape',
                elementType: 'geometry',
                stylers: [{ color: '#f5f5f5' }, { lightness: 20 }],
              },
              {
                featureType: 'administrative',
                elementType: 'geometry.stroke',
                stylers: [{ color: '#fefefe' }, { lightness: 17 }, { weight: 1.2 }],
              },
            ],
          });

          const info = new google.maps.InfoWindow();
          setMap(mapInstance);
          setInfoWindow(info);
        }
      })
      .catch((error) => {
        console.error('Error loading Google Maps:', error);
      });
  }, []);

  useEffect(() => {
    if (!map || !infoWindow) return;

    // Clear existing markers
    markers.forEach((marker) => marker.setMap(null));

    // Create new markers
    const newMarkers = locations.map((location) => {
      const marker = new google.maps.Marker({
        position: { lat: location.latitude, lng: location.longitude },
        map,
        title: location.name,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: location.type === 'internal' ? '#ef4444' : '#3b82f6',
          fillOpacity: 1,
          strokeWeight: 1,
          strokeColor: '#ffffff',
          scale: 8,
        },
      });

      marker.addListener('click', () => {
        const content = `
          <div class="p-2 min-w-[200px]">
            <h3 class="font-semibold text-gray-900">${location.name}</h3>
            <p class="text-sm text-gray-600 mt-1">${location.address}</p>
            <div class="mt-2 flex justify-end">
              <button
                class="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                onclick="document.dispatchEvent(new CustomEvent('editLocation', { detail: '${location.id}' }))"
              >
                Edit Details
              </button>
            </div>
          </div>
        `;

        infoWindow.setContent(content);
        infoWindow.open(map, marker);
      });

      return marker;
    });

    setMarkers(newMarkers);

    // Add event listener for edit button clicks in info windows
    const handleEditLocation = (event: CustomEvent) => {
      const location = locations.find((loc) => loc.id === event.detail);
      if (location) {
        onEdit(location);
      }
    };

    document.addEventListener('editLocation', handleEditLocation as EventListener);

    return () => {
      document.removeEventListener(
        'editLocation',
        handleEditLocation as EventListener
      );
    };
  }, [locations, map, infoWindow, onEdit]);

  return <div ref={mapRef} className="w-full h-full" />;
} 