import {PrismaClient} from '@prisma/client';
import { format } from 'date-fns';
import {Gender} from "~/types/TypesModel";

const prisma = new PrismaClient();
function mapGender(gender: string): Gender | undefined {
    switch(gender) {
        case 'Male':
            return Gender.Male;
        case 'Female':
            return Gender.Female;
        default:
            return undefined;
    }
}

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
        return prisma.citizen.update({
            where: {id},
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


    static getAllCitizens = async (page: number, pageSize: number) => {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const citizens = await prisma.citizen.findMany({
        orderBy: {
            full_name: 'asc'
        },
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

    // Format tanggal lahir (dob) ke dd/mm/yy
    const formattedCitizens = citizens.map(citizen => ({
        ...citizen,
        dob: format(new Date(citizen.dob), 'dd/MM/yy'),
        gender: mapGender(citizen.gender)
    }));

    return formattedCitizens;
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
