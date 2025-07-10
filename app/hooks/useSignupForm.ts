import { registerUser } from '@/lib/api';
import React, { useCallback, useState } from 'react';
import { signupSchema, SignupFormData } from '@/lib/schemas';
import { useRouter } from 'next/navigation';

type FormErrors = Partial<Record<keyof SignupFormData, string>>;

const initialFormData = {
  name: '',
  email: '',
  password: '',
  cpf: '',
  birthDate: '',
  cep: '',
  city: '',
  state: '',
  street: '',
};

export function useSignupForm() {
  const [formData, setFormData] = useState<SignupFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
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

      const result = signupSchema.safeParse(formData);

      if (!result.success) {
        const fieldErrors: FormErrors = {};
        for (const issue of result.error.issues) {
          const path = issue.path[0] as keyof SignupFormData;
          fieldErrors[path] = issue.message;
        }
        setErrors(fieldErrors);
        return;
      }

      setIsSubmitting(true);

      try {
        await registerUser(formData);
        router.push('/login?status=success');
      } catch (error) {
        if (error instanceof Error) {
          setApiError(error.message);
        } else {
          setApiError('Ocorreu um erro ineperado.');
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
