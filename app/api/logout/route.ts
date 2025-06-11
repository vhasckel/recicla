import { NextResponse } from 'next/server';

// Rota de logout mockada
export async function POST() {
  // Cria uma resposta JSON com mensagem de sucesso
  const response = NextResponse.json({ message: 'Logout realizado!' });
  // Remove o cookie 'token' (define como vazio e expira imediatamente)
  response.cookies.set('token', '', { httpOnly: true, path: '/', maxAge: 0 });
  return response;
} 