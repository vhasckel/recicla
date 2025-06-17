'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/common/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormField } from '@/components/common/form-field';
import { MultiSelect } from '@/components/multi-select';
import { CollectionPoint } from '@/types/collection-point';
import { geocodeAddress } from '@/lib/geocoding';
import { fetchAddressByCep } from '@/lib/viacep';
import { useCollectionPoints } from '@/contexts/CollectionPointsContext';

const AVAILABLE_MATERIALS = [
  { value: 'Plástico', label: 'Plástico' },
  { value: 'Papel', label: 'Papel' },
  { value: 'Vidro', label: 'Vidro' },
  { value: 'Metal', label: 'Metal' },
  { value: 'Orgânico', label: 'Orgânico' },
  { value: 'Eletrônicos', label: 'Eletrônicos' },
  { value: 'Óleo de Cozinha', label: 'Óleo de Cozinha' },
];

interface FormData {
  cep: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
  materials: string[];
}

export default function CollectionPointForm() {
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState<FormData>({
    cep: '',
    city: '',
    neighborhood: '',
    street: '',
    number: '',
    materials: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingCep, setLoadingCep] = useState(false);
  const [error, setError] = useState('');
  const [cepError, setCepError] = useState('');
  const [success, setSuccess] = useState('');

  const router = useRouter();
  const { addCollectionPoint } = useCollectionPoints();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // O array de dependências vazio [] garante que ele só executa na montagem do componente.
  useEffect(() => {
    const initialCep = searchParams.get('cep');
    const initialMaterials = searchParams.get('materials');

    if (initialCep || initialMaterials) {
      setFormData(prev => ({
        ...prev,
        cep: initialCep ? initialCep.replace(/\D/g, '').substring(0, 8) : prev.cep,
        materials: initialMaterials ? initialMaterials.split(',') : prev.materials,
      }));
    }
  }, []);

  // A dependência [formData.cep] garante a re-execução quando o usuário digita.
  useEffect(() => {
    if (formData.cep.length !== 8) {
      setCepError('');
      return;
    }

    const handler = setTimeout(async () => {
      setLoadingCep(true);
      setCepError('');
      const addressData = await fetchAddressByCep(formData.cep);

      if (addressData) {
        setFormData(prev => ({
          ...prev,
          city: addressData.localidade || '',
          neighborhood: addressData.bairro || '',
          street: addressData.logradouro || '',
        }));
      } else {
        setCepError('CEP não encontrado.');
      }
      setLoadingCep(false);
    }, 800);

    // Função de limpeza: cancela o timeout anterior se o usuário digitar novamente
    return () => {
      clearTimeout(handler);
    };
  }, [formData.cep]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError('');
    setSuccess('');

    if (!formData.cep || !formData.city || !formData.street || formData.materials.length === 0) {
      setError('Preencha todos os campos obrigatórios e selecione ao menos um material.');
      setIsSubmitting(false);
      return;
    }

    const fullAddressString = `${formData.number ? formData.number + ', ' : ''}${formData.street}, ${formData.neighborhood}, ${formData.city}, ${formData.cep}`;
    const coords = await geocodeAddress(fullAddressString);

    if (!coords) {
      setError('Não foi possível encontrar as coordenadas para o endereço. Verifique os dados.');
      setIsSubmitting(false);
      return;
    }

    const newPoint: CollectionPoint = {
      id: Date.now().toString(),
      name: `Ponto em ${formData.neighborhood}`,
      lat: coords.lat,
      lng: coords.lng,
      materials: formData.materials,
      cep: formData.cep,
      city: formData.city,
      neighborhood: formData.neighborhood,
      street: formData.street,
      number: formData.number || undefined,
    };

    addCollectionPoint(newPoint);
    setSuccess('Ponto cadastrado com sucesso! Redirecionando...');
    
    setTimeout(() => {
      router.push('/collection-points');
    }, 2000);
  };

  return (
    <main className="flex flex-col items-center w-full p-4">
      <h1 className="text-2xl font-bold mb-4">Cadastrar novo ponto de coleta</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <FormField
          id="cep"
          name="cep"
          type="text"
          placeholder="CEP (apenas números)"
          value={formData.cep}
          onChange={handleInputChange}
          required
        />
        {loadingCep && <p className="text-blue-500 text-sm">Buscando endereço...</p>}
        {cepError && <p className="text-red-500 text-sm">{cepError}</p>}
        
        <FormField id="city" name="city" type="text" placeholder="Cidade" value={formData.city} onChange={handleInputChange} required />
        <FormField id="neighborhood" name="neighborhood" type="text" placeholder="Bairro" value={formData.neighborhood} onChange={handleInputChange} required />
        <FormField id="street" name="street" type="text" placeholder="Rua" value={formData.street} onChange={handleInputChange} required />
        <FormField id="number" name="number" type="text" placeholder="Número (opcional)" value={formData.number} onChange={handleInputChange} />
        
        <label htmlFor="materials" className="block text-sm font-medium text-gray-700 -mb-2">
          Materiais aceitos:
        </label>
        <MultiSelect
          options={AVAILABLE_MATERIALS}
          onValueChange={(selected) => setFormData(prev => ({...prev, materials: selected}))}
          defaultValue={formData.materials}
          placeholder="Selecione os materiais..."
          className="w-full"
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Cadastrando...' : 'Cadastrar Ponto'}
        </Button>

        {success && <p className="text-green-600 text-center">{success}</p>}
        {error && <p className="text-red-600 text-center">{error}</p>}
      </form>
    </main>
  );
}