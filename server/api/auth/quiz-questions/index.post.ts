import { QuizQuestion } from '~/server/model/QuizQuestion';
import { QuizQuestionData } from '~/types/AuthType';
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

        const data: QuizQuestionData = await readBody(event);
        const createdQuizQuestion = await QuizQuestion.createQuizQuestion(data);

        const payloadLog: LogRequest = {
            user_id: user.id,
            action: ActionLog.CREATE,
            description: `Pertanyaan dengan teks "${data.question}" berhasil dibuat`,
        };
        await createLog(payloadLog);

        return {
            code: 201,
            message: 'Pertanyaan quiz berhasil dibuat!',
            data: createdQuizQuestion,
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
