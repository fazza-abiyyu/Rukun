import type {User} from "@prisma/client";
import {ActionLog} from "./TypesModel"
import {Gender, Role} from "~/types/TypesModel";

export interface RegisterRequest {
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

export interface LogRequest {
    user_id: number;
    action: ActionLog;
    description: string;
}