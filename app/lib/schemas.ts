import { z } from 'zod';

export const signupSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome deve ter pelo menos 3 caracteres.' }),
  email: z.string().email({ message: 'Por favor, insira um email válido.' }),

  cpf: z
    .string()
    .transform((cpf) => cpf.replace(/\D/g, '')) // remove tudo que não for dígito
    .pipe(z.string().length(11, { message: 'O CPF deve ter 11 dígitos.' })),

  birthDate: z
    .string()
    .min(1, { message: 'A data de nascimento é obrigatória.' }),

  cep: z
    .string()
    .transform((cep) => cep.replace(/\D/g, ''))
    .pipe(z.string().length(8, { message: 'O CEP deve ter 8 dígitos.' })),

  city: z.string().min(1, { message: 'A cidade é obrigatória.' }),
  state: z.string().min(1, { message: 'O estado é obrigatório.' }),
  street: z.string().min(1, { message: 'A rua é obrigatória.' }),

  password: z
    .string()
    .min(8, { message: 'A senha deve ter pelo menos 6 caracteres.' }),
});

export const loginSchema = z.object({
  email: z.string().email({ message: 'Por favor, insira um email válido.' }),
  password: z.string().min(1, { message: 'A senha é obrigatória.' }),
});

export type SignupFormData = z.infer<typeof signupSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
