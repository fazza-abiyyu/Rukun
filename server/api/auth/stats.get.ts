import { Stats } from '~/server/model/Stats';
import { defineEventHandler, setResponseStatus, createError, sendError } from 'h3';

export default defineEventHandler(async (event) => {
    try {
        // Get total number of users
        const totalUser = await Stats.totalUser();

        // Get total number of citizens
        const totalCitizen = await Stats.totalCitizen();

        // Get total male citizens
        const totalMaleCitizen = await Stats.totalCitizenMale();

        // Get total female citizens
        const totalFemaleCitizen = await Stats.totalCitizenFemale();

        // Set response status and return data
        setResponseStatus(event, 200);
        return {
            code: 200,
            message: 'Berhasil mengembalikan data stats',
            data: {
                totalUser,
                totalCitizen,
                totalMaleCitizen,
                totalFemaleCitizen
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
