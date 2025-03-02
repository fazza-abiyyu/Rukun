import { User } from "~/server/model/User";
import { ActionLog } from "~/types/TypesModel";
import { LogRequest } from "~/types/AuthType";

export default defineEventHandler(async (event) => {
    try {
        const user = event.context.auth?.user;
        if (!user) {
            console.error("Pengguna tidak terautentikasi");
            throw createError({ statusCode: 401, statusMessage: "User not authenticated." });
        }

        const id = Number(event.context.params?.id ?? "0");
        if (isNaN(id) || id <= 0) {
            throw createError({ statusCode: 400, statusMessage: "Invalid user ID." });
        }

        const data = await readBody(event);
        if (!data || Object.keys(data).length === 0) {
            throw createError({ statusCode: 400, statusMessage: "Invalid request data." });
        }

        const updatedUser = await User.updateUser(id, data);
        if (!updatedUser) {
            throw createError({ statusCode: 500, statusMessage: "Failed to update user." });
        }

        const payload: LogRequest = {
            user_id: user.id,
            action: ActionLog.UPDATE,
            description: `Akun dengan ID ${id} berhasil diperbarui`,
        };
        await createLog(payload);

        return { code: 200, message: "Akun pengguna berhasil diperbarui!" };
    } catch (error: any) {
        console.error("Error updating user:", error);
        return sendError(event, createError({ statusCode: error.statusCode || 500, statusMessage: error.statusMessage || "Internal Server Error" }));
    }
});
