import {$Enums, PrismaClient} from '@prisma/client';
import {format} from 'date-fns';

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

        const cashFlows = await prisma.cashFlow.findMany({
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

        // Format tanggal (date) ke dd/MM/yy
        const formattedCashFlows = cashFlows.map(cashFlow => ({
            ...cashFlow,
            date: format(new Date(cashFlow.date), 'dd/MM/yy')
        }));

        return formattedCashFlows;
    };

    static getHeadCashflow = async () => {
        const cashFlows = await prisma.cashFlow.findMany({
            orderBy: {
                create_at: 'desc'
            },
            take: 5,
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

        // Format tanggal (date) ke dd/MM/yy
        const formattedCashFlows = cashFlows.map(cashFlow => ({
            ...cashFlow,
            date: format(new Date(cashFlow.date), 'dd/MM/yy')
        }));

        return formattedCashFlows;
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
