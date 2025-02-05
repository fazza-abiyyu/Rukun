import {QuizQuestionData} from "~/types/AuthType";
import {prisma} from "~/server/config/db";

export class QuizQuestion {
    static createQuizQuestion = async (data: QuizQuestionData) => {
        // Create quiz question
        const createdQuestion = await prisma.quizQuestion.create({
            data: {
                quiz_id: data.quiz_id,
                question: data.question,
            },
        });

        // Create quiz answers
        for (const answer of data.answers) {
            await prisma.quizAnswer.create({
                data: {
                    question_id: createdQuestion.id,
                    answer: answer.answer,
                    value: answer.value,
                },
            });
        }

        return createdQuestion;
    };

    static getQuizQuestionById = (id: number) => {
        return prisma.quizQuestion.findUnique({
            where: { id },
            include: {
                answers: true,
            },
        });
    };

    static getAllQuizQuestions = (page: number, pageSize: number) => {
        const skip = (page - 1) * pageSize;
        const take = pageSize;

        return prisma.quizQuestion.findMany({
            skip,
            take,
            include: {
                answers: true,
            },
        });
    };

    static updateQuizQuestion = async (id: number, data: QuizQuestionData) => {
        // Update question details
        const updatedQuestion = await prisma.quizQuestion.update({
            where: { id },
            data: {
                question: data.question,
            },
        });

        // Handle answers update separately
        if (data.answers) {
            for (const answer of data.answers) {
                if (answer.id) {
                    // Update existing answer
                    await prisma.quizAnswer.update({
                        where: { id: answer.id },
                        data: {
                            answer: answer.answer,
                            value: answer.value,
                        },
                    });
                } else {
                    // Create new answer
                    await prisma.quizAnswer.create({
                        data: {
                            question_id: id,
                            answer: answer.answer,
                            value: answer.value,
                        },
                    });
                }
            }
        }

        return updatedQuestion;
    };

    static deleteQuizQuestion = (id: number) => {
        return prisma.quizQuestion.delete({
            where: { id },
        });
    };

    static async countAllQuizQuestions() {
        return prisma.quizQuestion.count();
    }
}
