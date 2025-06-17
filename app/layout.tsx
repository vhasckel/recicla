import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CollectionPointsProvider } from './contexts/CollectionPointsContext';

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
        <CollectionPointsProvider>
          {children}
        </CollectionPointsProvider>
      </body>
    </html>
  );
}
