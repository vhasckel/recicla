import { Suspense } from 'react';
import SignupForm from '@/components/features/auth/signup-form';

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center bg-gray-100">
          <p className="text-lg text-gray-600">Carregando...</p>
        </div>
      }
    >
      <SignupForm />
    </Suspense>
  );
}
