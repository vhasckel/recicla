'use client';

import { Button } from '@/components/common/button';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const CollectionPointsWrapper = dynamic(
  () =>
    import(
      '@/components/features/collection-points/components/collection-points-wrapper'
    ).then((mod) => mod.CollectionPointsWrapper),
  {
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-lg text-gray-600">Carregando...</p>
      </div>
    ),
  }
);

const SearchWrapper = dynamic(
  () =>
    import(
      '@/components/features/collection-points/components/search-wrapper'
    ).then((mod) => mod.SearchWrapper),
  {
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-lg text-gray-600">Carregando...</p>
      </div>
    ),
  }
);

export function CollectionPointsPage() {
  return (
    <main className="flex h-full flex-col">
      <div className="sticky top-0 z-10 border-b bg-white p-4">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">Pontos de Coleta</h1>
        </div>
        <div className="mt-4">
          <SearchWrapper>
            <CollectionPointsWrapper />
          </SearchWrapper>
        </div>
        <div className="mt-4">
          <Link href="/collection-points/new" className="w-full">
            <Button className="w-full">
              <span>Cadastrar novo ponto</span>
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <CollectionPointsWrapper />
      </div>
    </main>
  );
}
