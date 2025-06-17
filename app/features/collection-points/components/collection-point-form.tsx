'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/common/button'
import { useRouter } from 'next/navigation'
import { FormField } from '@/components/common/form-field'
import { MultiSelect } from '@/components/multi-select'
import { useCollectionPoints } from '@/contexts/CollectionPointsContext'
import { CollectionPoint } from '@/types/collection-point'
import { geocodeAddress } from '@/lib/geocoding'
import { fetchAddressByCep } from '@/lib/viacep'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { ReadonlyURLSearchParams } from 'next/navigation'

// Lista de materiais predefinidos no formato para react-select
const AVAILABLE_MATERIALS = [
  { value: 'Plástico', label: 'Plástico' },
  { value: 'Papel', label: 'Papel' },
  { value: 'Vidro', label: 'Vidro' },
  { value: 'Metal', label: 'Metal' },
  { value: 'Orgânico', label: 'Orgânico' },
  { value: 'Eletrônicos', label: 'Eletrônicos' },
  { value: 'Óleo de Cozinha', label: 'Óleo de Cozinha' },
]

interface CollectionPointFormProps {
  searchParams: ReadonlyURLSearchParams;
}

export default function CollectionPointForm({ searchParams }: CollectionPointFormProps) {
  const [cep, setCep] = useState('')
  const [city, setCity] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [street, setStreet] = useState('')
  const [number, setNumber] = useState<string | ''>('')
  const [materials, setMaterials] = useState<string[]>([])
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [loadingCep, setLoadingCep] = useState(false)
  const [cepError, setCepError] = useState<string | null>(null)
  const router = useRouter()
  const { addCollectionPoint } = useCollectionPoints('')
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    const processCep = async () => {
      if (cep.length !== 8) {
        setCepError(null)
        setCity('')
        setNeighborhood('')
        setStreet('')
        return
      }

      setLoadingCep(true)
      setCepError(null)

      const addressData = await fetchAddressByCep(cep)

      if (addressData === null) {
        setCepError('CEP não encontrado ou erro ao buscar dados.')
        setCity('')
        setNeighborhood('')
        setStreet('')
      } else {
        setCity(addressData.localidade || '')
        setNeighborhood(addressData.bairro || '')
        setStreet(addressData.logradouro || '')
      }
      setLoadingCep(false)
    }

    processCep()
  }, [cep])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSuccess('')
    setError('')

    if (!cep || !city || !neighborhood || !street || materials.length === 0) {
      setError('Preencha todos os campos obrigatórios e selecione ao menos um material.')
      return
    }

    const fullAddressString = `${number ? number + ', ' : ''}${street}, ${neighborhood}, ${city}, ${cep}`
    const coords = await geocodeAddress(fullAddressString)

    if (coords === null) {
      setError('Não foi possível encontrar as coordenadas para o endereço fornecido ou erro de conexão.')
      return
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
    }

    addCollectionPoint(newPoint)

    setSuccess('Ponto cadastrado com sucesso!')
    setTimeout(() => {
      if (isMobile) {
        router.push(`/collection-points?point=${newPoint.id}`)
      } else {
        router.push(`/dashboard?view=collection-points&point=${newPoint.id}`)
      }
    }, 1500)
  }

  const handleMaterialChange = (selectedOptions: string[]) => {
    if (selectedOptions) {
      setMaterials(selectedOptions)
    } else {
      setMaterials([])
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">{success}</p>}
      <Button type="submit" className="w-full">
        Cadastrar ponto
      </Button>
    </form>
  )
} 