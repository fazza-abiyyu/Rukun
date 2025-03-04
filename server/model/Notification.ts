import { PrismaClient } from '@prisma/client';
import {format} from "date-fns";

const prisma = new PrismaClient();

export class Notification {
    static createNotification = async (data: any) => {
        // Create a new Notification record
        return prisma.notification.create({
            data: {
                title: data.title,
                description: data.description,
                date: new Date(data.date),
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

        // Fetch notifications from the database
        const notifications = await prisma.notification.findMany({
            orderBy: {
                create_at: 'desc'
            },
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

        // Format date (tanggal) to dd/MM/yy
        const formattedNotifications = notifications.map(notification => ({
            ...notification,
            date: format(new Date(notification.date), 'dd/MM/yy'),
            create_at: format(new Date(notification.create_at), 'dd/MM/yy')
        }));

        return formattedNotifications;
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
