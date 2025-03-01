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

export enum Category {
    Debit = 'Masuk',
    Kredit = 'Keluar',
}

export enum CategoryLetter {
    SuratPengantarKTP = 'Surat Pengantar KTP',
    SuratKeteranganDomisili = 'Surat Keterangan Domisili',
    SuratKeteranganUsaha = 'Surat Keterangan Usaha=',
    SuratPengantarNikah = 'Surat Pengantar Nikah',
    SuratKeteranganTidakMampu = 'Surat Keterangan Tidak Mampu'
}

export type KKType = {
    id: number;
    head_of_family: string;
    kk: string;
    create_by: number;
    createdAt: Date;
    updatedAt: Date;
}


export enum Category {
    KREDIT = 'Keluar',
    DEBIT = 'Masuk',
}

export type Citizen = {
    id: number;
    full_name: string;
    dob: Date;
    gender: Gender;
    address: string;
    kk_id: number;
    nik: string;
}

export type Cashflow = {
    id: number;
    title: String;
    description: String;
    date: Date;
    category: Category;
    amount: number;
}