import { QuizQuestion } from '~/server/model/QuizQuestion';
import { UpdateQuizQuestionData } from '~/types/AuthType';
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
        const data: UpdateQuizQuestionData = await readBody(event);

        if (!id) {
            setResponseStatus(event, 400);
            return { code: 400, message: "Invalid request data." };
        }

        const updatedQuizQuestion = await QuizQuestion.updateQuizQuestion(id, data);

        const payloadLog: LogRequest = {
            user_id: user.id,
            action: ActionLog.UPDATE,
            description: `Pertanyaan quiz dengan ID ${id} berhasil diperbarui`,
        };
        await createLog(payloadLog);

        return {
            code: 200,
            message: 'Pertanyaan quiz berhasil diperbarui!',
            data: updatedQuizQuestion,
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
