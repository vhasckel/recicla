import { NextRequest, NextResponse } from 'next/server';

// Rota de login mockada
export async function POST(req: NextRequest) {
  // Lê os dados enviados pelo frontend
  const { email, password } = await req.json();

  // Simula autenticação: aceita apenas um usuário e senha fixos
  if (email === 'teste@teste.com' && password === '123456') {
    // Gera um token fake (em produção, use JWT de verdade)
    const fakeToken = 'fake-jwt-token';
    // Cria a resposta JSON
    const response = NextResponse.json({ message: 'Login bem-sucedido!' });
    // Seta o cookie 'token' (HttpOnly, válido por 7 dias)
    response.cookies.set('token', fakeToken, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    });
    return response;
  }
  // Se as credenciais estiverem erradas, retorna erro
  return NextResponse.json({ message: 'Credenciais inválidas' }, { status: 401 });
} 