// Type definitions for Prisma models

// Type for User model
export type User = {
    id: number;
    username: string;
    password: string;
    email: string;
    fullName: string;
    createdAt: Date;
    updatedAt: Date;
    quizResults: UserQuizResult[];
    profile: UserProfile[];
}

// Type for UserProfile model
export type UserProfile = {
    id: number;
    userId: number;
    bod?: Date | null;
    gender?: string | null;
    phoneNumber?: string | null;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}

// Type for Quiz model
export type Quiz = {
    id: number;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    questions: QuizQuestion[];
    quizResults: UserQuizResult[];
}

// Type for QuizQuestion model
export type QuizQuestion = {
    id: number;
    quizId: number;
    question: string;
    createdAt: Date;
    updatedAt: Date;
    quiz: Quiz;
    answers: QuizAnswer[];
}

// Type for QuizAnswer model
export type QuizAnswer = {
    id: number;
    questionId: number;
    answer: string;
    isCorrect: boolean;
    question: QuizQuestion;
    createdAt: Date;
    updatedAt: Date;
}

// Type for UserQuizResult model
export type UserQuizResult = {
    id: number;
    userId: number;
    quizId: number;
    score: number;
    completedAt: Date;
    user: User;
    quiz: Quiz;
    createdAt: Date;
    updatedAt: Date;
}

export enum ActionLog {
    LOGOUT = 'LOGOUT',
    LOGIN = 'LOGIN',
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
}