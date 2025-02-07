import {ApplicationLetter} from '~/server/model/ApplicationLetter';
import {defineEventHandler, getQuery, sendError, createError, setResponseStatus} from 'h3';

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

        // Ambil data Notification
        const application_leter = await ApplicationLetter.getAllByCreated(user.id, page, pagesize);

        // Hitung total halaman
        const totalApplicationLeter = await ApplicationLetter.countAllByCreated(user.id);
        const totalPages = Math.ceil(totalApplicationLeter / pagesize);

        // Buat URL untuk prev dan next
        const baseUrl = "/api/auth/user/application-letter";
        const prevPage = page > 1 ? `${baseUrl}?page=${page - 1}&pagesize=${pagesize}` : null;
        const nextPage = page < totalPages ? `${baseUrl}?page=${page + 1}&pagesize=${pagesize}` : null;

        // Return hasil data
        return {
            code: 200,
            message: 'Data Surat Pengantar berhasil dikembalikan!',
            data: application_leter,
            totalPages,
            prev: prevPage,
            next: nextPage,
        };
    } catch (error: any) {
        return sendError(event, createError({statusCode: 500, statusMessage: 'Internal Server Error'}));
    }
});