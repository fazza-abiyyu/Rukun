import { Quiz } from '~/server/model/Quiz';
import {QuizData, QuizQuestion} from '~/types/AuthType';
import { createLog } from '~/server/utils/atLog';
import { LogRequest } from '~/types/AuthType';
import { ActionLog } from '~/types/TypesModel';
import {generateQuiz} from "~/server/utils/generateQuiz";

export default defineEventHandler(async (event) => {
    try {
        const user = event.context.auth?.user;
        if (!user) {
            setResponseStatus(event, 401);
            return { code: 401, message: 'User not authenticated.' };
        }

        const data: QuizData = await readBody(event);
        const questions: QuizQuestion[] = await generateQuiz(data.title, data.description)
        const payload: QuizData = {
            ...data,
            questions: questions
        }
        const createdQuiz = await Quiz.createQuiz(payload);

        const payloadLog: LogRequest = {
            user_id: user.id,
            action: ActionLog.CREATE,
            description: `Quiz dengan judul ${data.title} berhasil dibuat`,
        };
        await createLog(payloadLog);

        return {
            code: 201,
            message: 'Quiz berhasil dibuat!',
            data: createdQuiz,
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
