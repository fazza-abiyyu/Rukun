import bcrypt from 'bcryptjs';
import {RefreshToken} from '~/server/model/RefreshToken';
import {User} from '~/server/model/User';
import {createLog} from '~/server/utils/atLog';
import {generateToken, sendRefreshToken} from '~/server/utils/jwt';
import {LoginRequest, LoginResponse, LogRequest} from '~/types/AuthType';
import {ActionLog} from '~/types/TypesModel';

export default defineEventHandler(async (event) => {
    try {
        const data: LoginRequest = await readBody(event);

        const user = await User.getUserByEmail(data.email);

        if (!user) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'Kesalahan Kredensial' };
        }

        const isPasswordValid = bcrypt.compareSync(data.password, user.password);
        if (!isPasswordValid) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'Kesalahan Kredensial' };
        }

        const { refreshToken, accessToken } = generateToken({
            id: user.id,
            email: user.email
        });

        const { password, ...userData } = user;

        await RefreshToken.create(user.id, refreshToken);

        sendRefreshToken(event, refreshToken);

        const payload : LogRequest = {
            user_id : user.id,
            action : ActionLog.LOGIN,
            description : `Pengguna berhasil masuk pada ${new Date().toLocaleDateString()} `,
        }

        await createLog(payload)

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
            createError({ statusCode: 500, message: error.message || 'Internal Server Error' }),
        );
    }
});