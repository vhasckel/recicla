'use client'

import { CollectionPoint } from "@/types/collection-point"
import { useCollectionPoints } from "@/hooks/useCollectionPoints"
import { Card } from "./card"
import { ReadonlyURLSearchParams } from "next/navigation"

interface CollectionPointsListProps {
    searchParams: ReadonlyURLSearchParams;
}

export function CollectionPointsList({ searchParams }: CollectionPointsListProps) {
    const { points } = useCollectionPoints(searchParams);

    return (
        <div className="flex flex-col gap-2">
            {points.map((point: CollectionPoint) => (
                <Card
                    key={point.id}
                    id={point.id}
                    neighborhood={point.neighborhood}
                    street={point.street}
                    number={point.number}
                    lat={point.lat}
                    lng={point.lng}
                />
            ))}
        </div>
    )
} 