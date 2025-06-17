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
    const [points, setPoints] = useState<CollectionPoint[]>(() => {
        if (typeof window !== 'undefined') {
            const savedPoints = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (savedPoints) {
                const userPoints = JSON.parse(savedPoints);
                // Combina os pontos mockados com os pontos do usuário
                const allPoints = [...initialCollectionPoints];
                // Adiciona apenas os pontos do usuário que não existem nos mockados
                userPoints.forEach((userPoint: CollectionPoint) => {
                    if (!allPoints.some(mockPoint => mockPoint.id === userPoint.id)) {
                        allPoints.push(userPoint);
                    }
                });
                return allPoints;
            }
        }
        return initialCollectionPoints;
    });

    useEffect(() => {
        if (typeof window !== 'undefined' && points.length > 0) {
            // Salva apenas os pontos que não são mockados
            const userPoints = points.filter(point => 
                !initialCollectionPoints.some(mockPoint => mockPoint.id === point.id)
            );
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userPoints));
        }
    }, [points]);

    const addCollectionPoint = (newPoint: CollectionPoint) => {
        setPoints(prevPoints => {
            const updatedPoints = [...prevPoints, newPoint];
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