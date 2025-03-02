import {User} from '~/server/model/User';

export default defineEventHandler(async (event) => {

    const user = event.context.auth?.user;

    if (!user) {
        setResponseStatus(event, 403);
        return {code: 403, message: 'Pengguna tidak valid'};
    }

    try {
        const id = parseInt(event.context.params?.id as string, 10);
        const user = await User.getUserById(id);

        if (!user) {
            setResponseStatus(event, 404);
            return {code: 404, message: 'Data pengguna tidak ditemukan'};
        }

        return {
            code: 200,
            message: 'Data pengguna berhasil dikembalikan!',
            data: user,
        };
    } catch (error: any) {
        return sendError(event, createError({statusCode: 500, statusMessage: 'Internal Server Error'}));
    }
});