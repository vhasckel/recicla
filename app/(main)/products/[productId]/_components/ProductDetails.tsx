'use client';

import { useCollectionPoints } from '@/contexts/CollectionPointsContext';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CollectionPoint } from '@/types/collection-point';
import Image from 'next/image';

export default function ProductDetails() {
  const params = useParams();
  const productId = params.productId as string;
  const { points } = useCollectionPoints();
  const [point, setPoint] = useState<CollectionPoint | null>(null);

  useEffect(() => {
    const foundPoint = points.find((p) => p.id === productId);
    setPoint(foundPoint || null);
  }, [productId, points]);

  if (!point) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-lg text-gray-600">Ponto de coleta não encontrado</p>
      </div>
    );
  }

  const mapUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+ff0000(${point.lng},${point.lat})/${point.lng},${point.lat},15,0/400x300?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`;

  return (
    <div className="mx-auto max-w-4xl">
      <div className="overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="md:flex">
          <div className="md:w-1/2">
            <Image
              src={mapUrl}
              alt={`Mapa da localização: ${point.street}, ${point.number || 's/n'}`}
              width={400}
              height={300}
              className="h-64 w-full object-cover md:h-full"
            />
          </div>
          <div className="p-6 md:w-1/2">
            <h1 className="mb-4 text-2xl font-bold text-gray-900">
              {point.name}
            </h1>

            <div className="space-y-4">
              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-800">
                  Endereço
                </h3>
                <p className="text-gray-600">
                  {point.street}
                  {point.number ? `, ${point.number}` : ''}
                </p>
                <p className="text-gray-600">{point.neighborhood}</p>
                <p className="text-gray-600">
                  {point.city} - {point.cep}
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-800">
                  Materiais Aceitos
                </h3>
                <div className="flex flex-wrap gap-2">
                  {point.materials.map((material, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800"
                    >
                      {material}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-800">
                  Coordenadas
                </h3>
                <p className="text-gray-600">
                  Latitude: {point.lat.toFixed(6)}
                </p>
                <p className="text-gray-600">
                  Longitude: {point.lng.toFixed(6)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
