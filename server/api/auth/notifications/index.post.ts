import { Notification } from '~/server/model/Notification';
import { LogRequest } from '~/types/AuthType';
import { ActionLog } from '~/types/TypesModel';
import { NotificationEmailSender } from '~/server/utils/NotificationEmailSender';

export default defineEventHandler(async (event) => {
    // Check if user exists
    const user = event.context.auth.user;

    if (!user) {
        setResponseStatus(event, 403);
        return { code: 403, message: 'Pengguna tidak valid' };
    }

    try {
        // Read the request body
        const data = await readBody(event);

        // Assign user ID from the token
        const newData = {
            ...data,
            create_by: user.id
        };

        // Create the notifications
        const notification = await Notification.createNotification(newData);

        const payload: LogRequest = {
            user_id: user.id,
            action: ActionLog.CREATE,
            description: `Notifikasi dengan ID ${notification.id} berhasil dibuat dan dikirim`,
        };

        // Send the notifications email to all users
        await NotificationEmailSender(newData.title, newData.description, newData.date, user.id);

        // Create the log
        await createLog(payload);

        return {
            code: 201,
            message: 'Notifikasi berhasil dibuat dan dikirim!',
            data: notification,
        };
    } catch (error: any) {
        console.error(error);
        return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error' }));
    }
});
