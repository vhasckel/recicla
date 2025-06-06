"use client";

import {
    AtSymbolIcon,
    KeyIcon
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "@/components/common/button";
import { FormField } from "@/components/common/form-field";
import { useRouter } from "next/navigation";
import { useForm } from "@/hooks/useForm";
import { LoginFormData } from "@/types/forms";
import Link from "next/link";

export default function LoginForm(): JSX.Element {
    const router = useRouter();
    const { formData, errors, handleChange, validateField, setFieldError } = useForm<LoginFormData>({
        email: '',
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        
        const isEmailValid = validateField('email', validateEmail);
        const isPasswordValid = validateField('password', validatePassword);

        if (isEmailValid && isPasswordValid) {
            // TODO: Implementar lógica de login
            router.push('/dashboard');
        }
    };

    const formFields = [
        {
            id: "email",
            type: "email",
            name: "email",
            placeholder: "Seu endereço de email",
            required: true,
            value: formData.email,
            error: errors.email,
            icon: <AtSymbolIcon />
        },
        {
            id: "password",
            type: "password",
            name: "password",
            placeholder: "Entre com sua senha",
            required: true,
            minLength: 6,
            value: formData.password,
            error: errors.password,
            icon: <KeyIcon />
        }
    ];

    return (
        <form className="space-y-3" onSubmit={handleSubmit}>
            <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                <h1 className="mb-3 text-2xl">
                    Faça login para continuar.
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
                    Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
                </Button>
                <div className="flex h-8 items-end ">
                    <Link href="/signup" className="flex gap-2 w-full justify-center">
                        <p className="text-sm text-gray-500">
                            Não tem uma conta?
                        </p>
                        <span className="text-sm text-green-500">
                            Crie uma agora
                        </span>
                    </Link>
                </div>
            </div>
        </form>
    );
}