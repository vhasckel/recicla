'use client';

import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const CollectionPointForm = dynamic(
  () =>
    import(
      '@/components/features/collection-points/components/collection-point-form'
    ),
  {
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-lg text-gray-600">Carregando...</p>
      </div>
    ),
  }
);

export function NewCollectionPointPage() {
  const router = useRouter();

  return (
    <main className="flex h-full flex-col">
      <div className="sticky top-0 z-10 border-b bg-white p-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold">Cadastrar novo ponto</h1>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <CollectionPointForm />
      </div>
    </main>
  );
}
