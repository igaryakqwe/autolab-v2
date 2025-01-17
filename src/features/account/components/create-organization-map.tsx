import { FC, useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { cn } from '@/utils/style-utils';
import { useTheme } from 'next-themes';

interface CreateOrganizationMapProps {
  onLocationSelect: (lat: number, lng: number, address: string) => void;
  className?: string;
}

const CreateOrganizationMap: FC<CreateOrganizationMapProps> = ({
  onLocationSelect,
  className,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<L.LatLng | null>(
    null,
  );
  const { theme } = useTheme();

  const customIcon = new L.Icon({
    iconUrl: '/icons/map-pin.svg',
    iconSize: [25, 30],
    iconAnchor: [12, 30],
    popupAnchor: [1, -34],
  });

  const mapStyles = {
    light: {
      tiles:
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    },
    dark: {
      tiles:
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    },
  };

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapRef.current, {
        center: [50.4501, 30.5234],
        zoom: 6,
        zoomControl: false,
      });
      mapInstanceRef.current = map;

      const currentStyle = theme === 'dark' ? mapStyles.dark : mapStyles.light;
      tileLayerRef.current = L.tileLayer(currentStyle.tiles, {
        attribution: currentStyle.attribution,
        subdomains: 'abcd',
        className: theme === 'dark' ? 'dark-map-tiles' : '',
      }).addTo(map);

      L.control
        .zoom({
          position: 'topright',
        })
        .addTo(map);

      map.on('click', handleMapClick);

      map.on('mousedown', () => {
        if (mapRef.current) {
          mapRef.current.style.cursor = 'grabbing';
        }
      });

      map.on('mouseup', () => {
        if (mapRef.current) {
          mapRef.current.style.cursor = 'default';
        }
      });

      map.on('dragstart', () => {
        if (mapRef.current) {
          mapRef.current.style.cursor = 'grabbing';
        }
      });

      map.on('dragend', () => {
        if (mapRef.current) {
          mapRef.current.style.cursor = 'default';
        }
      });

      map.on('mouseover', () => {
        if (mapRef.current) {
          mapRef.current.style.cursor = 'default';
        }
      });

      map.on('mouseout', () => {
        if (mapRef.current) {
          mapRef.current.style.cursor = '';
        }
      });

      const style = document.createElement('style');
      style.textContent = `
      .dark-map-tiles {
        filter: brightness(0.8) invert(1) contrast(1.1) hue-rotate(180deg) saturate(0.5);
      }
    `;
      document.head.appendChild(style);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.off('click', handleMapClick);
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        tileLayerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current && tileLayerRef.current) {
      const currentStyle = theme === 'dark' ? mapStyles.dark : mapStyles.light;

      tileLayerRef.current.remove();

      tileLayerRef.current = L.tileLayer(currentStyle.tiles, {
        attribution: currentStyle.attribution,
        subdomains: 'abcd',
        className: theme === 'dark' ? 'dark-map-tiles' : '',
      }).addTo(mapInstanceRef.current);
    }
  }, [theme]);

  const handleMapClick = async (e: L.LeafletMouseEvent) => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const { lat, lng } = e.latlng;
    setSelectedLocation(e.latlng);

    if (markerRef.current) {
      markerRef.current.setLatLng([lat, lng]);
    } else {
      markerRef.current = L.marker([lat, lng], { icon: customIcon }).addTo(map);
    }

    map.setView([lat, lng], map.getZoom(), {
      animate: true,
      duration: 0.5,
      noMoveStart: true,
    });

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1&accept-language=uk`,
      );
      const data = await response.json();
      const address = data.display_name || 'Адресу не знайдено';
      onLocationSelect(lat, lng, address);
    } catch (error) {
      console.error('Помилка при отриманні адреси:', error);
      onLocationSelect(lat, lng, 'Помилка при отриманні адреси');
    }
  };

  useEffect(() => {
    if (mapInstanceRef.current && selectedLocation) {
      mapInstanceRef.current.invalidateSize();
      mapInstanceRef.current.setView(
        [selectedLocation.lat, selectedLocation.lng],
        mapInstanceRef.current.getZoom(),
      );
    }
  }, [selectedLocation]);

  return <div ref={mapRef} className={cn('w-full h-48', className)} />;
};

export default CreateOrganizationMap;
