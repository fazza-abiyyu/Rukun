import {defineEventHandler, getQuery, sendError, createError, setResponseStatus} from 'h3';
import {ApplicationLetter} from '~/server/model/ApplicationLetter';
import {User} from '~/server/model/User';

export default defineEventHandler(async (event) => {
    try {
        // Periksa apakah pengguna ada
        const user = event.context?.auth?.user;
        if (!user) {
            setResponseStatus(event, 403);
            return {code: 403, message: 'Pengguna tidak valid'};
        }

        // Ambil parameter `page` dan `pagesize` dari query string
        const query = getQuery(event);
        const page = parseInt(query.page as string, 10) || 1;
        const pagesize = parseInt(query.pagesize as string, 10) || 10;

        // Validasi input
        if (page <= 0 || pagesize <= 0) {
            throw createError({
                statusCode: 400,
                message: "Halaman dan ukuran halaman harus berupa bilangan bulat positif.",
            });
        }
        const users = await User.getAllUsers(page, pagesize);
        const totalUsers = await User.countAllUsers();
        const totalPages = Math.ceil(totalUsers / pagesize);
        const baseUrl = "/api/auth/users";
        const prevPage = page > 1 ? `${baseUrl}?page=${page - 1}&pagesize=${pagesize}` : null;
        const nextPage = page < totalPages ? `${baseUrl}?page=${page + 1}&pagesize=${pagesize}` : null;

        return {
            code: 200,
            message: 'Daftar pengguna berhasil dikembalikan!',
            data: users,
            totalPages,
            prev: prevPage,
            next: nextPage,
        };
    } catch (error: any) {
        return sendError(event, createError({statusCode: 500, statusMessage: 'Internal Server Error'}));
    }
});
