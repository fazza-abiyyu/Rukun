import { prisma } from '~/server/config/db';
import bcrypt from 'bcryptjs';
import { getCookie, setCookie } from 'h3';

export default defineEventHandler(async (event) => {
    try {
        // Membaca body dari request
        const { otp, newPassword } = await readBody(event);

        // Validasi input
        if (!otp || !newPassword) {
            return createError({ statusCode: 400, message: 'OTP dan kata sandi baru harus diisi.' });
        }

        // Ambil email dari cookies
        const resetEmail = getCookie(event, 'reset_email');
        if (!resetEmail) {
            return createError({ statusCode: 400, message: 'Sesi pengaturan ulang kata sandi tidak valid. Silakan coba lagi.' });
        }

        // Cari pengguna berdasarkan email
        const user = await prisma.user.findUnique({
            where: { email: resetEmail },
        });

        if (!user) {
            return createError({ statusCode: 400, message: 'Pengguna tidak ditemukan.' });
        }

        // Validasi OTP
        if (user.otp !== parseInt(otp, 10)) {
            return createError({ statusCode: 400, message: 'OTP tidak valid atau sudah kedaluwarsa.' });
        }

        // Hash kata sandi baru
        const hashedPassword = bcrypt.hashSync(newPassword, 10);

        // Perbarui kata sandi pengguna dan hapus OTP
        await prisma.user.update({
            where: { email: resetEmail },
            data: {
                password: hashedPassword,
                otp: null, // Hapus OTP setelah digunakan
            },
        });

        console.log('Kata sandi berhasil diperbarui untuk pengguna:', resetEmail);

        // Hapus cookie reset_email
        setCookie(event, 'reset_email', '', { httpOnly: true, maxAge: 0 });

        // Set response header untuk JSON
        event.res.setHeader('Content-Type', 'application/json');

        // Mengembalikan respons sukses
        return { code: 200, message: 'Kata sandi berhasil diperbarui.' };
    } catch (error: any) {
        console.error(error);
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: 'Internal Server Error' })
        );
    }
});
