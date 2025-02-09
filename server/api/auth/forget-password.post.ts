import { prisma } from '~/server/config/db';
import { SendEmailResetPassword } from '~/server/utils/SendEmailResetPassword';
import { setCookie } from 'h3';

// Fungsi untuk menghasilkan OTP 6 digit angka
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}

export default defineEventHandler(async (event) => {
    try {
        const { email, base_url } = await readBody(event);
        console.log('Email yang diterima:', email);

        // Validasi email
        const user = await prisma.user.findUnique({
            where: { email }
        });
        if (!user) {
            console.log('Pengguna tidak ditemukan');
            setResponseStatus(event, 200);
            return { code: 400, message: 'OTP pengaturan ulang kata sandi telah dikirim ke email Anda jika terdaftar.' };
        }

        // Menghasilkan OTP 6 digit angka
        const otp = generateOTP();

        // Simpan OTP di kolom otp dalam tabel user
        await prisma.user.update({
            where: { email },
            data: { otp },
        });
        console.log('OTP disimpan ke database');

        // Buat konten email dalam format HTML
        const emailHtml = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Setel Ulang Kata Sandi</title>
            </head>
            <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
                <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); padding: 20px;">
                    <h1 style="color: #ff6f00; text-align: center; font-size: 24px; margin-bottom: 20px;">Setel Ulang Kata Sandi</h1>
                    <p style="font-size: 16px; line-height: 1.5; color: #333333; text-align: center; margin-bottom: 20px;">
                        Gunakan OTP berikut untuk mengatur ulang kata sandi Anda:
                    </p>
                    <div style="background-color: #ff6f00; color: #ffffff; font-size: 28px; font-weight: bold; text-align: center; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                        ${otp}
                    </div>
                    <p style="font-size: 14px; line-height: 1.5; color: #666666; text-align: center;">
                        OTP ini berlaku selama <strong>15 menit</strong>. Jangan berikan OTP ini kepada siapa pun.
                    </p>
                </div>
            </body>
            </html>
        `;

        // Kirim email dengan OTP
        await SendEmailResetPassword(email, 'Setel Ulang Kata Sandi', `Gunakan OTP berikut untuk mengatur ulang kata sandi Anda: ${otp}`, emailHtml);

        // Simpan email di cookies
        setCookie(event, 'reset_email', email, { httpOnly: true, maxAge: 15 * 60 }); // 15 menit

        // Set response header untuk JSON
        event.res.setHeader('Content-Type', 'application/json');

        // Mengembalikan respons sukses
        return { code: 200, message: 'Tautan pengaturan ulang kata sandi telah dikirim ke email Anda jika terdaftar.' };

    } catch (error: any) {
        return sendError(
            event,
            createError({ statusCode: 500, message: 'Internal Server Error' })
        );
    }
});
