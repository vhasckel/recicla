import { Suspense } from 'react';
import { CollectionPointsPage } from '@/components/features/collection-points/collection-points-page';

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">
          Pontos de Coleta
        </h1>
        <p className="mb-8 text-gray-600">
          Encontre os pontos de coleta de recicláveis mais próximos de você.
        </p>

        <Suspense
          fallback={
            <div className="flex h-64 w-full items-center justify-center rounded-lg bg-gray-100">
              <p className="text-lg text-gray-600">
                Carregando pontos de coleta...
              </p>
            </div>
          }
        >
          <CollectionPointsPage />
        </Suspense>
      </div>
    </div>
  );
}
