import { UserQuizResult } from '~/server/model/UserQuizResult';
import { UserQuizResultData } from '~/types/AuthType';
import { createLog } from '~/server/utils/atLog';
import { LogRequest } from '~/types/AuthType';
import { ActionLog } from '~/types/TypesModel';
import { calculateQuizScoreAndCategory } from '~/server/utils/QuizScore';

export default defineEventHandler(async (event) => {
    try {
        const user = event.context.auth?.user;
        if (!user) {
            setResponseStatus(event, 401);
            return { code: 401, message: 'User not authenticated.' };
        }

        const data: Omit<UserQuizResultData, 'user_id' | 'score' | 'category' | 'message'> = await readBody(event);

        // Validasi format jawaban
        if (!Array.isArray(data.answers) || data.answers.length === 0) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'Invalid answers format or no answers provided.' };
        }

        // Hitung skor, kategori, dan pesan berdasarkan jawaban
        const { score, category, message } = await calculateQuizScoreAndCategory(data.answers);

        // Buat hasil kuis pengguna
        const createdUserQuizResult = await UserQuizResult.createUserQuizResult({
            ...data,
            user_id: user.id, // Ambil user_id dari konteks autentikasi
            score,
            category,
            message,
        });

        const payloadLog: LogRequest = {
            user_id: user.id,
            action: ActionLog.CREATE,
            description: `Hasil kuis untuk user ID ${user.id} berhasil dibuat`,
        };
        await createLog(payloadLog);

        return {
            code: 201,
            message: 'Hasil kuis berhasil dibuat!',
            data: createdUserQuizResult,
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
