'use client';

import { useState, useCallback, FormEvent } from 'react';
import { ZodSchema } from 'zod';

interface UseFormOptions<TFormData, TResponse> {
  initialData: TFormData;
  schema: ZodSchema<TFormData>;
  onSubmit: (data: TFormData) => Promise<TResponse>;
  onSuccess?: (response: TResponse) => void;
}

type FormErrors<T> = Partial<Record<keyof T, string>>;

export function useForm<TFormData, TResponse>({
  initialData,
  schema,
  onSubmit,
  onSuccess,
}: UseFormOptions<TFormData, TResponse>) {
  const [formData, setFormData] = useState<TFormData>(initialData);
  const [errors, setErrors] = useState<FormErrors<TFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name as keyof TFormData]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setErrors({});
      setApiError(null);

      const result = schema.safeParse(formData);

      if (!result.success) {
        const fieldErrors: FormErrors<TFormData> = {};
        result.error.issues.forEach((issue) => {
          const path = issue.path[0] as keyof TFormData;
          fieldErrors[path] = issue.message;
        });
        setErrors(fieldErrors);
        return;
      }

      setIsSubmitting(true);
      try {
        const response = await onSubmit(result.data);
        if (onSuccess) {
          onSuccess(response);
        }
      } catch (err) {
        setApiError(
          err instanceof Error ? err.message : 'Ocorreu um erro inesperado.'
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, schema, onSubmit, onSuccess]
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
