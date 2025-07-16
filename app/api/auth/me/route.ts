import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/types/user';
import { AUTH_MESSAGES } from '@/constants/messages';
import { API_BASE_URL, API_ENDPOINTS } from '@/constants/api';

export async function GET(request: NextRequest) {
  try {
    // extrair o token do header Authorization
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Token não fornecido' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);

    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ME}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const userData = await response.json();

      const user: User = {
        id: userData.id,
        name: userData.full_name || 'Usuário',
        email: userData.email,
        cpf: userData.cpf || '',
        birthDate: userData.birth_date || '',
        cep: userData.cep || '',
        city: userData.city || '',
        state: userData.state || '',
        street: userData.street || '',
        createdAt: new Date(userData.created_at),
        updatedAt: new Date(userData.updated_at || userData.created_at),
      };

      return NextResponse.json({
        success: true,
        data: user,
        message: AUTH_MESSAGES.USER_SUCCESS,
      });
    } else {
      const errorData = await response.json();
      return NextResponse.json(
        {
          success: false,
          message: errorData.detail || AUTH_MESSAGES.USER_FETCH_ERROR,
        },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error(AUTH_MESSAGES.USER_FETCH_ERROR, error);
    return NextResponse.json(
      {
        success: false,
        message: AUTH_MESSAGES.INTERNAL_ERROR,
      },
      { status: 500 }
    );
  }
}
