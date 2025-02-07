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
        from: `${config.APP_NAME ?? ""} <${config.MAIL_FROM_EMAIL ?? ""}>`,
        to: toEmail, // Recipient email
        subject: "New Notification", // Email subject
        html: `
            <h1>${title}</h1>
            <p>${description}</p>
            <p>Date: ${date}</p>
            <p>Created by: ${creator?.username}</p>
            <p>Best regards,</p>
            <p>YourApp Team</p>
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
