'use client';

import { useState } from 'react';
import { Button } from '@/components/common/button';
import { useRouter } from 'next/navigation';
import { FormField } from '@/components/common/form-field';
import { MultiSelect } from '@/components/multi-select';

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

export default function NewCollectionPoint() {
  // Estados para os campos do formulário
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [lat, setLat] = useState<number | ''>('');
  const [lng, setLng] = useState<number | ''>('');
  // O estado materials continua sendo um array de strings (apenas os valores)
  const [materials, setMaterials] = useState<string[]>([]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // Função chamada ao enviar o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    // Validação dos campos (materiais não pode ser vazio)
    if (!name || !address || lat === '' || lng === '' || materials.length === 0) {
      setError('Preencha todos os campos e selecione ao menos um material.');
      return;
    }

    // Preparar dados para simulação (em um backend real, enviaria para a API)
    const newPoint = {
      name,
      address,
      lat: Number(lat),
      lng: Number(lng),
      materials, // materials já é um array de strings
    };

    console.log('Novo Ponto de Coleta (simulado):', newPoint);

    // Simula sucesso no cadastro
    setSuccess('Ponto cadastrado com sucesso!');
    // Redireciona para a listagem após 1,5s
    setTimeout(() => {
      router.push('/collection-points');
    }, 1500);
  };

  // Função para lidar com a seleção múltipla de materiais usando react-select
  const handleMaterialChange = (selectedOptions: any) => {
    // selectedOptions será um array de { value, label } ou null
    if (selectedOptions) {
      setMaterials(selectedOptions.map((option: { value: string }) => option.value));
    } else {
      setMaterials([]);
    }
  };

  return (
    <main className="flex flex-col items-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Cadastrar novo ponto de coleta</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md bg-white p-6 rounded-lg shadow">
        <FormField
          id="name"
          name="name"
          type="text"
          placeholder="Nome do Ponto"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <FormField
          id="address"
          name="address"
          type="text"
          placeholder="Endereço Completo"
          value={address}
          onChange={e => setAddress(e.target.value)}
          required
        />
        <FormField
          id="lat"
          name="lat"
          type="number"
          placeholder="Latitude"
          value={lat.toString()}
          onChange={e => setLat(Number(e.target.value))}
          required
        />
        <FormField
          id="lng"
          name="lng"
          type="number"
          placeholder="Longitude"
          value={lng.toString()}
          onChange={e => setLng(Number(e.target.value))}
          required
        />
        {/* Componente Select do react-select para materiais */}
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
        {/* Mensagens de feedback */}
        {success && <p className="text-green-600">{success}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </main>
  );
} 