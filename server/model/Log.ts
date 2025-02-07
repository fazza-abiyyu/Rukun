import {prisma} from '~/server/config/db';
import {LogRequest} from '~/types/AuthType';

export class Log {
    static createLog = async (data: LogRequest) => {
        return prisma.log.create({
            data: {
                user_id: data.user_id,
                action: data.action,
                description: data.description,
            },
        });
    };

    static getAllLogsByUserId = (user_id: number, page: number, pageSize: number) => {
        const skip = (page - 1) * pageSize;
        const take = pageSize;
        return prisma.log.findMany({
            where: {user_id},
            skip: skip,
            take: take,
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                        role: true,
                    }
                }
            }
        })
    };

    static countAllLog = () => {
        return prisma.log.count();
    };
}