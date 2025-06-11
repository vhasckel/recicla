import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const CollectionPointForm = dynamic(
  () => import('./collection-point-form').then((mod) => mod.default),
  { ssr: false }
);

export default function NewCollectionPointPage() {
  return (
    <Suspense fallback={<div>Carregando formulário...</div>}>
      <CollectionPointForm />
    </Suspense>
  );
} 