import { PrismaClient } from '@prisma/client';
import {RegisterRequest, UpdateUserRequest} from "~/types/AuthType";

const prisma = new PrismaClient();

export class User {
    static createUser = (data: any) => {
        return prisma.user.create({
            data: {
                username: data.username,
                password: data.password,
                email: data.email,
                full_name: data.full_name,
            }
        });
    };
    static registerUser = (data: RegisterRequest) => {
        return prisma.user.create({
            data: {
                username: data.username,
                email: data.email,
                password: data.password,
                full_name: data.full_name
            },
        });
    };

    static getUserByEmail = (email: string) => {
        if (!email) {
            throw new Error("Email must be provided");
        }

        return prisma.user.findUnique({
            where: {
                email: email, // Ensure email is properly passed here
            },
            select: {
                id: true,
                full_name: true,
                username: true,
                email: true,
                password: true,
                role: true,
            },
        });
    };

    static updateUser = (id: number, data: UpdateUserRequest) => {
        return prisma.user.update({
            where: { id },
            data: {
                username: data.username,
                email: data.email,
                full_name: data.full_name,
            },
            select: {
                id: true,
                full_name: true,
                username: true,
                email: true,
                password: false,
                role: true,
                profile: true,
                quizResults: true,
            }
        });
    };

    static deleteUser = (id: number) => {
        return prisma.user.delete({
            where: { id },
        });
    };

    static getUserById = (id: number) => {
        return prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                full_name: true,
                username: true,
                email: true,
                password: false,
                role: true,
                profile: true,
                quizResults: true,
            }
        });
    };

    static getAllUsers = async (page: number, pageSize: number) => {
        const skip = (page - 1) * pageSize;
        const take = pageSize;

        return prisma.user.findMany({
            skip: skip,
            take: take,
            select: {
                id: true,
                full_name: true,
                username: true,
                email: true,
                password: false,
                role: true,
                profile: true,
                quizResults: true,
            },
        });
    };

    static countAllUsers = () => {
        return prisma.user.count();
    };

    static searchUser = (search: string) => {
        return prisma.user.findMany({
            where: {
                OR: [
                    {
                        username: {
                            contains: search,
                        }
                    },
                    {
                        email: {
                            contains: search,
                        }
                    },
                    {
                        full_name: {
                            contains: search,
                        }
                    }
                ]
            }
        })
    }
}
