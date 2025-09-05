import nodemailer from 'nodemailer';
import { configOptionsMailer } from '~/server/config/mailer';

export const SendEmailResetPassword = async (to: string, subject: string, text: string, html: string) => {
    const config = useRuntimeConfig();
    let transporter = nodemailer.createTransport(configOptionsMailer);

    const mailOptions = {
        from: `${config.APP_NAME ?? ""} <${config.MAIL_FROM_EMAIL ?? ""}>`,
        to,
        subject,
        text,
        html,
    };

    try {
        // Kirim email
        const info = await transporter.sendMail(mailOptions as any);
        console.log("Email terkirim: %s", info.messageId);
    } catch (error) {
        console.error("Gagal mengirim email:", error);
    }
};