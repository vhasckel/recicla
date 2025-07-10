'use client';

import { useEffect, useRef, memo, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import 'leaflet/dist/leaflet.css';
import type { Map as LeafletMap, Marker as LeafletMarker } from 'leaflet';
import { useCollectionPoints } from '@/contexts/CollectionPointsContext';
import { normalizeText } from '@/utils/text';
import { CollectionPoint } from '@/types/collection-point';

const MapComponent = memo(() => {
  const mapRef = useRef<LeafletMap | null>(null);
  const leafletRef = useRef<typeof import('leaflet') | null>(null);
  const markerRefs = useRef<{ [key: string]: LeafletMarker }>({});
  const openPopupRef = useRef<LeafletMarker | null>(null);
  const [mapId] = useState(
    () => 'map-container-' + Math.random().toString(36).substr(2, 9)
  );
  const [isMapReady, setIsMapReady] = useState(false);

  const searchParams = useSearchParams();
  const selectedPointId = searchParams.get('point');
  const rawQuery = searchParams.get('query') || '';
  const query = useMemo(() => normalizeText(rawQuery), [rawQuery]);

  const { points: collectionPoints } = useCollectionPoints(query);

  // inicialização do mapa
  useEffect(() => {
    if (mapRef.current) return;

    let isMounted = true;

    const initMap = async () => {
      const L = await import('leaflet');
      await import('leaflet/dist/leaflet.css');

      if (!isMounted) {
        return;
      }

      leafletRef.current = L;

      const container = document.getElementById(mapId);
      if (!container) return;

      if (container.hasChildNodes()) {
        container.innerHTML = '';
      }

      container.style.height = '100%';
      container.style.width = '100%';

      const mapInstance = L.map(container, {
        zoomControl: false,
        dragging: true,
        touchZoom: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        boxZoom: true,
        keyboard: true,
        inertia: true,
      }).setView([-27.5954, -48.548], 12);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        crossOrigin: true,
      }).addTo(mapInstance);

      mapRef.current = mapInstance;
      setIsMapReady(true);
    };

    initMap();

    return () => {
      isMounted = false;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [mapId]);

  // atualizar a visualização do mapa (centro/zoom)
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const selectedPoint = collectionPoints.find(
      (p) => p.id === selectedPointId
    );

    const center: [number, number] = selectedPoint
      ? [selectedPoint.lat, selectedPoint.lng]
      : [-27.5954, -48.548];
    const zoom = selectedPoint ? 15 : 12;

    const currentCenter = map.getCenter();
    const currentZoom = map.getZoom();

    if (
      currentCenter.lat !== center[0] ||
      currentCenter.lng !== center[1] ||
      currentZoom !== zoom
    ) {
      map.setView(center, zoom, { animate: true, duration: 0.5 });
    }
  }, [selectedPointId, collectionPoints]);

  // gerenciar os marcadores e popups
  useEffect(() => {
    if (!isMapReady || !mapRef.current || !leafletRef.current) {
      return;
    }

    const map = mapRef.current;
    const L = leafletRef.current;

    const selectedPoint = collectionPoints.find(
      (p) => p.id === selectedPointId
    );
    const center: [number, number] = selectedPoint
      ? [selectedPoint.lat, selectedPoint.lng]
      : [-27.5954, -48.548];
    const zoom = selectedPoint ? 15 : 12;
    map.setView(center, zoom, { animate: true, duration: 0.5 });

    const customIcon = L.divIcon({
      className: 'custom-icon-container',
      html: `<div class="text-primary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 drop-shadow-lg"><path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" /></svg></div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    const createPopupContent = (point: CollectionPoint): string => `
      <div class="p-1"><h3 class="font-bold text-lg">${point.neighborhood}</h3><p class="text-sm">${point.street}${point.number ? `, ${point.number}` : ''}</p><p class="text-sm mt-1"><strong>Materiais aceitos:</strong> ${point.materials.join(', ')}</p></div>
    `;

    const currentPointIds = new Set(collectionPoints.map((p) => p.id));

    Object.keys(markerRefs.current).forEach((markerId) => {
      if (!currentPointIds.has(markerId)) {
        map.removeLayer(markerRefs.current[markerId]);
        delete markerRefs.current[markerId];
      }
    });

    collectionPoints.forEach((point) => {
      if (typeof point.lat !== 'number' || typeof point.lng !== 'number')
        return;
      if (!markerRefs.current[point.id]) {
        const marker = L.marker([point.lat, point.lng], { icon: customIcon })
          .addTo(map)
          .bindPopup(() => createPopupContent(point));
        markerRefs.current[point.id] = marker;
      } else {
        const marker = markerRefs.current[point.id];
        marker.setLatLng([point.lat, point.lng]);
        marker.setPopupContent(createPopupContent(point));
      }
    });

    if (openPopupRef.current) openPopupRef.current.closePopup();
    if (selectedPointId && markerRefs.current[selectedPointId]) {
      const markerToOpen = markerRefs.current[selectedPointId];
      markerToOpen.openPopup();
      openPopupRef.current = markerToOpen;
    }
  }, [isMapReady, collectionPoints, selectedPointId]);

  return (
    <div
      className="h-full min-h-[400px] w-full"
      role="application"
      aria-label="Mapa de pontos de coleta"
    >
      <div id={mapId} className="h-full w-full rounded-lg" />
    </div>
  );
});

MapComponent.displayName = 'MapComponent';

export default MapComponent;
