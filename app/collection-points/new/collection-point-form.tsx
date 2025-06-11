'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/common/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormField } from '@/components/common/form-field';
import { MultiSelect } from '@/components/multi-select';
import { useCollectionPoints } from '@/hooks/useCollectionPoints';
import { CollectionPoint } from '@/types/collection-point';
import { geocodeAddress } from '@/lib/geocoding';
import { fetchAddressByCep } from '@/lib/viacep';

// Lista de materiais predefinidos no formato para react-select
const AVAILABLE_MATERIALS = [
  { value: 'Plástico', label: 'Plástico' },
  { value: 'Papel', label: 'Papel' },
  { value: 'Vidro', label: 'Vidro' },
  { value: 'Metal', label: 'Metal' },
  { value: 'Orgânico', label: 'Orgânico' },
  { value: 'Eletrônicos', label: 'Eletrônicos' },
  { value: 'Óleo de Cozinha', label: 'Óleo de Cozinha' },
];

export default function CollectionPointForm() {
  const [cep, setCep] = useState('');
  const [city, setCity] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState<string | ''>('');
  const [materials, setMaterials] = useState<string[]>([]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loadingCep, setLoadingCep] = useState(false);
  const [cepError, setCepError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addCollectionPoint } = useCollectionPoints(searchParams);

  useEffect(() => {
    const processCep = async () => {
      if (cep.length !== 8) {
        setCepError(null);
        setCity('');
        setNeighborhood('');
        setStreet('');
        return;
      }

      setLoadingCep(true);
      setCepError(null);

      const addressData = await fetchAddressByCep(cep);

      if (addressData === null) {
        setCepError('CEP não encontrado ou erro ao buscar dados.');
        setCity('');
        setNeighborhood('');
        setStreet('');
      } else {
        setCity(addressData.localidade || '');
        setNeighborhood(addressData.bairro || '');
        setStreet(addressData.logradouro || '');
      }
      setLoadingCep(false);
    };

    processCep();
  }, [cep]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    if (!cep || !city || !neighborhood || !street || materials.length === 0) {
      setError('Preencha todos os campos obrigatórios e selecione ao menos um material.');
      return;
    }

    const fullAddressString = `${number ? number + ', ' : ''}${street}, ${neighborhood}, ${city}, ${cep}`;
    const coords = await geocodeAddress(fullAddressString);

    if (coords === null) {
      setError('Não foi possível encontrar as coordenadas para o endereço fornecido ou erro de conexão.');
      return;
    }

    const newPoint: CollectionPoint = {
      id: Date.now().toString(),
      name: neighborhood,
      cep,
      city,
      neighborhood,
      street,
      number: number || undefined,
      lat: coords.lat,
      lng: coords.lng,
      materials,
    };

    addCollectionPoint(newPoint);

    console.log('Novo Ponto de Coleta (simulado):', newPoint);

    setSuccess('Ponto cadastrado com sucesso!');
    setTimeout(() => {
      router.push('/collection-points');
    }, 1500);
  };

  const handleMaterialChange = (selectedOptions: string[]) => {
    if (selectedOptions) {
      setMaterials(selectedOptions);
    } else {
      setMaterials([]);
    }
  };

  return (
    <main className="flex flex-col items-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Cadastrar novo ponto de coleta</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md bg-white p-6 rounded-lg shadow">
        <FormField
          id="cep"
          name="cep"
          type="text"
          placeholder="CEP"
          value={cep}
          onChange={e => setCep(e.target.value)}
          required
        />
        {loadingCep && <p className="text-blue-500 text-sm">Buscando endereço...</p>}
        {cepError && <p className="text-red-500 text-sm">{cepError}</p>}
        <FormField
          id="city"
          name="city"
          type="text"
          placeholder="Cidade"
          value={city}
          onChange={e => setCity(e.target.value)}
          required
        />
        <FormField
          id="neighborhood"
          name="neighborhood"
          type="text"
          placeholder="Bairro"
          value={neighborhood}
          onChange={e => setNeighborhood(e.target.value)}
          required
        />
        <FormField
          id="street"
          name="street"
          type="text"
          placeholder="Rua"
          value={street}
          onChange={e => setStreet(e.target.value)}
          required
        />
        <FormField
          id="number"
          name="number"
          type="text"
          placeholder="Número (opcional)"
          value={number}
          onChange={e => setNumber(e.target.value)}
        />
        <label htmlFor="materials" className="block text-sm font-medium text-gray-700 mt-1">
          Materiais aceitos:
        </label>
        <MultiSelect
          options={AVAILABLE_MATERIALS}
          onValueChange={handleMaterialChange}
          defaultValue={materials}
          placeholder="Selecione os materiais..."
          className="w-full"
        />

        <Button type="submit">Cadastrar</Button>
        {success && <p className="text-green-600">{success}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </main>
  );
} 