import { QuizQuestion } from '~/server/model/QuizQuestion';

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event);
        const page = parseInt(query.page as string, 10) || 1;
        const pageSize = parseInt(query.pageSize as string, 10) || 10;

        if (page <= 0 || pageSize <= 0) {
            throw createError({
                statusCode: 400,
                message: "Halaman dan ukuran halaman harus berupa bilangan bulat positif.",
            });
        }

        const quizQuestions = await QuizQuestion.getAllQuizQuestions(page, pageSize);

        const totalQuestions = await QuizQuestion.countAllQuizQuestions();
        const totalPages = Math.ceil(totalQuestions / pageSize);

        const baseUrl = "/api/quiz-questions";
        const prevPage = page > 1 ? `${baseUrl}?page=${page - 1}&pageSize=${pageSize}` : null;
        const nextPage = page < totalPages ? `${baseUrl}?page=${page + 1}&pageSize=${pageSize}` : null;

        return {
            code: 200,
            message: 'Daftar pertanyaan quiz berhasil diambil',
            data: quizQuestions,
            meta: {
                totalPages,
                prev: prevPage,
                next: nextPage,
            }
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
