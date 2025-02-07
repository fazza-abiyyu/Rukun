import { ApplicationLetter } from '~/server/model/ApplicationLetter';
import { LogRequest } from "~/types/AuthType";
import { ActionLog } from "~/types/TypesModel";
import { defineEventHandler, sendError, createError, setResponseStatus } from 'h3';

export default defineEventHandler(async (event) => {
    // Check if user exists
    const user = event.context.auth.user;
    if (!user) {
        setResponseStatus(event, 403);
        return { code: 403, message: 'Pengguna tidak valid' };
    }

    try {
        const id = parseInt(event.context.params?.id as string, 10);

        // Fetch the application letter to check ownership
        const applicationLetter = await ApplicationLetter.getApplicationLetterById(id);

        if (!applicationLetter) {
            return sendError(event, createError({ statusCode: 404, statusMessage: 'Surat Pengantar tidak ditemukan' }));
        }

        // Check if the authenticated user is the creator of the application letter
        if (applicationLetter.create_by !== user.id) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Anda tidak memiliki izin untuk menghapus Surat Pengantar ini' };
        }

        const payload: LogRequest = {
            user_id: user.id,
            action: ActionLog.DELETE,
            description: `Surat Pengantar dengan ID ${id}, berhasil dihapus`,
        };

        // Delete the application letter
        const deletedApplicationLetter = await ApplicationLetter.deleteApplicationLetter(id);

        await createLog(payload);

        return {
            code: 200,
            message: 'Surat Pengantar berhasil dihapus!',
            data: deletedApplicationLetter,
        };

    } catch (error: any) {
        return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error' }));
    }
});
