import { User } from '~/server/model/User';
import {createLog} from "~/server/utils/atLog";
import {LogRequest} from "~/types/AuthType";
import {ActionLog} from "~/types/TypesModel";

export default defineEventHandler(async (event) => {
    try {
        const user = event.context.auth?.user;

        const id = parseInt(event.context.params?.id as string);

        if (!id || isNaN(id)) {
            setResponseStatus(event, 400);
            return {code: 400, message: 'Pengguna tidak valid'};
        }

        const data = await readBody(event)

        const payload : LogRequest = {
            user_id : user.id,
            action : ActionLog.DELETE,
            description : `Data pengguna dengan ID ${id}, berhasil dihapus`,
        }

        await createLog(payload)

        await User.deleteUser(id);

        setResponseStatus(event, 200);
        return {
            code: 200,
            message: "Akun pengguna berhasil dihapus!",
        };
    } catch (error: any) {
        return sendError(
            event,
            createError({ statusCode: 500, message: error.message || "Internal Server Error" })
        );
    }
});