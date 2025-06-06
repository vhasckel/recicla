'use client'

import { CollectionPoint } from "@/types/collection-point"
import { useCollectionPoints } from "@/hooks/useCollectionPoints"
import { Card } from "./card"
import { useSearchParams } from "next/navigation"

export function CollectionPointsList() {
    const searchParams = useSearchParams();
    const { points } = useCollectionPoints(searchParams);

    return (
        <div className="flex flex-col gap-2">
            {points.map((point: CollectionPoint) => (
                <Card
                    key={point.id}
                    id={point.id}
                    address={point.address}
                    lat={point.lat}
                    lng={point.lng}
                />
            ))}
        </div>
    )
} 