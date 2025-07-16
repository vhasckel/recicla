import { useRouter } from 'next/navigation';
import { loginUser } from '@/lib/api';
import { loginSchema, LoginFormData } from '@/lib/schemas';
import { useAuth } from '@/contexts/AuthContext';
import { useForm } from './useForm';

export function useLogin() {
  const router = useRouter();
  const { login } = useAuth();

  return useForm({
    initialData: { email: '', password: '' },
    schema: loginSchema,
    onSubmit: (data: LoginFormData) => loginUser(data),
    onSuccess: (response) => {
      login(response.access_token);
      router.push('/dashboard');
    },
  });
}
