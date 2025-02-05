import { User } from '~/server/model/User';
import { ActionLog } from '~/types/TypesModel';
import { LogRequest } from '~/types/AuthType';
import { UserProfile } from '~/server/model/UserProfile';
import { createLog } from '~/server/utils/atLog';

export default defineEventHandler(async (event) => {
    try {
        const user = event.context.auth?.user;

        // Check if the user is valid
        if (!user?.id || isNaN(user.id)) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'Pengguna tidak valid' };
        }

        // Read request body containing user data
        const data = await readBody(event);

        // Prepare log payload for the action
        const logPayload: LogRequest = {
            user_id: user.id,
            action: ActionLog.UPDATE,
            description: `Akun dengan ID ${user.id} berhasil diperbarui`,
        };

        // Check if the user profile already exists
        const userExists = await UserProfile.getUserProfileById(user.id);

        // If profile does not exist, create a new one
        if (!userExists) {
            const { name, ...profileData } = data;

            // Prepare data for creating a new profile
            const createPayload = {
                ...profileData,
                user_id: user.id,
                name,  // Include the name in the profile creation
            };

            const createdUserProfile = await UserProfile.createUserProfile(createPayload);

            // Log the action
            await createLog(logPayload);

            setResponseStatus(event, 200);
            return {
                code: 200,
                message: 'Akun pengguna berhasil dibuat!',
                data: {
                    user: createdUserProfile,
                },
            };
        }

        // If profile exists, update it
        const updatedUserProfile = await UserProfile.updateUserProfile(user.id, data);

        // Log the update action
        await createLog(logPayload);

        setResponseStatus(event, 200);
        return {
            code: 200,
            message: 'Akun pengguna berhasil diperbarui!',
            data: {
                user: updatedUserProfile,
            },
        };
    } catch (error: any) {
        console.error('Error updating user profile:', error);

        return sendError(
            event,
            createError({ statusCode: 500, message: error?.message || 'Internal Server Error' })
        );
    }
});
