import {Notification} from '~/server/model/Notification';

export default defineEventHandler(async (event) => {
    // Check if user exists
    const user = event.context.auth.user;

    if (!user) {
        setResponseStatus(event, 403);
        return {code: 403, message: 'Pengguna tidak valid'};
    }

    try {
        const id = parseInt(event.context.params?.id as string, 10);
        const notification = await Notification.getNotificationById(id);

        if (!notification) {
            setResponseStatus(event, 404);
            return {code: 404, message: 'Notifikasi tidak ditemukan'};
        }

        return {
            code: 200,
            message: 'Notifikasi berhasil dikembalikan!',
            data: notification,
        };
    } catch (error: any) {
        return sendError(event, createError({statusCode: 500, statusMessage: 'Internal Server Error'}));
    }
});