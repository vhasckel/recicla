import { CollectionPoint } from './collection-point';

export interface MapState {
  center: [number, number];
  zoom: number;
  selectedPoint: CollectionPoint | null;
}
