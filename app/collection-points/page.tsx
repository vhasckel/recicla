'use client'

import { Button } from "@/components/common/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Suspense } from "react"
import dynamic from "next/dynamic";

const CollectionPointsWrapper = dynamic(() => import("@/features/collection-points/components/collection-points-wrapper").then(mod => mod.CollectionPointsWrapper), {
  ssr: false,
});
const SearchWrapper = dynamic(() => import("@/features/collection-points/components/search-wrapper").then(mod => mod.SearchWrapper), {
  ssr: false,
});

function CollectionPointsPageInner() {
  const router = useRouter()

  return (
    <main className="flex flex-col h-full">
      <div className="sticky top-0 z-10 bg-white p-4 border-b">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">Pontos de Coleta</h1>
        </div>
        <div className="mt-4">
          <SearchWrapper />
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
  )
}

export default function CollectionPointsPage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen w-full items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-600">Carregando...</p>
      </div>
    }>
      <CollectionPointsPageInner />
    </Suspense>
  );
} 