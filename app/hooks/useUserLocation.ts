import { useState, useEffect, useCallback } from 'react';

interface UserLocation {
  lat: number;
  lng: number;
}

interface UseUserLocationResult {
  location: UserLocation | null;
  error: GeolocationPositionError | null;
  requestLocation: () => void;
}

// o hook recebe um booleano `enabled` para saber quando deve iniciar a busca.
export function useUserLocation(enabled: boolean): UseUserLocationResult {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [error, setError] = useState<GeolocationPositionError | null>(null);

  const requestLocation = useCallback(() => {
    setError(null);

    if (!navigator.geolocation) {
      console.error('API de Geolocalização não está disponível.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (geoError) => {
        if (geoError.code === geoError.PERMISSION_DENIED) {
          console.warn('O usuário negou o acesso à localização.');
        } else {
          console.error('Erro ao obter localização:', geoError);
        }
        setError(geoError);
      }
    );
  }, []);

  useEffect(() => {
    // só busca a localização se estiver habilitado (chat aberto) e se ainda não tivermos a localização.
    if (enabled && !location) {
      requestLocation();
    }
  }, [enabled, location, requestLocation]);

  return { location, error, requestLocation };
}
