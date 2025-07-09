import { ReactNode } from 'react';

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  name: string;
  email: string;
  cpf: string;
  birthDate: string;
  cep: string;
  city: string;
  state: string;
  street: string;
  password: string;
}

export interface FormFieldProps {
  id: string;
  type: string;
  name: string;
  placeholder: string;
  required?: boolean;
  minLength?: number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  icon?: ReactNode;
  className?: string;
  containerClassName?: string;
  disabled?: boolean;
}
