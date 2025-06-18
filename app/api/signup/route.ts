import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { connectToDatabase } from '@/utils/database';
import User from '@/models/User';
import { UniqueConstraintError } from 'sequelize';

export async function POST(req: NextRequest) {
  console.log('Requisição POST para /api/signup recebida.');
  await connectToDatabase(); // Garante que a conexão com o banco de dados esteja estabelecida

  try {
    const { name, email, cpf, birthDate, cep, city, state, street, password } =
      await req.json();

    // TODO: Adicionar validação de dados no servidor (ex: formato de email, CPF, etc.)

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      cpf,
      birthDate,
      cep,
      city,
      state,
      street,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: 'Usuário cadastrado com sucesso!', user: newUser },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Erro ao cadastrar usuário:', error);

    if (
      error.name === 'SequelizeUniqueConstraintError' ||
      error instanceof UniqueConstraintError
    ) {
      const field = error.errors[0].path === 'email' ? 'email' : 'CPF';
      return NextResponse.json(
        { message: `Este ${field} já está em uso.` },
        { status: 409 }
      );
    }

    // Se não for um erro de validação ou de restrição única, retorne um erro genérico
    return NextResponse.json(
      {
        message: 'Erro interno do servidor',
        error: error.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}
