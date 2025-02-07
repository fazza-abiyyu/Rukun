import {ApplicationLetter} from '~/server/model/ApplicationLetter';

export default defineEventHandler(async (event) => {
    // Check if user exists
    const user = event.context.auth.user;

    if (!user) {
        setResponseStatus(event, 403);
        return {code: 403, message: 'Pengguna tidak valid'};
    }

    try {
        const id = parseInt(event.context.params?.id as string, 10);
        const application_letter = await ApplicationLetter.getApplicationLetterById(id);

        if (!application_letter) {
            setResponseStatus(event, 404);
            return {code: 404, message: 'Surat Pengantar tidak ditemukan'};
        }

        return {
            code: 200,
            message: 'Surat Pengantar berhasil dikembalikan!',
            data: application_letter,
        };
    } catch (error: any) {
        return sendError(event, createError({statusCode: 500, statusMessage: 'Internal Server Error'}));
    }
});