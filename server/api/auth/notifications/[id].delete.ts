import {Notification} from '~/server/model/Notification';
import {LogRequest} from "~/types/AuthType";
import {ActionLog} from "~/types/TypesModel";

export default defineEventHandler(async (event) => {
    // Check if user exists
    const user = event.context.auth.user;
    if (!user) {
        setResponseStatus(event, 403);
        return {code: 403, message: 'Pengguna tidak valid'};
    }

    try {
        const id = parseInt(event.context.params?.id as string, 10);

        const payload: LogRequest = {
            user_id: user.id,
            action: ActionLog.DELETE,
            description: `Data warga dengan ID ${id}, berhasil dihapus`,
        }
        const notification = await Notification.deleteNotification(id);

        await createLog(payload)

        return {
            code: 200,
            message: 'Notifikasi berhasil dihapus!',
            data: notification,
        };

    } catch (error: any) {
        return sendError(event, createError({statusCode: 500, statusMessage: 'Internal Server Error'}));
    }
});