import { ReadonlyURLSearchParams } from "next/navigation";
import { collectionPoints as initialCollectionPoints } from "@/data/mockCollectionPoints";
import { normalizeText } from "@/utils/text";
import { useState, useEffect } from 'react';
import { CollectionPoint } from '@/types/collection-point';

const LOCAL_STORAGE_KEY = 'recicla_collection_points';

export function useCollectionPoints(searchParams: ReadonlyURLSearchParams) {
    const [points, setPoints] = useState<CollectionPoint[]>([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedPoints = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (savedPoints) {
                setPoints(JSON.parse(savedPoints));
            } else {
                setPoints(initialCollectionPoints);
            }
        }
    }, []);

    const addCollectionPoint = (newPoint: CollectionPoint) => {
        setPoints(prevPoints => {
            const updatedPoints = [...prevPoints, newPoint];
            if (typeof window !== 'undefined') {
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedPoints));
            }
            return updatedPoints;
        });
    };

    const query = normalizeText(searchParams.get('query') || '');

    const filteredPoints = points.filter((point) => {
        if (!query) return true;
        
        const fullAddress = `${point.street} ${point.number || ''} ${point.neighborhood} ${point.city} ${point.cep}`.trim();
        const normalizedAddress = normalizeText(fullAddress);
        const normalizedName = normalizeText(point.name);
        const normalizedMaterials = point.materials.map(normalizeText);

        return normalizedAddress.includes(query) || 
               normalizedName.includes(query) ||
               normalizedMaterials.some(material => material.includes(query));
    });

    return {
        points: filteredPoints,
        totalPoints: points.length,
        filteredCount: filteredPoints.length,
        addCollectionPoint,
    };
} 