import { User } from '@/types/user';
import api from './api';
import axios from 'axios';

interface ApiErrorResponse {
  message: string;
}

export async function handleApiCall<T>(
  apiCall: Promise<T>,
  genericErrorMessage: string
): Promise<T> {
  try {
    return await apiCall;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('API Error:', error.response);
      const apiError = error.response.data as ApiErrorResponse;
      throw new Error(apiError.message || genericErrorMessage);
    }
    console.error('Network or other error:', error);
    throw new Error('Não foi possível conectar ao servidor.');
  }
}

export async function registerUser(userData: Omit<User, 'id'>): Promise<User> {
  const payload = {
    email: userData.email,
    full_name: userData.name,
    password: userData.password,
    cpf: userData.cpf,
    birth_date: userData.birthDate,
    cep: userData.cep,
    city: userData.city,
    state: userData.state,
    street: userData.street,
  };
  const response = await handleApiCall(
    api.post<User>('/user', payload),
    'Falha ao criar usuário.'
  );
  return response.data;
}

export async function fetchUserProfile(userId: number): Promise<User> {
  const response = await handleApiCall(
    api.get<User>(`/user/${userId}`),
    'Falha ao buscar usuário.'
  );
  return response.data;
}
