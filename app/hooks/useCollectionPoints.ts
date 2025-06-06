import { ReadonlyURLSearchParams } from "next/navigation";
import { collectionPoints } from "@/data/mockCollectionPoints";
import { normalizeText } from "@/utils/text";

export function useCollectionPoints(searchParams: ReadonlyURLSearchParams) {
    const query = normalizeText(searchParams.get('query') || '');

    const filteredPoints = collectionPoints.filter((point) => {
        if (!query) return true;
        
        const normalizedAddress = normalizeText(point.address);
        const normalizedName = normalizeText(point.name);
        const normalizedMaterials = point.materials.map(normalizeText);

        return normalizedAddress.includes(query) || 
               normalizedName.includes(query) ||
               normalizedMaterials.some(material => material.includes(query));
    });

    return {
        points: filteredPoints,
        totalPoints: collectionPoints.length,
        filteredCount: filteredPoints.length
    };
} 