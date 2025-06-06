import type { Metadata } from 'next';
import { nunito } from './styles/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Recicla',
  description: 'Sua plataforma de reciclagem',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${nunito.variable}`}>
      <body className={`${nunito.className}`}>{children}</body>
    </html>
  );
}
