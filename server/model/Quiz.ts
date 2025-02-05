import {QuizData, UpdateQuizData} from "~/types/AuthType";
import {prisma} from "~/server/config/db";


export class Quiz {
    static createQuiz = (data: QuizData) => {
        return prisma.quiz.create({
            data: {
                title: data.title,
                description: data.description,
                questions: {
                    create: data.questions.map(question => ({
                        question: question.question,
                        answers: {
                            create: question.answers.map(answer => ({
                                answer: answer.answer,  // Jawaban (A, B, C, D)
                                value: answer.value     // Nilai untuk jawaban
                            }))
                        }
                    }))
                }
            },
            include: {
                questions: {
                    include: {
                        answers: true  // Menyertakan jawaban yang terkait dengan setiap pertanyaan
                    }
                }
            }
        });
    };

    static getQuizById = (id: number) => {
        return prisma.quiz.findUnique({
            where: { id },
            include: {
                questions: true,
                quizResults: true,
            },
        });
    };

    static countAllQuiz = () => {
        return prisma.quiz.count();
    }

    static getAllQuizzes = (page: number, pageSize: number) => {
        const skip = (page - 1) * pageSize;
        const take = pageSize;

        return prisma.quiz.findMany({
            skip,
            take
        });
    };

    static updateQuiz = (id: number, data: UpdateQuizData) => {
        return prisma.quiz.update({
            where: { id },
            data,
        });
    };

    static deleteQuiz = (id: number) => {
        return prisma.quiz.delete({
            where: { id },
        });
    };
}
