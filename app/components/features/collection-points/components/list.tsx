'use client';

import { CollectionPoint } from '@/types/collection-point';
import { useCollectionPoints } from '@/contexts/CollectionPointsContext';
import { Card } from './card';
import { ReadonlyURLSearchParams } from 'next/navigation';

interface CollectionPointsListProps {
  searchParams: ReadonlyURLSearchParams;
}

export function CollectionPointsList({
  searchParams,
}: CollectionPointsListProps) {
  const query = searchParams.get('query') || '';
  const { points } = useCollectionPoints(query);

  return (
    <div className="flex flex-col gap-2 pb-24">
      {points.map((point: CollectionPoint) => (
        <Card
          key={point.id}
          id={point.id}
          neighborhood={point.neighborhood}
          city={point.city}
          street={point.street}
          number={point.number}
          lat={point.lat}
          lng={point.lng}
        />
      ))}
    </div>
  );
}
