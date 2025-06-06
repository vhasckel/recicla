"use client";

import { Button } from "@/components/common/button";
import { FormField } from "@/components/common/form-field";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useForm } from "@/hooks/useForm";
import { SignupFormData } from "@/types/forms";

export default function SignupForm() {
    const { formData, errors, handleChange, validateField } = useForm<SignupFormData>({
        name: '',
        email: '',
        cpf: '',
        birthDate: '',
        cep: '',
        city: '',
        state: '',
        street: '',
        password: ''
    });

    const validateEmail = (value: string) => {
        if (!value) return 'Email é obrigatório';
        if (!value.includes('@')) return 'Email inválido';
        return undefined;
    };

    const validatePassword = (value: string) => {
        if (!value) return 'Senha é obrigatória';
        if (value.length < 6) return 'A senha deve ter pelo menos 6 caracteres';
        return undefined;
    };

    const validateRequired = (value: string, fieldName: string) => {
        if (!value) return `${fieldName} é obrigatório`;
        return undefined;
    };

    const validateCPF = (value: string) => {
        if (!value) return 'CPF é obrigatório';
        // Remove caracteres não numéricos
        const cpf = value.replace(/\D/g, '');
        if (cpf.length !== 11) return 'CPF inválido';
        return undefined;
    };

    const validateCEP = (value: string) => {
        if (!value) return 'CEP é obrigatório';
        // Remove caracteres não numéricos
        const cep = value.replace(/\D/g, '');
        if (cep.length !== 8) return 'CEP inválido';
        return undefined;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        const validations = [
            validateField('name', (value) => validateRequired(value, 'Nome')),
            validateField('email', validateEmail),
            validateField('cpf', validateCPF),
            validateField('birthDate', (value) => validateRequired(value, 'Data de nascimento')),
            validateField('cep', validateCEP),
            validateField('city', (value) => validateRequired(value, 'Cidade')),
            validateField('state', (value) => validateRequired(value, 'Estado')),
            validateField('street', (value) => validateRequired(value, 'Rua')),
            validateField('password', validatePassword)
        ];

        if (validations.every(isValid => isValid)) {
            // TODO: Implementar lógica de cadastro
            console.log('Formulário válido:', formData);
        }
    };

    const formFields = [
        {
            id: "name",
            type: "text",
            name: "name",
            placeholder: "Nome completo",
            required: true,
            value: formData.name,
            error: errors.name
        },
        {
            id: "email",
            type: "email",
            name: "email",
            placeholder: "Seu endereço de email",
            required: true,
            value: formData.email,
            error: errors.email
        },
        {
            id: "cpf",
            type: "text",
            name: "cpf",
            placeholder: "CPF",
            required: true,
            value: formData.cpf,
            error: errors.cpf
        },
        {
            id: "birthDate",
            type: "date",
            name: "birthDate",
            placeholder: "Data de nascimento",
            required: true,
            value: formData.birthDate,
            error: errors.birthDate
        },
        {
            id: "cep",
            type: "text",
            name: "cep",
            placeholder: "CEP",
            required: true,
            value: formData.cep,
            error: errors.cep
        },
        {
            id: "city",
            type: "text",
            name: "city",
            placeholder: "Cidade",
            required: true,
            value: formData.city,
            error: errors.city
        },
        {
            id: "state",
            type: "text",
            name: "state",
            placeholder: "Estado",
            required: true,
            value: formData.state,
            error: errors.state
        },
        {
            id: "street",
            type: "text",
            name: "street",
            placeholder: "Rua",
            required: true,
            value: formData.street,
            error: errors.street
        },
        {
            id: "password",
            type: "password",
            name: "password",
            placeholder: "Crie uma senha",
            required: true,
            minLength: 6,
            value: formData.password,
            error: errors.password
        }
    ];

    return (
        <form className="space-y-3" onSubmit={handleSubmit}>
            <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                <h1 className="mb-3 text-2xl">
                    Crie uma conta.
                </h1>
                <div className="w-full">
                    {formFields.map((field) => (
                        <FormField
                            key={field.id}
                            {...field}
                            onChange={handleChange}
                        />
                    ))}
                </div>
                <input type="hidden" name="redirectTo" />
                <Button className="mt-4 w-full" type="submit">
                    Cadastrar <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
                </Button>
            </div>
        </form>
    );
}