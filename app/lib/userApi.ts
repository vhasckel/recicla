import { User } from '@/types/user';
import api from './api';
import axios, { AxiosError } from 'axios';

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
  const response = await handleApiCall(
    api.post<User>('/user', userData),
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
