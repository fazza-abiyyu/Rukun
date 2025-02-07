import {Citizen} from '~/server/model/Citizen';

export default defineEventHandler(async (event) => {
    // Check if user exists
    const user = event.context.auth.user;

    if (!user) {
        setResponseStatus(event, 403);
        return {code: 403, message: 'Pengguna tidak valid'};
    }

    try {
        const id = parseInt(event.context.params?.id as string, 10);
        const citizen = await Citizen.getCitizenById(id);

        if (!citizen) {
            setResponseStatus(event, 404);
            return {code: 404, message: 'Data warga tidak ditemukan'};
        }

        return {
            code: 200,
            message: 'Data warga berhasil dikembalikan!',
            data: citizen,
        };
    } catch (error: any) {
        return sendError(event, createError({statusCode: 500, statusMessage: 'Internal Server Error'}));
    }
});