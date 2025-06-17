'use client'

import { useSearchParams } from "next/navigation"
import { CollectionPointsList } from "./list"
import { Suspense } from "react"

function CollectionPointsWrapperInner() {
    const searchParams = useSearchParams();
    return <CollectionPointsList searchParams={searchParams} />;
}

export function CollectionPointsWrapper() {
    return (
        <Suspense fallback={<div>Carregando pontos de coleta...</div>}>
            <CollectionPointsWrapperInner />
        </Suspense>
    );
} 