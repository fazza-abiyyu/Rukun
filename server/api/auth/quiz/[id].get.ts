import { Quiz } from '~/server/model/Quiz';

export default defineEventHandler(async (event) => {
    try {
        const id = parseInt(event.context.params?.id || "0");

        if (!id) {
            setResponseStatus(event, 400);
            return { code: 400, message: "Invalid request data." };
        }

        const quiz = await Quiz.getQuizById(id);

        if (!quiz) {
            setResponseStatus(event, 404);
            return { code: 404, message: 'Quiz tidak ditemukan.' };
        }

        return {
            code: 200,
            message: 'Quiz berhasil diambil',
            data: quiz,
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
