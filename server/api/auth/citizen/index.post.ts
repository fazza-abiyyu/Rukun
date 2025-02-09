import { Citizen } from '~/server/model/Citizen';
import { LogRequest } from "~/types/AuthType";
import { ActionLog } from "~/types/TypesModel";

export default defineEventHandler(async (event) => {
    // Check if user exists
    const user = event.context.auth.user;

    if (!user) {
        console.log('Pengguna tidak valid.');
        setResponseStatus(event, 403);
        return { code: 403, message: 'Pengguna tidak valid' };
    }

    try {
        // Read the request body
        const data = await readBody(event);
        console.log('Data yang diterima:', data);

        // Assign user ID from the token for create_by field
        const newData = {
            ...data,
            create_by: user.id
        };
        console.log('Data dengan create_by dari user ID:', newData);

        // Buat data warga baru
        const citizen = await Citizen.createCitizen(newData);
        console.log('Data warga yang ditambahkan:', citizen);

        // Buat log tindakan
        const payload: LogRequest = {
            user_id: user.id,
            action: ActionLog.CREATE,
            description: `Data warga dengan ID ${citizen.id} berhasil ditambahkan`,
        };

        await createLog(payload);
        console.log('Log tindakan berhasil dibuat:', payload);

        return {
            code: 201,
            message: 'Data warga berhasil ditambahkan!',
            data: citizen,
        };
    } catch (error: any) {
        console.error('Kesalahan terjadi:', error);
        return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error' }));
    }
});
