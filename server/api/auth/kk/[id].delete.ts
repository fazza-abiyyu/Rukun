import {KK} from '~/server/model/KK';
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
            description: `Data KK dengan ID ${id}, berhasil dihapus`,
        }
        const kk = await KK.deleteKK(id);

        await createLog(payload)

        return {
            code: 200,
            message: 'Data KK berhasil dihapus!',
            data: kk,
        };

    } catch (error: any) {
        console.error(error);
        return sendError(event, createError({statusCode: 500, statusMessage: 'Internal Server Error'}));
    }
});