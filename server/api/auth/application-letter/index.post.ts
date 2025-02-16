import { ApplicationLetter } from '~/server/model/ApplicationLetter';
import { LogRequest } from '~/types/AuthType';
import { ActionLog } from '~/types/TypesModel';
import { defineEventHandler, readBody, sendError, createError, setResponseStatus } from 'h3';
import {ApplicationLetterEmailSender} from "~/server/utils/ApplicationLeterEmailSender";

export default defineEventHandler(async (event) => {
    // Check if user exists
    const user = event.context.auth.user;

    if (!user) {
        setResponseStatus(event, 403);
        return { code: 403, message: 'Pengguna tidak valid' };
    }

    try {
        // Read the request body
        const data = await readBody(event);

        // Retrieve citizen information by NIK
        const citizen = await ApplicationLetter.getCitizenByNIK(data.data_nik);

        if (!citizen) {
            return sendError(event, createError({ statusCode: 404, statusMessage: 'NIK tidak ditemukan' }));
        }

        // Assign user ID from the token and citizen ID
        const newData = {
            ...data,
            create_by: user.id
        };

        // Create the application letter
        const applicationLetter = await ApplicationLetter.createApplicationLetter(newData);
        const title = "Surat Elektronik";
        const description = "Surat Elektronik dibuat oleh Sistem RUKUN";


        // Send the application letter email
        await ApplicationLetterEmailSender(
            newData.toEmail,
            title,
            description,
            newData.category_letter,
            newData.data_nik,
            user.id
        );

        // Log the creation
        const payload: LogRequest = {
            user_id: user.id,
            action: ActionLog.CREATE,
            description: `ApplicationLetter with ID ${applicationLetter.id} was created by user ${user.id}`,
        };
        await createLog(payload);

        return {
            code: 201,
            message: 'Application letter created successfully!',
            data: applicationLetter,
        };
    } catch (error: any) {
        console.error(error);
        return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error' }));
    }
});
