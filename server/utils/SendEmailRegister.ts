import nodemailer from "nodemailer";
import {configOptionsMailer} from "~/server/config/mailer";

const config = useRuntimeConfig()

export async function SendEmailRegister(toEmail : string, fullName : string) {
    // Buat transporter
    let transporter = nodemailer.createTransport(configOptionsMailer);

    // Pesan email
    const mailOptions = {
        from: `${config.APP_NAME ?? ""} <${config.MAIL_FROM_EMAIL ?? ""}>`, // Ganti dengan pengirim email Anda
        to: toEmail, // Email penerima
        subject: "Pendaftaran Berhasil", // Subjek email
        html: `
            <!DOCTYPE html>
            <html lang="id">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Selamat Datang di Aplikasi Kami</title>
            </head>
            <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f9;">
                <table align="center" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <tr>
                        <td style="padding: 20px; text-align: center; background-color: #ff4900; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                            <h1 style="color: #ffffff; font-size: 24px; margin: 0;">Selamat Datang, ${fullName}!</h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px; text-align: center;">
                            <p style="font-size: 16px; color: #333333; margin: 10px 0;">Terima kasih telah mendaftar di aplikasi kami.</p>
                            <p style="font-size: 16px; color: #555555; margin: 10px 0;">Anda sekarang dapat login dan menikmati layanan kami.</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px; text-align: center;">
                            <a href="#" style="display: inline-block; padding: 10px 20px; background-color: #ff4900; color: #ffffff; text-decoration: none; border-radius: 4px; font-size: 16px;">Login Sekarang</a>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px; text-align: center; background-color: #f4f4f9; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
                            <p style="font-size: 14px; color: #777777; margin: 5px 0;">Salam hangat,</p>
                            <p style="font-size: 14px; color: #777777; margin: 5px 0;">Tim Rukun</p>
                        </td>
                    </tr>
                </table>
            </body>
            </html>
        `
    };

    try {
        // Kirim email
        const info = await transporter.sendMail(mailOptions as any);
        console.log("Email terkirim: %s", info.messageId);
    } catch (error) {
        console.error("Gagal mengirim email:", error);
    }
}