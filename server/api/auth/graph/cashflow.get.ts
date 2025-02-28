import { Stats } from '~/server/model/Stats';

export default defineEventHandler(async (event) => {
    try {
        // Gunakan model untuk mendapatkan data dashboard anak
        const data = await Stats. getRatioCashFlow();

        // Set response status dan kembalikan data
        setResponseStatus(event, 200);
        return {
            code: 200,
            message: "Data berhasil dikembalikan.",
            data,
        };
    } catch (error: any) {
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || "Internal Server Error" })
        );
    }
});