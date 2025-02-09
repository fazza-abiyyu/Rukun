import {PrismaClient} from '@prisma/client';
import {KK} from "~/server/model/KK";

const prisma = new PrismaClient();

export class Citizen {
    static createCitizen = async (data: any) => {
        return prisma.citizen.create({
            data: {
                full_name: data.full_name,
                dob: new Date(data.dob),
                gender: data.gender,
                address: data.address,
                kk_id: data.kk_id,
                nik: data.nik,
                create_by: data.create_by,
            },
        });
    };


    static getCitizenById = (id: number) => {
        return prisma.citizen.findUnique({
            where: {id},
            select: {
                id: true,
                full_name: true,
                dob: true,
                gender: true,
                address: true,
                kk_id: true,
                nik: true,
                create_by: true,
                create_at: true,
                update_at: true,
            },
        });
    };

    static updateCitizen = async (id: number, data: any) => {

        // Ambil kk_id berdasarkan nomor KK yang diinputkan
        const kk = await KK.getKKByNumber(data.kk_number);
        if (!kk) {
            throw new Error('Nomor KK tidak ditemukan');
        }
        const kk_id = kk.id;

        return prisma.citizen.update({
            where: {id},
            data: {
                full_name: data.full_name,
                dob: data.dob,
                gender: data.Gender,
                address: data.address,
                kk_id: data.kk_id,
                nik: data.nik,
                create_by: data.create_by,
            },
        });

    };

    static getAllCitizens = async (page: number, pageSize: number) => {
        const skip = (page - 1) * pageSize;
        const take = pageSize;

        return prisma.citizen.findMany({
            skip: skip,
            take: take,
            select: {
                id: true,
                full_name: true,
                dob: true,
                gender: true,
                address: true,
                kk_id: false,
                nik: true,
                create_by: false,
                create_at: false,
                update_at: false,
            },
        });
    };

    static countAllCitizens = () => {
        return prisma.citizen.count();
    };

    static deleteCitizen = async (id: number) => {
        return prisma.citizen.delete({
            where: {id}
        })
    }

    static searchCitizen = (search: string) => {
        return prisma.citizen.findMany({
            where: {
                OR: [
                    {
                        full_name: {
                            contains: search,
                        },
                    },
                    {
                        address: {
                            contains: search,
                        },
                    },
                    {
                        nik: {
                            contains: search,
                        }
                    }
                ],
            },
        });
    };
}
