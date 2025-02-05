import { PrismaClient, Answer } from '@prisma/client';

const prisma = new PrismaClient();

export interface QuizResult {
    score: number;
    category: string;
    message: string;
}

export const calculateQuizScoreAndCategory = async (
    answers: { question_id: number; answer: Answer }[]
): Promise<QuizResult> => {
    let score = 0;
    for (const answer of answers) {
        const quizAnswer = await prisma.quizAnswer.findFirst({
            where: { question_id: answer.question_id, answer: answer.answer }
        });
        if (quizAnswer) {
            score += quizAnswer.value;
        }
    }

    let category = '';
    let message = '';

    if (score <= 10) {
        category = 'Baik';
        message = 'Syukurlah saat ini score kesehatan mentalmu tergolong Baik. Tetap jaga kesehatan mentalmu dengan rajin mengisi gratitude journal dan membaca tips dari artikel psikologi.';
    } else if (score <= 20) {
        category = 'Sedang';
        message = 'Score kesehatan mentalmu sedang. Pastikan kamu tetap menjaga kesehatan mentalmu dengan mengikuti saran dan tips yang diberikan.';
    } else {
        category = 'Buruk';
        message = 'Score kesehatan mentalmu tergolong Buruk. Disarankan untuk segera mencari bantuan profesional atau mengikuti tips dan saran untuk memperbaiki kesehatan mentalmu.';
    }

    return { score, category, message };
};
