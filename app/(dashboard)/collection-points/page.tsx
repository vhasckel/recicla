import { Suspense } from 'react';
import { CollectionPointsPage } from '@/components/features/collection-points/collection-points-page';

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center bg-gray-100">
          <p className="text-lg text-gray-600">Carregando...</p>
        </div>
      }
    >
      <CollectionPointsPage />
    </Suspense>
  );
}
