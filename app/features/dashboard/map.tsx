'use client';

import { useEffect, useRef, memo, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import 'leaflet/dist/leaflet.css';
import type { Map as LeafletMap, Marker as LeafletMarker } from 'leaflet';
import { useCollectionPoints } from '@/contexts/CollectionPointsContext';
import { normalizeText } from '@/utils/text';
import { CollectionPoint } from '@/types/collection-point';

const MapComponent = memo(() => {
  const mapRef = useRef<LeafletMap | null>(null);
  const markerRefs = useRef<{ [key: string]: LeafletMarker }>({});
  const [mapId] = useState(() => 'map-container-' + Math.random().toString(36).substr(2, 9));
  const searchParams = useSearchParams();
  const selectedPointId = searchParams.get('point');

  const rawQuery = searchParams.get('query') || '';
  const query = useMemo(() => normalizeText(rawQuery), [rawQuery]);

  const { points: collectionPoints } = useCollectionPoints(query);
  const [leafletInstance, setLeafletInstance] = useState<typeof import('leaflet') | null>(null);

  // 1. Effect for map initialization (runs once, or when mapId changes) - Creates the map instance
  useEffect(() => {
    const initMapInstance = async () => {
      if (typeof window === 'undefined' || mapRef.current) {
        return;
      }

      try {
        const L = await import('leaflet');
        setLeafletInstance(L);

        const container = document.getElementById(mapId);
        if (!container) return;

        container.style.height = '100%';
        container.style.width = '100%';
        container.style.minHeight = '400px';

        const mapInstance = L.map(container, {
          zoomControl: false,
          dragging: true,
          touchZoom: true,
          scrollWheelZoom: true,
          doubleClickZoom: true,
          boxZoom: true,
          keyboard: true,
          inertia: true,
        }).setView([-27.5954, -48.5480], 12);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
          crossOrigin: true
        }).addTo(mapInstance);

        mapRef.current = mapInstance;
      } catch (error) {
        console.error('Erro ao inicializar mapa:', error);
      }
    };

    initMapInstance();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        setLeafletInstance(null);
      }
    };
  }, [mapId]);

  // 2. Effect for updating map view and markers - Runs when selectedPointId or collectionPoints change
  useEffect(() => {
    if (!mapRef.current || !leafletInstance) {
      return;
    }

    const mapInstance = mapRef.current;
    const L = leafletInstance;

    // 1. Update map center and zoom
    const selectedPoint = selectedPointId 
      ? collectionPoints.find((point: CollectionPoint) => point.id === selectedPointId) ?? null
      : null;
    
    const center: [number, number] = selectedPoint ? [selectedPoint.lat, selectedPoint.lng] : [-27.5954, -48.5480];
    const zoom = selectedPoint ? 15 : 12;

    // Only set view if it's actually different
    const currentCenter = mapInstance.getCenter();
    const currentZoom = mapInstance.getZoom();
    const isCenterChanged = currentCenter.lat !== center[0] || currentCenter.lng !== center[1];
    const isZoomChanged = currentZoom !== zoom;

    if (isCenterChanged || isZoomChanged) {
        mapInstance.setView(center, zoom, { animate: true });
    }

    // 2. Update markers
    const newMarkerIds = new Set(collectionPoints.map((p: CollectionPoint) => p.id));
    const oldMarkerIds = new Set(Object.keys(markerRefs.current));

    // Remove markers that are no longer in collectionPoints
    oldMarkerIds.forEach(id => {
      if (!newMarkerIds.has(id)) {
        mapInstance.removeLayer(markerRefs.current[id]);
        delete markerRefs.current[id];
      }
    });

    const customIcon = L.divIcon({
      className: 'custom-icon',
      html: `<div class="text-primary">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8">
          <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
        </svg>
      </div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    // Add or update markers for all points
    collectionPoints.forEach((point: CollectionPoint) => {
      if (!markerRefs.current[point.id]) {
        const marker = L.marker([point.lat, point.lng], { icon: customIcon })
          .addTo(mapInstance)
          .bindPopup(`
            <div class="">
              <h3 class="font-bold text-lg">${point.neighborhood}</h3>
              <p class="text-sm">${point.street}${point.number ? `, ${point.number}` : ''}</p>
              <p class="text-sm mt-1">
                <strong>Materiais aceitos:</strong> ${point.materials.join(', ')}
              </p>
            </div>
          `);
        markerRefs.current[point.id] = marker;
      } else {
        // Update existing marker position and popup
        const marker = markerRefs.current[point.id];
        marker.setLatLng([point.lat, point.lng]);
        marker.setPopupContent(`
          <div class="">
            <h3 class="font-bold text-lg">${point.neighborhood}</h3>
            <p class="text-sm">${point.street}${point.number ? `, ${point.number}` : ''}</p>
            <p class="text-sm mt-1">
              <strong>Materiais aceitos:</strong> ${point.materials.join(', ')}
            </p>
          </div>
        `);
      }

      if (selectedPointId === point.id) {
        markerRefs.current[point.id].openPopup();
      } else {
        markerRefs.current[point.id].closePopup();
      }
    });

    mapInstance.invalidateSize();

  }, [selectedPointId, collectionPoints, leafletInstance]);

  return (
    <div className="h-full w-full min-h-[400px]">
      <div id={mapId} className="h-full w-full" />
    </div>
  );
});

MapComponent.displayName = 'MapComponent';

export default dynamic(() => Promise.resolve(MapComponent), {
  ssr: false,
});
