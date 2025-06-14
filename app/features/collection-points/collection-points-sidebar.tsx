'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { CollectionPointsList } from "@/features/collection-points/components/list";
import { useSearchParams } from "next/navigation";
import { SearchWrapper } from "@/features/collection-points/components/search-wrapper";
import { Button } from "@/components/common/button";
import Link from "next/link";
import CollectionPointForm from "@/features/collection-points/components/collection-point-form";

interface CollectionPointsSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CollectionPointsSidebar({ open, onOpenChange }: CollectionPointsSidebarProps) {
  const searchParams = useSearchParams();
  const isNewPoint = searchParams.get('view') === 'collection-points/new';

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-80 sm:w-96 flex flex-col p-0 md:p-4 z-[100]">
        <SheetHeader className="p-4 md:p-0">
          <SheetTitle>{isNewPoint ? 'Cadastrar novo ponto' : 'Pontos de Coleta'}</SheetTitle>
        </SheetHeader>
        {isNewPoint ? (
          <div className="flex-1 overflow-y-auto p-4">
            <CollectionPointForm />
          </div>
        ) : (
          <>
            <div className="mb-4 p-4 md:p-0">
              <SearchWrapper />
            </div>
            <Link href="/dashboard?view=collection-points/new" className="w-full mb-4 px-4 md:px-0">
              <Button className="w-full">
                <span>Cadastrar novo ponto</span>
              </Button>
            </Link>
            <div className="flex-1 overflow-y-auto px-4 md:px-0 pb-4 md:pb-0">
              <CollectionPointsList searchParams={searchParams} />
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
} 