import { User } from "~/server/model/User";
import { ActionLog } from "~/types/TypesModel";
import { LogRequest } from "~/types/AuthType";
import { UserProfile } from "~/server/model/UserProfile";

export default defineEventHandler(async (event) => {
    try {
        const user = event.context.auth?.user;

        if (!user.id || isNaN(user.id)) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'Pengguna tidak valid' };
        }

        const data = await readBody(event);

        const payload: LogRequest = {
            user_id: user.id,
            action: ActionLog.CREATE,
            description: `Profile pada akun ${user.id}, berhasil ditambahkan`,
        };

        const userIsExists = await User.getUserById(user.id);
        if (!userIsExists) {
            setResponseStatus(event, 404);
            return { code: 404, message: 'Pengguna tidak ditemukan!' };
        }

        const createdUserProfile = await UserProfile.createUserProfile(user.id, data);
        await createLog(payload);

        setResponseStatus(event, 200);
        return {
            code: 200,
            message: 'Profile pada akun berhasil ditambahkan!',
            data: {
                user: createdUserProfile,
            },
        };
    } catch (error: any) {
        console.error('Error:', error);  // Tambahkan logging kesalahan untuk diagnosis
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || 'Internal Server Error' })
        );
    }
});
