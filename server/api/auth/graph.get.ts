import { Stats } from '~/server/model/Stats';
import { setResponseStatus, getQuery, sendError, createError } from 'h3';

export default defineEventHandler(async (event) => {
    try {
        // Ambil parameter tahun dari query
        const { year } = getQuery(event);
        const currentYear = new Date().getFullYear();
        const yearString = Array.isArray(year) ? year[0] : year;
        const yearInt = yearString ? parseInt(yearString, 10) : currentYear;

        // Panggil metode getFlowCash untuk mendapatkan statistik cash flow
        const data = await Stats.getCashFlowDashboard(yearInt);

        // Set response status dan kembalikan data
        setResponseStatus(event, 200);
        return {
            code: 200,
            message: "Data berhasil dikembalikan.",
            data: data,
        };
    } catch (error: any) {
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || "Internal Server Error" })
        );
    }
});