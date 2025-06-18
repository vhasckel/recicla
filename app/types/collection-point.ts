export interface CollectionPoint {
  id: string;
  name: string;
  cep: string;
  city: string;
  neighborhood: string;
  street: string;
  number?: string;
  lat: number;
  lng: number;
  materials: string[];
}
