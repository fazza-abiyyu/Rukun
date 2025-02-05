import { QuizQuestion } from '~/server/model/QuizQuestion';
import { createLog } from '~/server/utils/atLog';
import { LogRequest } from '~/types/AuthType';
import { ActionLog } from '~/types/TypesModel';

export default defineEventHandler(async (event) => {
    try {
        const user = event.context.auth?.user;
        if (!user) {
            setResponseStatus(event, 401);
            return { code: 401, message: 'User not authenticated.' };
        }

        const id = parseInt(event.context.params?.id || "0");

        if (!id) {
            setResponseStatus(event, 400);
            return { code: 400, message: "Invalid request data." };
        }

        await QuizQuestion.deleteQuizQuestion(id);

        const payloadLog: LogRequest = {
            user_id: user.id,
            action: ActionLog.DELETE,
            description: `Pertanyaan quiz dengan ID ${id} berhasil dihapus`,
        };
        await createLog(payloadLog);

        return {
            code: 200,
            message: 'Pertanyaan quiz berhasil dihapus!',
        };
    } catch (error: any) {
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: error?.message || 'Internal Server Error',
            })
        );
    }
});
