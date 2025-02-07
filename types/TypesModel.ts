// Type definitions for Prisma models

// Type for User model
export type User = {
    id: number;
    username: string;
    password: string;
    email: string;
    fullName: string;
    createdAt: Date;
    updatedAt: Date;
}

export enum ActionLog {
    LOGOUT = 'LOGOUT',
    LOGIN = 'LOGIN',
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
}

export enum Gender {
    MALE = 'Laki-laki',
    FEMALE = 'Perempuan',
}