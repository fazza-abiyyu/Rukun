import { prisma } from "~/server/config/db";

export class RefreshToken {
    static create(user_id: number, refresh_token: string) {
        return prisma.refreshToken.create({
            data: {
                user_id,
                refresh_token,
            },
        });
    }

    static findToken(token: string) {
        return prisma.refreshToken.findFirst({
            where: { refresh_token: token },
        });
    }

    static deleteToken(token: string) {
        return prisma.refreshToken.deleteMany({
            where: { refresh_token: token },
        });
    }

    static async getToken(refreshToken: string) {
        return prisma.refreshToken.findFirst({
            where: {
                refresh_token: refreshToken,
            },
        });
    }
}