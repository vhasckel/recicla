'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { CollectionPointsList } from '@/components/features/collection-points/components/list';
import { useSearchParams } from 'next/navigation';
import { SearchWrapper } from '@/components/features/collection-points/components/search-wrapper';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import CollectionPointForm from '@/components/features/collection-points/components/collection-point-form';
import { Suspense, useEffect, useState } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface CollectionPointsSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function CollectionPointsSidebarInner({
  open,
  onOpenChange,
}: CollectionPointsSidebarProps) {
  const searchParams = useSearchParams();
  const isNewPoint = searchParams.get('view') === 'collection-points/new';

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="z-[100] flex w-80 flex-col p-0 sm:w-96 md:p-4"
      >
        <SheetHeader className="p-4 md:p-0">
          <SheetTitle>
            {isNewPoint ? 'Cadastrar novo ponto' : 'Pontos de Coleta'}
          </SheetTitle>
        </SheetHeader>
        {isNewPoint ? (
          <div className="flex-1 overflow-y-auto p-4">
            <Suspense fallback={<div>Carregando formulário...</div>}>
              <CollectionPointForm />
            </Suspense>
          </div>
        ) : (
          <>
            <div className="mb-4 p-4 md:p-0">
              <SearchWrapper />
            </div>
            <Link
              href="/dashboard?view=collection-points/new"
              className="mb-4 w-full px-4 md:px-0"
            >
              <Button className="w-full">
                <span>Cadastrar novo ponto</span>
              </Button>
            </Link>
            <div className="flex-1 overflow-y-auto px-4 pb-4 md:px-0 md:pb-0">
              <CollectionPointsList searchParams={searchParams} />
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

export function CollectionPointsSidebar(props: CollectionPointsSidebarProps) {
  return (
    <Suspense fallback={<div>Carregando sidebar...</div>}>
      <CollectionPointsSidebarInner {...props} />
    </Suspense>
  );
}
