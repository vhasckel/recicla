'use client';

import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { MultiSelect } from '@/components/multi-select/multi-select';
import { useCollectionPointForm } from '@/hooks/useCollectionPointForm';
import { AVAILABLE_MATERIALS } from '@/constants/materials';

export default function CollectionPointForm() {
  const { formData, state, handleInputChange, handleSubmit, setFormData } =
    useCollectionPointForm();

  return (
    <main className="flex w-full flex-col items-center p-4">
      <h1 className="mb-4 text-2xl font-bold">
        Cadastrar novo ponto de coleta
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-col gap-4 rounded-lg bg-white p-6 shadow-md"
      >
        <FormField
          id="cep"
          name="cep"
          type="text"
          placeholder="CEP (apenas números)"
          value={formData.cep}
          onChange={handleInputChange}
          required
        />
        {state.isCepLoading && (
          <p className="text-sm text-blue-500">Buscando endereço...</p>
        )}
        {state.cepError && (
          <p className="text-sm text-red-500">{state.cepError}</p>
        )}

        <FormField
          id="city"
          name="city"
          type="text"
          placeholder="Cidade"
          value={formData.city}
          onChange={handleInputChange}
          required
        />
        <FormField
          id="neighborhood"
          name="neighborhood"
          type="text"
          placeholder="Bairro"
          value={formData.neighborhood}
          onChange={handleInputChange}
          required
        />
        <FormField
          id="street"
          name="street"
          type="text"
          placeholder="Rua"
          value={formData.street}
          onChange={handleInputChange}
          required
        />
        <FormField
          id="number"
          name="number"
          type="text"
          placeholder="Número (opcional)"
          value={formData.number}
          onChange={handleInputChange}
        />

        <label
          htmlFor="materials"
          className="-mb-2 block text-sm font-medium text-gray-700"
        >
          Materiais aceitos:
        </label>
        <MultiSelect
          options={AVAILABLE_MATERIALS}
          defaultValue={formData.materials}
          placeholder="Selecione os materiais..."
          onValueChange={(selected) =>
            setFormData((prev) => ({ ...prev, materials: selected }))
          }
        />

        <Button
          type="submit"
          disabled={state.isSubmitting || state.isCepLoading}
        >
          {state.isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
        </Button>

        {state.success && (
          <p className="text-center text-green-600">{state.success}</p>
        )}
        {state.error && (
          <p className="text-center text-red-600">{state.error}</p>
        )}
      </form>
    </main>
  );
}
