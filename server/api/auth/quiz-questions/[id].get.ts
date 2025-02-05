import { QuizQuestion } from '~/server/model/QuizQuestion';

export default defineEventHandler(async (event) => {
    try {
        const id = parseInt(event.context.params?.id || "0");

        if (!id) {
            setResponseStatus(event, 400);
            return { code: 400, message: "Invalid request data." };
        }

        const quizQuestion = await QuizQuestion.getQuizQuestionById(id);

        if (!quizQuestion) {
            setResponseStatus(event, 404);
            return { code: 404, message: 'Pertanyaan quiz tidak ditemukan.' };
        }

        return {
            code: 200,
            message: 'Pertanyaan quiz berhasil diambil',
            data: quizQuestion,
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
