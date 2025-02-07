import bcrypt from 'bcryptjs';
import {User} from '~/server/model/User';
import {RegisterRequest, RegisterResponse} from "~/types/AuthType";

export default defineEventHandler(async (event) => {
    try {
        const data: RegisterRequest = await readBody(event);

        if (!data.username || !data.email || !data.password) {
            setResponseStatus(event, 400);
            return {code: 400, message: "Harap berikan semua kolom yang diperlukan (nama lengkap, email, kata sandi)."};
        }

        const hashedPassword = bcrypt.hashSync(data.password, 10);

        const user = await User.registerUser({
            username: data.username,
            email: data.email,
            password: hashedPassword
        });

        setResponseStatus(event, 201);
        await SendEmailRegister(user.email, user.username);

        return <RegisterResponse>{
            code: 201,
            message: "Pengguna berhasil terdaftar!",
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                }
            },
        };
    } catch (error: any) {
        return sendError(
            event,
            createError({statusCode: 500, statusMessage: error.message || "Internal Server Error"})
        );
    }


});



