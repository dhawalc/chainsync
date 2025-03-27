'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Location } from './LocationMaster';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Maximize2 } from 'lucide-react';

interface LocationMapProps {
  locations: Location[];
  selectedLocation?: Location | null;
  onLocationSelect?: (location: Location) => void;
}

export default function LocationMap({ locations, selectedLocation, onLocationSelect }: LocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!mapRef.current) return;

    if (!document.fullscreenElement) {
      mapRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
      version: 'weekly',
    });

    loader.load().then(() => {
      if (mapRef.current) {
        const mapInstance = new google.maps.Map(mapRef.current, {
          center: { lat: 20, lng: 0 },
          zoom: 2,
          mapTypeId: 'satellite',
          styles: [
            {
              featureType: 'all',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            },
            {
              featureType: 'administrative',
              elementType: 'geometry',
              stylers: [{ visibility: 'off' }]
            },
            {
              featureType: 'administrative.country',
              elementType: 'geometry.stroke',
              stylers: [{ visibility: 'on' }, { color: '#ffffff30' }]
            },
            {
              featureType: 'landscape',
              elementType: 'geometry',
              stylers: [{ color: '#242f3e' }]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{ color: '#17263c' }]
            }
          ],
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false
        });

        setMap(mapInstance);
        setInfoWindow(new google.maps.InfoWindow());
      }
    });
  }, []);

  useEffect(() => {
    if (!map || !infoWindow) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    setMarkers([]);

    if (locations.length === 0) return;

    const bounds = new google.maps.LatLngBounds();
    const newMarkers: google.maps.Marker[] = [];

    locations.forEach(location => {
      const position = {
        lat: location.latitude,
        lng: location.longitude,
      };

      const marker = new google.maps.Marker({
        position,
        map,
        title: location.name,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: location.type === 'Internal' ? '#ef4444' : '#3b82f6',
          fillOpacity: 1,
          strokeWeight: 0,
          scale: 8
        }
      });

      marker.addListener('click', () => {
        infoWindow.setContent(`
          <div style="padding: 8px; min-width: 200px;">
            <h3 style="margin: 0 0 8px 0; font-weight: 600;">${location.name}</h3>
            <p style="margin: 0 0 4px 0; font-size: 14px;">${location.address}</p>
            <p style="margin: 0 0 4px 0; font-size: 14px;">Type: ${location.type}</p>
            <p style="margin: 0; font-size: 14px;">Status: ${location.status.charAt(0).toUpperCase() + location.status.slice(1)}</p>
          </div>
        `);
        infoWindow.open(map, marker);
        onLocationSelect?.(location);
      });

      bounds.extend(position);
      newMarkers.push(marker);
    });

    setMarkers(newMarkers);

    // If there's a selected location, center on it
    if (selectedLocation) {
      map.setCenter({
        lat: selectedLocation.latitude,
        lng: selectedLocation.longitude,
      });
      map.setZoom(6);
    } else if (locations.length > 1) {
      // Otherwise fit bounds to show all locations
      map.fitBounds(bounds);
    } else if (locations.length === 1) {
      // If there's only one location, center on it with a reasonable zoom
      map.setCenter({
        lat: locations[0].latitude,
        lng: locations[0].longitude,
      });
      map.setZoom(6);
    }
  }, [map, locations, selectedLocation, infoWindow, onLocationSelect]);

  return (
    <Card className="border rounded-lg shadow-sm overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
        <CardTitle className="text-base font-medium">Location Map</CardTitle>
        <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="h-8 w-8">
          <Maximize2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div 
          ref={mapRef} 
          className={`w-full ${isFullscreen ? 'h-screen' : 'h-[280px]'}`}
        />
      </CardContent>
    </Card>
  );
} 