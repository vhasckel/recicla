'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { collectionPoints } from '../../data/mockCollectionPoints';
import { useSearchParams } from 'next/navigation';
import 'leaflet/dist/leaflet.css';
import type { Map as LeafletMap } from 'leaflet';

const MapComponent = () => {
  const mapRef = useRef<LeafletMap | null>(null);
  const mapId = 'map-container-' + Math.random().toString(36).substr(2, 9);
  const searchParams = useSearchParams();
  const selectedPointId = searchParams.get('point');

  useEffect(() => {
    const initMap = async () => {
      console.log('Iniciando initMap...');
      console.log('Window check:', typeof window !== 'undefined');
      console.log('MapRef check:', mapRef.current);
      
      if (typeof window === 'undefined' || mapRef.current) {
        console.log('Retornando cedo - window undefined ou mapRef já existe');
        return;
      }

      try {
        console.log('Importando Leaflet...');
        const L = await import('leaflet');
        console.log('Leaflet importado com sucesso');

        // Forçar recarregamento do CSS do Leaflet
        const leafletCss = document.createElement('link');
        leafletCss.rel = 'stylesheet';
        leafletCss.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        leafletCss.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
        leafletCss.crossOrigin = '';
        document.head.appendChild(leafletCss);

        const container = document.getElementById(mapId);
        console.log('Container encontrado:', !!container);
        if (!container) return;

        // Garantir que o container tenha altura
        container.style.height = '100%';
        container.style.width = '100%';
        container.style.minHeight = '400px';

        // Encontrar o ponto selecionado
        const selectedPoint = selectedPointId 
          ? collectionPoints.find(point => point.id === selectedPointId) ?? null
          : null;
        console.log('Ponto selecionado:', selectedPoint);

        const center: [number, number] = selectedPoint ? [selectedPoint.lat, selectedPoint.lng] : [-27.5954, -48.5480];
        const zoom = selectedPoint ? 15 : 12;
        console.log('Configurações do mapa:', { center, zoom });
        
        console.log('Criando instância do mapa...');
        const mapInstance = L.default.map(container, {
          zoomControl: false,
          dragging: true,
          touchZoom: true,
          scrollWheelZoom: true,
          doubleClickZoom: true,
          boxZoom: true,
          keyboard: true,
          inertia: true,
        }).setView(center, zoom);
        console.log('Instância do mapa criada');

        console.log('Adicionando tile layer...');
        L.default.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
          crossOrigin: true
        }).addTo(mapInstance);
        console.log('Tile layer adicionada');

        const customIcon = L.default.divIcon({
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

        console.log('Adicionando marcadores...');
        // Adicionar marcadores para todos os pontos de coleta
        collectionPoints.forEach((point) => {
          const marker = L.default.marker([point.lat, point.lng], { icon: customIcon })
            .addTo(mapInstance)
            .bindPopup(`
              <div class="">
                <h3 class="font-bold text-lg">${point.name}</h3>
                <p class="text-sm">${point.address}</p>
                <p class="text-sm mt-1">
                  <strong>Materiais aceitos:</strong> ${point.materials.join(', ')}
                </p>
              </div>
            `);

          // Se for o ponto selecionado, abrir o popup automaticamente
          if (selectedPointId === point.id) {
            marker.openPopup();
          }
        });
        console.log('Marcadores adicionados');

        mapRef.current = mapInstance;
        console.log('Mapa inicializado com sucesso');

        // Forçar atualização do mapa
        setTimeout(() => {
          mapInstance.invalidateSize();
        }, 100);
      } catch (error) {
        console.error('Erro detalhado ao inicializar mapa:', error);
      }
    };

    initMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [mapId, selectedPointId]);

  return (
    <div className="h-full w-full min-h-[400px]">
      <div id={mapId} className="h-full w-full" />
    </div>
  );
};

export default dynamic(() => Promise.resolve(MapComponent), {
  ssr: false,
});
