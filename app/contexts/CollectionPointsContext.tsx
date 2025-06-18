'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { CollectionPoint } from '@/types/collection-point';
import { collectionPoints as initialCollectionPoints } from '@/data/mockCollectionPoints';
import { normalizeText } from '@/utils/text';

const LOCAL_STORAGE_KEY = 'recicla_collection_points';

interface CollectionPointsContextType {
  points: CollectionPoint[];
  totalPoints: number;
  filteredCount: number;
  addCollectionPoint: (point: CollectionPoint) => void;
  filterPoints: (query: string) => CollectionPoint[];
}

const CollectionPointsContext = createContext<
  CollectionPointsContextType | undefined
>(undefined);

export function CollectionPointsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [points, setPoints] = useState<CollectionPoint[]>(() => {
    if (typeof window === 'undefined') return initialCollectionPoints;

    const savedPoints = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedPoints) {
      try {
        const parsedPoints = JSON.parse(savedPoints);
        const mockPointsIds = new Set(initialCollectionPoints.map((p) => p.id));
        const userPoints = parsedPoints.filter(
          (p: CollectionPoint) => !mockPointsIds.has(p.id)
        );
        return [...initialCollectionPoints, ...userPoints];
      } catch (error) {
        console.error('Erro ao carregar pontos do localStorage:', error);
        return initialCollectionPoints;
      }
    }
    return initialCollectionPoints;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mockPointsIds = new Set(initialCollectionPoints.map((p) => p.id));
    const userPoints = points.filter((p) => !mockPointsIds.has(p.id));

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userPoints));
  }, [points]);

  const addCollectionPoint = useCallback((point: CollectionPoint) => {
    setPoints((prevPoints) => {
      const exists = prevPoints.some((p) => p.id === point.id);
      if (exists) return prevPoints;
      return [...prevPoints, { ...point }];
    });
  }, []);

  const filterPoints = useCallback(
    (query: string) => {
      if (!query) return points;
      const normalizedQuery = normalizeText(query);
      return points.filter(
        (point) =>
          normalizeText(point.neighborhood).includes(normalizedQuery) ||
          normalizeText(point.street).includes(normalizedQuery) ||
          normalizeText(point.city).includes(normalizedQuery)
      );
    },
    [points]
  );

  const value = {
    points,
    totalPoints: points.length,
    filteredCount: points.length,
    addCollectionPoint,
    filterPoints,
  };

  return (
    <CollectionPointsContext.Provider value={value}>
      {children}
    </CollectionPointsContext.Provider>
  );
}

export function useCollectionPoints(query: string = '') {
  const context = useContext(CollectionPointsContext);
  if (context === undefined) {
    throw new Error(
      'useCollectionPoints must be used within a CollectionPointsProvider'
    );
  }

  const filteredPoints = context.filterPoints(query);
  return {
    points: filteredPoints,
    totalPoints: context.totalPoints,
    filteredCount: filteredPoints.length,
    addCollectionPoint: context.addCollectionPoint,
  };
}
