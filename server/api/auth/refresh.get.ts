import { RefreshToken } from '~/server/model/RefreshToken';
import { decodeRefreshToken, generateAccessToken } from '~/server/utils/jwt';
import {User} from "~/server/model/User";

export default defineEventHandler(async (event) => {
    try {
        const refreshToken = getCookie(event, 'refresh_token');

        if (!refreshToken) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'Tidak ada refresh token yang ditemukan dalam cookie.' };
        }

        const storedToken = await RefreshToken.findToken(refreshToken);
        if (!storedToken) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Refresh token tidak valid' };
        }

        let decoded: any;
        try {
            decoded = decodeRefreshToken(refreshToken);
        } catch (error) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Refresh token tidak valid' };
        }

        const user = await User.getUserById(decoded.id);
        if (!user) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Pengguna tidak valid dengan refresh token.' };
        }

        const accessToken = generateAccessToken({
            id: user.id,
            email: user.email,
            role: user.role
        });

        return {
            code: 200,
            message: 'Token akses baru berhasil dibuat!',
            access_token: accessToken,
        };
    } catch (error: any) {
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || 'Internal Server Error' }),
        );
    }
});