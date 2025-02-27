
import bcrypt from 'bcryptjs';
import {RefreshToken} from '~/server/model/RefreshToken';
import {User} from '~/server/model/User';
import {createLog} from '~/server/utils/atLog';
import {generateToken, sendRefreshToken} from '~/server/utils/jwt';
import {LoginRequest, LoginResponse} from '~/types/AuthType';
import {ActionLog} from '~/types/TypesModel';

export default defineEventHandler(async (event) => {
    try {
        const data: LoginRequest = await readBody(event);

        // Validate input
        if (!data.email || !data.password) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'Pastikan telah mengisi dengan benar dan lengkap' };
        }

        // Check if user exists
        const user = await User.getUserByEmail(data.email);

        if (!user) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'Kesalahan Kredensial' };
        }

        // Check password
        const isPasswordValid = bcrypt.compareSync(data.password, user.password);
        if (!isPasswordValid) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'Kesalahan Kredensial' };
        }

        // Generate tokens
        const { refreshToken, accessToken } = generateToken({
            id: user.id,
            email: user.email,
            role: user.role
        });

        const { password, ...userData } = user;

        // Store refresh token in the database
        await RefreshToken.create(user.id, refreshToken);

        // Set refresh token in cookie
        sendRefreshToken(event, refreshToken);

        const payload  = {
            user_id : user.id,
            action : ActionLog.LOGIN,
            description : `Pengguna berhasil masuk pada ${new Date().toLocaleDateString()} `,
        }

        await createLog(payload)

        // Return access token in response
        return <LoginResponse> {
            code: 200,
            message: 'Berhasil Masuk!',
            access_token: accessToken,
            data: {
                user: userData,
            },
        };
    } catch (error: any) {
        console.error('Gagal Masuk:', error);
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || 'Internal Server Error' }),
        );
    }
});