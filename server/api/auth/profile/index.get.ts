import { User } from '~/server/model/User';
import {UserProfile} from "~/server/model/UserProfile";

export default defineEventHandler(async (event) => {
    try {
        const user = event.context.auth?.user;

        if (!user.id || isNaN(user.id)) {
            setResponseStatus(event, 400);
            return {code: 400, message: 'Pengguna tidak valid'};
        }

        const profileGet = await UserProfile.getUserProfileById(user.id);

        setResponseStatus(event, 200);
        return {
            code: 200,
            message: "Profile pengunna berhasil dikembalikan",
            data: {
                profile: profileGet
            },
        };
    } catch (error: any) {
        return sendError(
            event,
            createError({ statusCode: 500, message: error.message || "Internal Server Error" })
        );
    }
});