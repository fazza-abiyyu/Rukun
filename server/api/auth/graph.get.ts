import { Stats } from '~/server/model/Stats';
import { setResponseStatus, getQuery, sendError, createError } from 'h3';

export default defineEventHandler(async (event) => {
    try {
        // Ambil id pengguna dari context (jika ada)
        const id = event.context.auth?.user?.id;
        if (!id) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'Pengguna tidak valid' };
        }

        // Ambil parameter tahun dari query
        const { year } = getQuery(event);
        const currentYear = new Date().getFullYear();
        const yearString = Array.isArray(year) ? year[0] : year;  // Pastikan year adalah string
        const yearInt = yearString ? parseInt(yearString, 10) : currentYear;

        // Panggil metode getFlowCash untuk mendapatkan statistik cash flow
        const flowCashStats = await Stats.getFlowCash();

        // Set response status dan kembalikan data
        setResponseStatus(event, 200);
        return {
            code: 200,
            message: "Data berhasil dikembalikan.",
            data: flowCashStats,
        };
    } catch (error: any) {
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || "Internal Server Error" })
        );
    }
});
