import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class KK {
    static createKK = async (data: any) => {
        return prisma.kK.create({
            data: {
                kk: data.kk,
                head_of_family: data.head_of_family,
                create_by: data.create_by,
            },
        });
    };

    static getKKById = async (id: number) => {
        return prisma.kK.findUnique({
            where: { id },
            select: {
                id: true,
                head_of_family: true,
                kk: true,
                create_by: true,
                create_at: true,
                update_at: true,
            },
        });
    };

    static getKKByNumber = async (kkNumber: string) => {
        return prisma.kK.findUnique({
            where: {
                kk: kkNumber
            },
            select: {
                id: true,
                head_of_family: true,
                kk: true,
                create_by: true,
                create_at: true,
                update_at: true
            },
        });
    };


            static updateKK = async (id: number, data: any) => {
        return prisma.kK.update({
            where: { id },
            data: {
                head_of_family: data.head_of_family,
                kk: data.kk,
                create_by: data.create_by,
            },
        });
    };

    static deleteKK = async (id: number) => {
        return prisma.kK.delete({
            where: { id },
        });
    };

    static getAllKK = async (page: number, pageSize: number) => {
        const skip = (page - 1) * pageSize;
        const take = pageSize;

        return prisma.kK.findMany({
            orderBy: {
                head_of_family: 'asc'
            },
            skip: skip,
            take: take,
            select: {
                id: true,
                head_of_family: true,
                kk: true,
                create_by: true,
                create_at: true,
                update_at: true,
            },
        });
    };

    static countAllKK = async () => {
        return prisma.kK.count();
    };

    static searchKK = async (search: string) => {
        return prisma.kK.findMany({
            where: {
                OR: [
                    {
                        head_of_family: {
                            contains: search,
                        },
                    },
                    {
                        kk: {
                            contains: search,
                        },
                    },
                ],
            },
        });
    };
}
