import api from './api';
import { LoginFormData } from '../schemas';
import { handleApiCall } from './userApi';

interface LoginResponse {
  access_token: string;
  token_type: string;
}

export async function loginUser(
  credentials: LoginFormData
): Promise<LoginResponse> {
  const response = await handleApiCall(
    api.post<LoginResponse>('/auth/login', credentials),
    'Email ou senha inválidos.'
  );
  return response.data;
}
