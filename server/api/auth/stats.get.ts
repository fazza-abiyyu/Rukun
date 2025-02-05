import { Stats } from '~/server/model/Stats';
import { defineEventHandler, setResponseStatus, createError, sendError } from 'h3';

export default defineEventHandler(async (event) => {
    try {
        // Ambil data user dari context
        const user = event.context.auth?.user;

        if (!user.id || isNaN(user.id)) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'Pengguna tidak valid' };
        }

        // Panggil method untuk mendapatkan statistik kuis
        const totalScore = await Stats.getTotalScore(user.id);
        const quizResults = await Stats.getUserQuizResults(user.id);

        // Hitung jumlah kuis yang telah diselesaikan
        const quizCompleted = quizResults.length;

        // Ambil status kategori terakhir
        const lastCategoryStatus = quizResults.length > 0 ? quizResults[0].category : 'No category';

        // Panggil method untuk mendapatkan rasio semua kategori hasil kuis
        const categoryRatios = await Stats.getRatioAllResult(user.id);

        // Set response status dan kembalikan data statistik
        setResponseStatus(event, 200);
        return {
            code: 200,
            message: 'Berhasil mengembalikan data stats',
            data: {
                quizCompleted: quizCompleted,
                totalScore: totalScore,
                lastTestStatus: lastCategoryStatus,
                categoryRatios: categoryRatios,
            },
        };
    } catch (error: any) {
        console.error('Error:', error);
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || 'Internal Server Error' })
        );
    }
});
