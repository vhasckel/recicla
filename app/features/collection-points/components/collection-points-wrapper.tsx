'use client'

import { useSearchParams } from "next/navigation"
import { CollectionPointsList } from "./list"
import { Suspense } from "react"

export function CollectionPointsWrapper() {
    const searchParams = useSearchParams();
    return (
        <Suspense fallback={<div>Carregando pontos de coleta...</div>}>
            <CollectionPointsList searchParams={searchParams} />
        </Suspense>
    );
} 