import { Quiz } from '~/server/model/Quiz';

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

        const quizzes = await Quiz.getAllQuizzes(page, pageSize);

        const totalQuizzes = await Quiz.countAllQuiz();
        const totalPages = Math.ceil(totalQuizzes / pageSize);

        const baseUrl = "/api/auth/quiz";
        const prevPage = page > 1 ? `${baseUrl}?page=${page - 1}&pageSize=${pageSize}` : null;
        const nextPage = page < totalPages ? `${baseUrl}?page=${page + 1}&pageSize=${pageSize}` : null;

        return {
            code: 200,
            message: 'Daftar quiz berhasil diambil',
            data: quizzes,
            meta: {
                totalPages,
                prev: prevPage,
                next: nextPage,
                currentPage: page
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
