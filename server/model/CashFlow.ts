import {$Enums, PrismaClient} from '@prisma/client';


const prisma = new PrismaClient();

export class CashFlow {
    static createCashFlow = async (data: any) => {
        // Create a new CashFlow record
        return prisma.cashFlow.create({
            data: {
                title: data.title,
                description: data.description,
                date: new Date(data.date),
                category: data.category,
                amount: data.amount,
                create_by: data.create_by,
            },
        });
    };

    static getCashFlowById = (id: number) => {
        return prisma.cashFlow.findUnique({
            where: {id},
            select: {
                id: true,
                title: true,
                description: true,
                date: true,
                category: true,
                amount: true,
                create_by: true,
                create_at: true,
                update_at: true,
                user: true,
            },
        });
    };

    static updateCashFlow = async (id: number, data: any) => {
        return prisma.cashFlow.update({
            where: {id},
            data: {
                title: data.title,
                description: data.description,
                date: data.date,
                category: data.Category,
                amount: data.amount,
                create_by: data.create_by,
            },
        });
    };

    static getAllCashFlows = async (page: number, pageSize: number) => {
        const skip = (page - 1) * pageSize;
        const take = pageSize;

        return prisma.cashFlow.findMany({
            skip: skip,
            take: take,
            select: {
                id: true,
                title: true,
                description: true,
                date: true,
                category: true,
                amount: true,
                create_by: true,
                create_at: true,
                update_at: true,
                user: true,
            },
        });
    };

    static countAllCashFlows = () => {
        return prisma.cashFlow.count();
    };

    static deleteCashFlow = (id: number) => {
        return prisma.cashFlow.delete({
            where: {id}
        });
    };

    static searchCashFlow = (search: string) => {
        return prisma.cashFlow.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: search,
                        },
                    },
                    {
                        description: {
                            contains: search,
                        },
                    },
                ],
            },
        });
    };
}
