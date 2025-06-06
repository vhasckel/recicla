'use client'

import { useSearchParams } from "next/navigation"
import { CollectionPointsList } from "./list"

export function CollectionPointsWrapper() {
    const searchParams = useSearchParams();
    return <CollectionPointsList searchParams={searchParams} />;
} 