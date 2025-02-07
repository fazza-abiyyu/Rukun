import { User } from "~/server/model/User";
import { ActionLog } from "~/types/TypesModel";
import { LogRequest } from "~/types/AuthType";

export default defineEventHandler(async (event) => {
    try {
        const user = event.context.auth?.user;
        if (!user) {
            console.error("Pengguna tidak terautentikasi");
            setResponseStatus(event, 401);
            return { code: 401, message: 'User not authenticated.' };
        }

        const id = parseInt(event.context.params?.id || "0");
        const data = await readBody(event);

        if (!id || isNaN(id)) {
            setResponseStatus(event, 400);
            return { code: 400, message: "Invalid request data." };
        }

        const payload: LogRequest = {
            user_id: user.id,
            action: ActionLog.UPDATE,
            description: `Akun dengan ID ${id} berhasil diperbarui`,
        };

        const updatedUser = await User.updateUser(id, data);
        await createLog(payload);

        setResponseStatus(event, 200);
        return {
            code: 200,
            message: 'Akun pengguna berhasil diperbarui!',
            data: { user: updatedUser },
        };
    } catch (error) {
        console.error(error);
        return sendError(
            event,
            createError({ statusCode: 500, message: error.message || 'Internal Server Error' })
        );
    }
});