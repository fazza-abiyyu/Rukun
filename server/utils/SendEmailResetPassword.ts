export const SendEmailResetPassword = async (to: string, subject: string, text: string, html: string) => {
    const nodemailer = await import('nodemailer');
    const { configOptionsMailer, getDefaultMailFromHeader } = await import('~/server/config/mailer');
    const config = useRuntimeConfig();
    let transporter = nodemailer.createTransport(configOptionsMailer);

    const defaultFrom = getDefaultMailFromHeader();
    const mailOptions: any = {
        from: defaultFrom || `${config.APP_NAME ?? ''} <${config.SMTP_USER ?? ''}>`,
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