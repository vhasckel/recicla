import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { connectToDatabase } from '@/utils/database';
import User from '@/models/User';

export async function POST(req: NextRequest) {
    await connectToDatabase();

    try {
        const { email, password } = await req.json();

        // 1. Encontrar o usuário pelo email
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return NextResponse.json({ message: 'Credenciais inválidas' }, { status: 401 });
        }

        // 2. Comparar a senha fornecida com a senha criptografada
        const passwordMatch = await bcrypt.compare(password, user.password as string); // Assumindo que user.password existe

        if (!passwordMatch) {
            return NextResponse.json({ message: 'Credenciais inválidas' }, { status: 401 });
        }

        // 3. Login bem-sucedido (TODO: Implementar lógica de sessão/JWT aqui)
        console.log('Usuário logado com sucesso:', user.email);

        return NextResponse.json({ message: 'Login bem-sucedido!', user: { id: user.id, email: user.email, name: user.name } }, { status: 200 });

    } catch (error) {
        console.error('Erro ao tentar login:', error);
        return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
    }
} 