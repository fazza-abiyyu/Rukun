import { User } from "~/server/model/User";
import { ActionLog } from "~/types/TypesModel";
import { LogRequest } from "~/types/AuthType";

export default defineEventHandler(async (event) => {
    // Check if user exists
    const userLogin = event.context.auth.user;

    if (!userLogin) {
        setResponseStatus(event, 403);
        return { code: 403, message: 'Pengguna tidak valid' };
    }

    try {
        const id = parseInt(event.context.params?.id as string, 10);

        // Read the request body
        const data = await readBody(event);

        // Assign user ID from the token for create_by field
        const newData = {
            ...data,
            create_by: userLogin.id
        };

        const user = await User.updateUser(id, newData);

        const payload : LogRequest = {
            user_id : userLogin.id,
            action : ActionLog.UPDATE,
            description : `Data pengguna dengan ID ${id}, berhasil diperbarui`,
        }

        await createLog(payload)

        return {
            code: 200,
            message: 'Data pengguna berhasil diperbarui!',
            data: user,
        };
    } catch (error: any) {
        console.error(error);
        return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error' }));
    }
});
