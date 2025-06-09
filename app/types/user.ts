export interface User {
    id?: number;
    name: string;
    email: string;
    cpf: string;
    birthDate: string;
    cep: string;
    city: string;
    state: string;
    street: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
} 