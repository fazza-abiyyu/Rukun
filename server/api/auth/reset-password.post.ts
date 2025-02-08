import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '~/server/config/db';
import { RefreshToken } from '~/server/model/RefreshToken';

const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN!;

export default defineEventHandler(async (event) => {
    try {
        const { newPassword, confirmNewPassword } = await readBody(event);
        const token = event.node.req.url?.split('token=')[1];
        console.log('Token:', token);

        if (!token || !newPassword || !confirmNewPassword) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'Dibutuhkan semua inputan' };
        }

        if (newPassword !== confirmNewPassword) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'Kata sandi tidak sama' };
        }

        // Periksa apakah token ada di database
        const tokenInDb = await RefreshToken.findToken(token);
        if (!tokenInDb) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Tidak valid atau token sudah kadaluarsa' };
        }

        // Verifikasi token reset
        let decoded: any;
        try {
            decoded = jwt.verify(token, REFRESH_TOKEN_SECRET);
        } catch (error) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Tidak valid atau token sudah kadaluarsa' };
        }

        // Periksa apakah users ada
        const user = await prisma.user.findUnique({
            where: { id: decoded.id }
        });
        if (!user) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Pengguna tidak valid dengan pengguna' };
        }

        // Periksa apakah kata sandi baru berbeda dari kata sandi lama
        const isPasswordSame = bcrypt.compareSync(newPassword, user.password);
        if (isPasswordSame) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'Kata sandi baru tidak boleh sama dengan kata sandi lama.' };
        }

        // Hash new password
        const hashedPassword = bcrypt.hashSync(newPassword, 10);

        // Update users password
        await prisma.user.update({
            where: { id: user.id },
            data: { password: hashedPassword }
        });

        // Hapus refresh token dari database setelah perubahan password berhasil
        await RefreshToken.deleteToken(token);

        // Return success response
        return { code: 200, message: 'Kata sandi telah berhasil diatur ulang.' };

    } catch (error: any) {
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: 'Internal Server Error' })
        );
    }
});