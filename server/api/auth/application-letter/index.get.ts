import {defineEventHandler, getQuery, sendError, createError, setResponseStatus} from 'h3';
import {ApplicationLetter} from '~/server/model/ApplicationLetter';

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

        // Logika untuk pengguna dengan peran 'Admin'
        const application_letters = await ApplicationLetter.getAllApplicationLetters(page, pagesize);
        const totalApplicationLetters = await ApplicationLetter.countAllApplicationLetters();
        const totalPages = Math.ceil(totalApplicationLetters / pagesize);
        const baseUrl = "/api/auth/application-letter";
        const prevPage = page > 1 ? `${baseUrl}?page=${page - 1}&pagesize=${pagesize}` : null;
        const nextPage = page < totalPages ? `${baseUrl}?page=${page + 1}&pagesize=${pagesize}` : null;

        // Return hasil data
        return {
            code: 200,
            message: 'Data Surat Pengajuan berhasil dikembalikan!',
            data: application_letters,
            totalPages,
            prev: prevPage,
            next: nextPage,
        };
    } catch (error: any) {
        console.error(error);
        return sendError(event, createError({statusCode: 500, statusMessage: 'Internal Server Error'}));
    }
});
