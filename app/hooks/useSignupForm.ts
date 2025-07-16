import { useRouter } from 'next/navigation';
import { registerUser } from '@/lib/api';
import { signupSchema, SignupFormData } from '@/lib/schemas';
import { useForm } from './useForm';

export function useSignupForm() {
  const router = useRouter();

  return useForm<SignupFormData, void>({
    initialData: {
      name: '',
      email: '',
      password: '',
      cpf: '',
      birthDate: '',
      cep: '',
      city: '',
      state: '',
      street: '',
    },
    schema: signupSchema,
    onSubmit: async (data: SignupFormData) => {
      await registerUser(data);
    },
    onSuccess: () => {
      router.push('/login?status=success');
    },
  });
}
