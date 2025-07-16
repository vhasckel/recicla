import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CollectionPointsProvider } from './contexts/CollectionPointsContext';
import { AuthProvider } from './contexts/AuthContext';
import { Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Recicla',
  description: 'Encontre pontos de coleta de recicláveis próximos a você',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AuthProvider>
          <CollectionPointsProvider>
            <Suspense
              fallback={
                <div className="flex h-screen w-full items-center justify-center bg-gray-100">
                  <p className="text-lg text-gray-600">Carregando...</p>
                </div>
              }
            >
              {children}
            </Suspense>
          </CollectionPointsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
