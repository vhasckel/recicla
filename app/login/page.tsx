import { Suspense } from 'react';
import LoginForm from '@/components/features/auth/login-form';

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-primary p-3 md:h-36">
          <div className="w-32 text-white md:w-36"></div>
        </div>
        <Suspense
          fallback={
            <div className="flex h-screen w-full items-center justify-center bg-gray-100">
              <p className="text-lg text-gray-600">Carregando...</p>
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
