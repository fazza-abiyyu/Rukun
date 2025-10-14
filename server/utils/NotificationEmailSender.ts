import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export async function NotificationEmailSender(title: string, description: string, date: string, create_by: number) {
    const nodemailer = await import('nodemailer');
    const {configOptionsMailer, getDefaultMailFromHeader} = await import('~/server/config/mailer');
    const config = useRuntimeConfig();

    // Create a transporter
    const transporter = nodemailer.createTransport(configOptionsMailer);

    // Retrieve the username of the creator
    const creator = await prisma.user.findUnique({
        where: {id: create_by},
        select: {username: true}
    });

    // Retrieve all email addresses from the database
    const users = await prisma.user.findMany({
        select: {email: true}
    });

    // Email message
    const defaultFrom = getDefaultMailFromHeader();
    const mailOptions = (toEmail: string) => ({
        from: defaultFrom || `${config.APP_NAME ?? ''} <${config.SMTP_USER ?? ''}>`,
        to: toEmail, // Recipient email
        subject: "New Notification", // Email subject
        html: `
        <!DOCTYPE html>
        <html lang="id">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    margin: 0;
                    padding: 0;
                    background-color: #fff3e0;
                    color: #5a3d31;
                }
                .container {
                    max-width: 800px;
                    margin: 20px auto;
                    padding: 20px;
                    background: #ffffff;
                    border-radius: 12px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    border: 2px solid #ff9800;
                }
                .header {
                    text-align: center;
                    border-bottom: 2px solid #ff9800;
                    padding-bottom: 10px;
                    margin-bottom: 20px;
                }
                .header h1 {
                    margin: 5px 0;
                    color: #ff9800;
                }
                .header p {
                    margin: 2px 0;
                }
                .content {
                    margin: 20px 0;
                    text-align: center;
                }
                .content p {
                    margin: 10px 0;
                    font-size: 16px;
                }
                .info-box {
                    background-color: #ffeaa7;
                    border-left: 4px solid #ff9800;
                    padding: 15px;
                    margin: 15px 0;
                    border-radius: 4px;
                }
                .footer {
                    margin-top: 20px;
                    text-align: center;
                    font-size: 14px;
                    border-top: 2px solid #ff9800;
                    padding-top: 10px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>📢 Notifikasi Baru</h1>
                    <p>Anda memiliki notifikasi baru dari sistem RUKUN</p>
                </div>

                <div class="content">
                    <div class="info-box">
                        <h2 style="color: #ff9800; margin-top: 0;">${title}</h2>
                        <p><strong>Deskripsi:</strong> ${description}</p>
                        <p><strong>Tanggal Acara:</strong> ${date}</p>
                        <p><strong>Dibuat oleh:</strong> ${creator?.username}</p>
                    </div>
                    
                    <p>Silakan login ke sistem RUKUN untuk informasi lebih lanjut.</p>
                </div>

                <div class="footer">
                    <p>Best regards,</p>
                    <p><strong>Team RUKUN</strong></p>
                </div>
            </div>
        </body>
        </html>
    `
    });

    try {
        // Send email to each user
        for (const user of users) {
            const info = await transporter.sendMail(mailOptions(user.email));
            console.log("Email sent to: %s", user.email);
        }
    } catch (error) {
        console.error("Failed to send email:", error);
    }
}
