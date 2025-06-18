'use client';

import { useSearchParams } from 'next/navigation';
import { Search } from './search';
import { Suspense } from 'react';

function SearchWrapperInner() {
  const searchParams = useSearchParams();
  return <Search searchParams={searchParams} />;
}

export function SearchWrapper() {
  return (
    <Suspense fallback={<div>Carregando busca...</div>}>
      <SearchWrapperInner />
    </Suspense>
  );
}
