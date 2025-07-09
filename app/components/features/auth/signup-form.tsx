'use client';

import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { useSignupForm } from '@/hooks/useSignupForm';

type FormFieldKey =
  | 'name'
  | 'email'
  | 'cpf'
  | 'birthDate'
  | 'cep'
  | 'city'
  | 'state'
  | 'street'
  | 'password';

export default function SignupForm() {
  const {
    formData,
    errors,
    apiError,
    isSubmitting,
    handleChange,
    handleSubmit,
  } = useSignupForm();

  const formFields: { id: FormFieldKey; type: string; placeholder: string }[] =
    [
      { id: 'name', type: 'text', placeholder: 'Nome completo' },
      { id: 'email', type: 'email', placeholder: 'Seu endereço de email' },
      { id: 'cpf', type: 'text', placeholder: 'CPF (somente números)' },
      { id: 'birthDate', type: 'date', placeholder: 'Data de nascimento' },
      { id: 'cep', type: 'text', placeholder: 'CEP (somente números)' },
      { id: 'city', type: 'text', placeholder: 'Cidade' },
      { id: 'state', type: 'text', placeholder: 'Estado' },
      { id: 'street', type: 'text', placeholder: 'Rua' },
      {
        id: 'password',
        type: 'password',
        placeholder: 'Crie uma senha (mín. 6 caracteres)',
      },
    ];

  return (
    <form className="space-y-3" onSubmit={handleSubmit} noValidate>
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl">Crie uma conta.</h1>
        <div className="w-full">
          {formFields.map((field) => (
            <FormField
              key={field.id}
              id={field.id}
              name={field.id}
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.id]}
              error={errors[field.id]}
              onChange={handleChange}
              required
            />
          ))}
        </div>

        {apiError && (
          <p className="mt-2 text-center text-sm text-red-500">{apiError}</p>
        )}

        <Button className="mt-4 w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
          {!isSubmitting && (
            <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
          )}
        </Button>
      </div>
    </form>
  );
}
