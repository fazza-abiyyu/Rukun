import {Citizen} from '~/server/model/Citizen';
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
        // Read the request body
        const data = await readBody(event);

        // Assign user ID from the token
        const newData = {
            ...data,
            user_id: user.id
        };

        const citizen = await Citizen.createCitizen(newData);

        const payload: LogRequest = {
            user_id: user.id,
            action: ActionLog.CREATE,
            description: `Data wagra dengan ID ${user.id}, berhasil ditambahkan`,
        }

        await createLog(payload)

        return {
            code: 201,
            message: 'Data warga berhasil ditambahkan!',
            data: citizen,
        };
    } catch (error: any) {
        return sendError(event, createError({statusCode: 500, statusMessage: 'Internal Server Error'}));
    }
});