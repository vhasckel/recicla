import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Simular dados de usuário
    const user = {
      id: '1',
      name: 'Usuário Exemplo',
      email: 'usuario@exemplo.com',
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: user,
      message: 'Usuário encontrado com sucesso',
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Erro ao buscar usuário',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Simular criação de usuário
    const newUser = {
      id: Date.now().toString(),
      name: body.name,
      email: body.email,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        success: true,
        data: newUser,
        message: 'Usuário criado com sucesso',
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Erro ao criar usuário',
      },
      { status: 500 }
    );
  }
}
