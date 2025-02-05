import { UserQuizResult } from '~/server/model/UserQuizResult';

export default defineEventHandler(async (event) => {
    try {
        const id = parseInt(event.context.params?.id || "0");

        if (!id) {
            setResponseStatus(event, 400);
            return { code: 400, message: "Invalid request data." };
        }

        const userQuizResult = await UserQuizResult.getUserQuizResultById(id);

        if (!userQuizResult) {
            setResponseStatus(event, 404);
            return { code: 404, message: 'Hasil kuis tidak ditemukan.' };
        }

        return {
            code: 200,
            message: 'Hasil kuis berhasil diambil',
            data: userQuizResult,
        };
    } catch (error: any) {
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: error?.message || 'Internal Server Error',
            })
        );
    }
});
