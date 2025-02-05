import {Log} from '~/server/model/Log';

export default defineEventHandler(async (event) => {
    try {
        const user = event.context.auth.user;

        if (!user) {
            setResponseStatus(event, 403);
            return {code: 403, message: 'Pengguna tidak valid'};
        }

        const user_id = user.id;
        const query = getQuery(event);
        const page = parseInt(query.page as string, 10) || 1;
        const pagesize = parseInt(query.pagesize as string, 10) || 10;

        const log = await Log.getAllLogsByUserId(user_id, page, pagesize);

        const totalUsers = await Log.countAllLog();
        const totalPages = Math.ceil(totalUsers / pagesize);

        const baseUrl = "/api/auth/log";
        const prevPage = page > 1 ? `${baseUrl}?page=${page - 1}&pagesize=${pagesize}` : null;
        const nextPage = page < totalPages ? `${baseUrl}?page=${page + 1}&pagesize=${pagesize}` : null;

        return {
            code: 200,
            message: 'Log berhasil diambil!',
            data: {
                log
            },
            meta: {
                totalPages,
                prev: prevPage,
                next: nextPage
            }
        };
    } catch (error) {
        console.error('Terjadi kesalahan saat mengambil log:', error);
        setResponseStatus(event, 500);
        if (error instanceof Error) {
            return {error: error.message};
        } else {
            return {error: 'Terjadi kesalahan tak terduga'};
        }
    }
});