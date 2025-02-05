import {User} from "~/server/model/User";
import {ActionLog} from "~/types/TypesModel";
import {LogRequest} from "~/types/AuthType";

export default defineEventHandler(async (event) => {
    try {
        const user = event.context.auth?.user;

        if (!user.id || isNaN(user.id)) {
            setResponseStatus(event, 400);
            return {code: 400, message: 'Pengguna tidak valid'};
        }

        const data = await readBody(event);

        const payload : LogRequest = {
            user_id : user.id,
            action : ActionLog.UPDATE,
            description : `Akun dengan dengan ID ${user.id}, berhasil diperbarui`,
        }

        const updatedUser = await User.updateUser(user.id, data);

        await createLog(payload)

        setResponseStatus(event, 200);
        return {
            code: 200,
            message: 'Akun pengguna berhasil diperbarui!',
            data: {
                user: updatedUser,
            },
        };
    } catch (error: any) {
        console.error(error);
        return sendError(
            event,
            createError({statusCode: 500, message: error?.message || 'Internal Server Error'})
        );
    }
});