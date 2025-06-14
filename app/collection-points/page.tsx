'use client'

import { CollectionPointsWrapper } from "@/features/collection-points/components/collection-points-wrapper"
import { SearchWrapper } from "@/features/collection-points/components/search-wrapper"
import { Button } from "@/components/common/button"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CollectionPointsPage() {
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