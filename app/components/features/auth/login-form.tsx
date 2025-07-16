'use client';

import { AtSymbolIcon, KeyIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { useLogin } from '@/hooks/useLogin';

export default function LoginForm(): JSX.Element {
  const {
    formData,
    errors,
    apiError,
    isSubmitting,
    handleChange,
    handleSubmit,
  } = useLogin();

  const formFields = [
    {
      id: 'email',
      type: 'email',
      name: 'email',
      placeholder: 'Seu endereço de email',
      value: formData.email,
      error: errors.email,
      icon: <AtSymbolIcon />,
    },
    {
      id: 'password',
      type: 'password',
      name: 'password',
      placeholder: 'Entre com sua senha',
      value: formData.password,
      error: errors.password,
      icon: <KeyIcon />,
    },
  ];

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl">Faça login para continuar.</h1>
        <div className="w-full">
          {formFields.map((field) => (
            <FormField
              key={field.id}
              {...field}
              onChange={handleChange}
              disabled={isSubmitting}
              required
            />
          ))}
        </div>

        {apiError && (
          <p className="mt-2 text-center text-sm text-red-500">{apiError}</p>
        )}

        <Button className="mt-4 w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Entrando...' : 'Log in'}
          {!isSubmitting && <ArrowRightIcon className="ml-auto h-5 w-5" />}
        </Button>
        <div className="flex h-8 items-end">
          <Link href="/register" className="flex w-full justify-center gap-2">
            <p className="text-sm text-gray-500">Não tem uma conta?</p>
            <span className="text-sm text-green-500">Crie uma agora</span>
          </Link>
        </div>
      </div>
    </form>
  );
}
