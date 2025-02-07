import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export class ApplicationLetter {
    static createApplicationLetter = async (data: any) => {
        return prisma.applicationLetter.create({
            data: {
                category_letter: data.category_letter,
                data_nik: data.data_nik,
                create_by: data.create_by,
                create_at: data.create_at || new Date(),
                user: {
                    connect: {id: data.create_by},
                }
            },
        });
    };

    static getApplicationLetterById = (id: number) => {
        return prisma.applicationLetter.findUnique({
            where: {id},
            select: {
                id: true,
                category_letter: true,
                data_nik: true,
                create_by: true,
                create_at: true,
                user: true,
            },
        });
    };

    static updateApplicationLetter = async (id: number, data: any) => {
        return prisma.applicationLetter.update({
            where: {id},
            data: {
                category_letter: data.category_letter,
                data_nik: data.data_nik,
                create_by: data.create_by,
                create_at: data.create_at,
                user: {
                    connect: {id: data.create_by},
                }
            },
        });
    };

    static getAllApplicationLetters = async (page: number, pageSize: number) => {
        const skip = (page - 1) * pageSize;
        const take = pageSize;

        return prisma.applicationLetter.findMany({
            skip,
            take,
            select: {
                id: true,
                category_letter: true,
                data_nik: true,
                create_by: true,
                create_at: true,
                user: true,
            },
        });
    };

    static countAllApplicationLetters = () => {
        return prisma.applicationLetter.count();
    };

    static deleteApplicationLetter = async (id: number) => {
        return prisma.applicationLetter.delete({
            where: {id}
        });
    };

    static getCitizenByNIK = (nik: string) => {
        return prisma.citizen.findUnique({
            where: {nik},
            select: {
                id: true,
                full_name: true,
                dob: true,
                gender: true,
                address: true
            }
        });
    };

    static getAllByCreated = async (create_by: number, page: number, pageSize: number) => {
        const skip = (page - 1) * pageSize;
        const take = pageSize;

        return prisma.applicationLetter.findMany({
            where: {create_by},
            skip,
            take,
            select: {
                id: true,
                category_letter: true,
                data_nik: true,
                create_by: true,
                create_at: true,
                user: true,
            },
        });
    }

    static countAllByCreated = async (create_by: number) => {
        return prisma.applicationLetter.count({
            where: {create_by}
        });

    }
}