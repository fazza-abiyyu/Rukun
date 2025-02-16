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

export type KKType = {
    id: number;
    head_of_family: string;
    kk: string;
    create_by:number;
    createdAt: Date;
    updatedAt: Date;
}


export enum Category {
    KREDIT = 'Kredit',
    DEBIT = 'Debit',
}