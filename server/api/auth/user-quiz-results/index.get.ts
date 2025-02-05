import { UserQuizResult } from '~/server/model/UserQuizResult';
import {setResponseStatus} from "h3";

export default defineEventHandler(async (event) => {
    try {
        const id = (event.context.auth?.user?.id);
        if (!id) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'Pengguna tidak valid' };
        }
        const query = getQuery(event);
        const page = parseInt(query.page as string, 10) || 1;
        const pageSize = parseInt(query.pageSize as string, 10) || 10;

        if (page <= 0 || pageSize <= 0) {
            throw createError({
                statusCode: 400,
                message: "Halaman dan ukuran halaman harus berupa bilangan bulat positif.",
            });
        }

        const userQuizResults = await UserQuizResult.getAllUserQuizResults(id, page, pageSize);

        const totalUserQuizResults = await UserQuizResult.countAllUserQuizResults(id);
        const totalPages = Math.ceil(totalUserQuizResults / pageSize);

        const baseUrl = "/api/auth/user-quiz-results";
        const prevPage = page > 1 ? `${baseUrl}?page=${page - 1}&pageSize=${pageSize}` : null;
        const nextPage = page < totalPages ? `${baseUrl}?page=${page + 1}&pageSize=${pageSize}` : null;

        return {
            code: 200,
            message: 'Daftar hasil kuis berhasil diambil',
            data: userQuizResults,
            meta: {
                totalPages,
                prev: prevPage,
                next: nextPage,
                currentPage: page
            }
        };
    } catch (error: any) {
        console.log(error);
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: error?.message || 'Internal Server Error',
            })
        );
    }
});
