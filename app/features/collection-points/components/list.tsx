'use client'

import { CollectionPoint } from "@/types/collection-point"
import { useCollectionPoints } from "@/hooks/useCollectionPoints"
import { Card } from "./card"

export function CollectionPointsList() {
    const { points } = useCollectionPoints();

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