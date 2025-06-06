import { useState, useCallback } from "react";

type FormErrors<T> = Partial<Record<keyof T, string>>;

export function useForm<T extends Record<string, any>>(initialState: T) {
    const [formData, setFormData] = useState<T>(initialState);
    const [errors, setErrors] = useState<FormErrors<T>>({});

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Limpa o erro do campo quando ele é alterado
        setErrors(prev => ({ ...prev, [name]: undefined }));
    }, []);

    const resetForm = useCallback(() => {
        setFormData(initialState);
        setErrors({});
    }, [initialState]);

    const setFieldError = useCallback((field: keyof T, error: string) => {
        setErrors(prev => ({ ...prev, [field]: error }));
    }, []);

    const validateField = useCallback((field: keyof T, validator: (value: any) => string | undefined) => {
        const error = validator(formData[field]);
        if (error) {
            setFieldError(field, error);
            return false;
        }
        return true;
    }, [formData, setFieldError]);

    return {
        formData,
        errors,
        setErrors,
        handleChange,
        resetForm,
        setFieldError,
        validateField,
        setFormData
    };
}