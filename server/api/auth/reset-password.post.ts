import { prisma } from '~/server/config/db';
import { SendEmailResetPassword } from '~/server/utils/SendEmailResetPassword';

// Fungsi untuk menghasilkan OTP 6 digit angka
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}

export default defineEventHandler(async (event) => {
    try {
        const { email, base_url } = await readBody(event);

        // Validasi email
        const user = await prisma.user.findUnique({
            where: { email }
        });
        if (!user) {
            setResponseStatus(event, 200);
            return { code: 400, message: 'Tautan pengaturan ulang kata sandi telah dikirim ke email Anda jika terdaftar.' };
        }

        // Menghasilkan OTP 6 digit angka
        const otp = generateOTP();

        // Simpan OTP di kolom otp dalam tabel user
        await prisma.user.update({
            where: { email },
            data: { otp } ,
        });

        // Buat konten email dalam format HTML
        const emailHtml = `
            <h1>Reset Password</h1>
            <p>Use the OTP below to reset your password:</p>
            <h2>${otp}</h2>
            <p>This OTP is valid for 15 minutes.</p>
        `;

        // Kirim email dengan OTP
        await SendEmailResetPassword(email, 'Setel Ulang Kata Sandi', `Gunakan OTP berikut untuk mengatur ulang kata sandi Anda: ${otp}`, emailHtml);

        // Mengembalikan respons sukses
        return { code: 200, message: 'Tautan pengaturan ulang kata sandi telah dikirim ke email Anda jika terdaftar.' };

    } catch (error: any) {
        console.error(error);
        return sendError(
            event,
            createError({ statusCode: 500, message: 'Internal Server Error' })
        );
    }
});