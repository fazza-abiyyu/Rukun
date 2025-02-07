import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class Notification {
    static createNotification = async (data: any) => {
        // Create a new Notification record
        return prisma.notification.create({
            data: {
                title: data.title,
                description: data.description,
                date: data.date || new Date(),
                create_by: data.create_by,
            },
        });
    };

    static getNotificationById = (id: number) => {
        return prisma.notification.findUnique({
            where: { id },
            select: {
                id: true,
                title: true,
                description: true,
                date: true,
                create_by: true,
                create_at: true,
                update_at: true,
                user: true,
            },
        });
    };

    static updateNotification = async (id: number, data: any) => {
        return prisma.notification.update({
            where: { id },
            data: {
                title: data.title,
                description: data.description,
                date: data.date,
                create_by: data.create_by,
            },
        });
    };

    static getAllNotifications = async (page: number, pageSize: number) => {
        const skip = (page - 1) * pageSize;
        const take = pageSize;

        return prisma.notification.findMany({
            skip: skip,
            take: take,
            select: {
                id: true,
                title: true,
                description: true,
                date: true,
                create_by: true,
                create_at: true,
                update_at: true,
                user: true,
            },
        });
    };

    static countAllNotifications = () => {
        return prisma.notification.count();
    };

    static deleteNotification = async (id: number) => {
        return prisma.notification.delete({
            where: { id }
        });
    };

    static searchNotification = (search: string) => {
        return prisma.notification.findMany({
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
