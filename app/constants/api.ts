export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export const API_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/user',
  ME: '/auth/me',
  USER: (id: number) => `/user/${id}`,
};
