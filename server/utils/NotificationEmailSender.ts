import nodemailer from 'nodemailer';
import {configOptionsMailer} from '~/server/config/mailer';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();
const config = useRuntimeConfig();

export async function NotificationEmailSender(title: string, description: string, date: string, create_by: number) {
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
    const mailOptions = (toEmail: string) => ({
        rom: `${config.APP_NAME ?? ""} <${config.MAIL_FROM_EMAIL ?? ""}>`,
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
                .content p {
                    margin: 10px 0;
                }
                .signature {
                    margin-top: 40px;
                    text-align: right;
                }
                .signature p {
                    margin: 5px 0;
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
                    <h1>${title}</h1>
                    <p>Deskripsi : ${description}</p>
                    <p>Tanggal Acara: ${date}</p>
                    <p>Dibuat oleh: ${creator?.username}</p>
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
