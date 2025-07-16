'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
} from 'react';
import { User } from '@/types/user';
import { API_ENDPOINTS } from '@/constants/api';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (token: string) => void;
  logout: () => void;
  updateUser: (userData: User) => void;
  refetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useCallback para que a função não seja recriada a cada render
  const fetchCurrentUser = useCallback(async () => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(API_ENDPOINTS.ME, {
        /* ... headers ... */
      });
      if (response.ok) {
        const responseData = await response.json();
        if (responseData.success && responseData.data) {
          setUser(responseData.data);
        } else {
          throw new Error(
            responseData.message || 'Erro ao buscar dados do usuário'
          );
        }
      } else {
        localStorage.removeItem('auth_token');
        setUser(null);
      }
    } catch (err) {
      console.error('Erro ao buscar usuário:', err);
      setError('Erro ao carregar dados do usuário');
      localStorage.removeItem('auth_token');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  const login = useCallback(
    (token: string) => {
      localStorage.setItem('auth_token', token);
      fetchCurrentUser();
    },
    [fetchCurrentUser]
  );

  const logout = useCallback(() => {
    localStorage.removeItem('auth_token');
    setUser(null);
    setError(null);
  }, []);

  const updateUser = useCallback((userData: User) => {
    setUser(userData);
  }, []);

  // memoizar o objeto de valor para evitar re-renders desnecessários nos consumidores
  const value = useMemo(
    () => ({
      user,
      isLoading,
      error,
      login,
      logout,
      updateUser,
      refetchUser: fetchCurrentUser,
    }),
    [user, isLoading, error, login, logout, updateUser, fetchCurrentUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
