import { prisma } from '~/server/config/db';
import { UpdateUserQuizResultData, UserQuizResultData } from '~/types/AuthType';

export class UserQuizResult {
    static createUserQuizResult = (data: UserQuizResultData) => {
        return prisma.userQuizResult.create({
            data,
        });
    };

    static getUserQuizResultById = (id: number) => {
        return prisma.userQuizResult.findUnique({
            where: { id },
        });
    };

    static getAllUserQuizResults = (user_id: number, page: number, pageSize: number) => {
        const skip = (page - 1) * pageSize;
        const take = pageSize;

        return prisma.userQuizResult.findMany({
            where: {
              user_id: user_id,
            },
            skip,
            take,
        });
    };

    static deleteUserQuizResult = (id: number) => {
        return prisma.userQuizResult.delete({
            where: { id },
        });
    };

    static async countAllUserQuizResults(user_id: number) {
        return prisma.userQuizResult.count({
            where: { user_id },
        });
    }
}
