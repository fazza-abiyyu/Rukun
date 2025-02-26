import {prisma} from '~/server/config/db';
import {Gender} from '@prisma/client';
import items from "@redocly/ajv/lib/vocabularies/applicator/items";

export class Dashboard {
    static getCahsFlowDashboard = async (year: number) => {
        const startDate: Date = new Date(year, 0, 1);
        const endDate: Date = new Date(year, +1, 0, 1);

        const result = await prisma.cashFlow.findMany({
            where: {
                creared_at: {
                    gte: startDate,
                    lt: endDate
                }
            },
            include:{

            }
        })
}
}