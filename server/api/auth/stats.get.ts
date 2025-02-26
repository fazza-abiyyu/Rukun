import { Stats } from '~/server/model/Stats';
import { defineEventHandler, setResponseStatus, createError, sendError } from 'h3';

export default defineEventHandler(async (event) => {
    try {
        // Periksa apakah pengguna ada
        const user = event.context?.auth?.user;
        if (!user) {
            setResponseStatus(event, 403);
            return {code: 403, message: 'Pengguna tidak valid'};
        }

        // Get total number of users
        const totalUser = await Stats.totalUser();

        // Get total number of citizens
        const totalCitizen = await Stats.totalCitizen();

        // Get total male citizens
        const totalMaleCitizen = await Stats.totalCitizenMale();

        // Get total female citizens
        const totalFemaleCitizen = await Stats.totalCitizenFemale();

        // Get ratio of children by gender
        const childGenderRatio = await Stats.getRatioChildByGender();

        // Get cash flow statistics for the year
        const flowCashStats = await Stats.getFlowCash();

        // Set response status and return data
        setResponseStatus(event, 200);
        return {
            code: 200,
            message: 'Berhasil mengembalikan data stats',
            data: {
                totalUser,
                totalCitizen,
                totalMaleCitizen,
                totalFemaleCitizen,
                childGenderRatio,
                flowCashStats,
            },
        };
    } catch (error: any) {
        console.error('Error:', error);
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || 'Internal Server Error' })
        );
    }
});
