'use client';

import { useSearchParams } from 'next/navigation';
import { Search } from './search';
import { Suspense } from 'react';

function SearchWrapperInner() {
  const searchParams = useSearchParams();
  return <Search searchParams={searchParams} />;
}

interface SearchWrapperProps {
  children?: React.ReactNode;
}

export function SearchWrapper({ children }: SearchWrapperProps) {
  return (
    <Suspense fallback={<div>Carregando busca...</div>}>
      <SearchWrapperInner />
      {children}
    </Suspense>
  );
}
