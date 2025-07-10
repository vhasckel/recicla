import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/lib/api';
import { loginSchema, LoginFormData } from '@/lib/schemas';

type FormErrors = Partial<Record<keyof LoginFormData, string>>;

const initialFormData: LoginFormData = {
  email: '',
  password: '',
};

export function useLogin() {
  const [formData, setFormData] = useState<LoginFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setErrors({});
      setApiError(null);

      const result = loginSchema.safeParse(formData);

      if (!result.success) {
        const fieldErrors: FormErrors = {};
        for (const issue of result.error.issues) {
          const path = issue.path[0] as keyof LoginFormData;
          fieldErrors[path] = issue.message;
        }
        setErrors(fieldErrors);
        return;
      }

      setIsSubmitting(true);
      try {
        await loginUser(result.data);
        router.push('/dashboard');
      } catch (err) {
        if (err instanceof Error) {
          setApiError(err.message);
        } else {
          setApiError('Ocorreu um erro inesperado.');
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, router]
  );

  return {
    formData,
    errors,
    apiError,
    isSubmitting,
    handleChange,
    handleSubmit,
  };
}
