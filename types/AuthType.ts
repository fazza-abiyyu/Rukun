import {$Enums} from "@prisma/client";
import Gender = $Enums.Gender;
import type {User} from "@prisma/client";
import {ActionLog} from "./TypesModel"

export interface RegisterRequest {
    full_name: string;
    username: string;
    email: string;
    password: string;
}

export interface RegisterResponse {
    code: number,
    message: string,
    data: {
        user: User,
    },
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    code: number,
    message: string,
    access_token: string,
    data: {
        user: User,
    },
}
export interface UpdateUserRequest {
    username?: string;
    email?: string;
    full_name?: string;
}
export interface UserProfileRequest {
    // user_id: number;
    bod?: Date | null;
    gender?: Gender;
    phoneNumber?: string | null;
}

export interface UpdateUserProfileRequest {
    dateOfBirth?: Date | null;
    gender?: Gender;
    phoneNumber?: string | null;
}

export interface LogRequest {
    user_id: number;
    action: ActionLog;
    description: string;
}

enum Answer {
    A = 'A',
    B = 'B',
    C = 'C',
    D = 'D'
}

// Tipe untuk jawaban pada setiap soal
interface QuizAnswer {
    answer: Answer;  // Jawaban (A, B, C, D)
    value: number;   // Nilai untuk jawaban tersebut
}

// Tipe untuk pertanyaan dalam quiz
export interface QuizQuestion {
    question: string;  // Pertanyaan
    answers: QuizAnswer[];  // Jawaban yang terkait dengan pertanyaan tersebut
}

// Tipe untuk data quiz
export interface QuizData {
    title: string;
    description: string;
    questions: QuizQuestion[];
}

export interface UpdateQuizData {
    title?: string;
    description?: string;
}

export interface QuizQuestionData {
    quiz_id: number;
    question: string;
    answers: Array<{ id?: number; answer: Answer; value: number }>;
}

export interface UpdateQuizQuestionData {
    question?: string;
    answers?: Array<{ id?: number; answer: Answer; value: number }>;
}

export interface UserQuizResultData {
    user_id: number;
    quiz_id: number;
    answers: { question_id: number; answer: Answer }[];
    score: number;
    category: string;
    message: string;
}

export interface QuizResult {
    score: number;
    category: string;
    message: string;
}

export interface UpdateUserQuizResultData {
    answers?: { question_id: number; answer: string; value: number }[];
    score?: number;
    category?: string;
    message?: string;
}
