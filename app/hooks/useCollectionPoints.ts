import { collectionPoints as initialCollectionPoints } from "@/data/mockCollectionPoints";
import { normalizeText } from "@/utils/text";
import { useState, useEffect, useMemo } from 'react';
import { CollectionPoint } from '@/types/collection-point';

const LOCAL_STORAGE_KEY = 'recicla_collection_points';

interface UseCollectionPointsResult {
    points: CollectionPoint[];
    totalPoints: number;
    filteredCount: number;
    addCollectionPoint: (point: CollectionPoint) => void;
}

export function useCollectionPoints(query: string): UseCollectionPointsResult {
    const [points, setPoints] = useState<CollectionPoint[]>([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(LOCAL_STORAGE_KEY);

            const savedPoints = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (savedPoints) {
                setPoints(JSON.parse(savedPoints));
            } else {
                setPoints(initialCollectionPoints);
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(points));
        }
    }, [points]);

    const addCollectionPoint = (newPoint: CollectionPoint) => {
        setPoints(prevPoints => {
            const updatedPoints = [...prevPoints, newPoint];
            if (typeof window !== 'undefined') {
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedPoints));
            }
            return updatedPoints;
        });
    };

    const normalizedQuery = useMemo(() => {
        return normalizeText(query || '');
    }, [query]);

    const filteredPoints = useMemo(() => {
        if (!normalizedQuery) {
            return points;
        }

        const filtered = points.filter((point) => {
            const fullAddress = `${point.street} ${point.number || ''} ${point.neighborhood} ${point.city} ${point.cep}`.trim();
            const normalizedAddress = normalizeText(fullAddress);
            const normalizedName = normalizeText(point.name);
            const normalizedMaterials = point.materials.map(normalizeText);

            return normalizedAddress.includes(normalizedQuery) ||
                normalizedName.includes(normalizedQuery) ||
                normalizedMaterials.some(material => material.includes(normalizedQuery));
        });
        return filtered;
    }, [points, normalizedQuery]);

    return {
        points: filteredPoints,
        totalPoints: points.length,
        filteredCount: filteredPoints.length,
        addCollectionPoint,
    };
} 