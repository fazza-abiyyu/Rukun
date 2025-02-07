import nodemailer from 'nodemailer';
import { configOptionsMailer } from '~/server/config/mailer';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const config = useRuntimeConfig();

export async function ApplicationLetterEmailSender(category: string, nik: string, create_by: number) {
    // Create a transporter
    let transporter = nodemailer.createTransport(configOptionsMailer);

    // Retrieve citizen information by NIK
    const citizen = await prisma.citizen.findUnique({
        where: { nik },
        select: {
            id: true,
            full_name: true,
            dob: true,
            gender: true,
            address: true
        }
    });

    if (!citizen) {
        throw new Error('NIK tidak ditemukan');
    }

    // Retrieve the email of the user who created the application letter
    const user = await prisma.user.findUnique({
        where: { id: create_by },
        select: { email: true }
    });

    if (!user) {
        throw new Error('Pengguna tidak ditemukan');
    }

    // Generate email content based on the category
    let emailContent = `
        <h1>${category}</h1>
        <p>Full Name: ${citizen.full_name}</p>
        <p>Date of Birth: ${citizen.dob}</p>
        <p>Gender: ${citizen.gender}</p>
        <p>Address: ${citizen.address}</p>
        <p>NIK: ${nik}</p>
        <p>Best regards,</p>
        <p>YourApp Team</p>
    `;

    // Email message
    const mailOptions = {
        from: `${config.APP_NAME ?? ""} <${config.MAIL_FROM_EMAIL ?? ""}>`,
        to: user.email, // Recipient email
        subject: `New ${category} Notification`,
        html: emailContent
    };

    try {
        // Send email
        const info = await transporter.sendMail(mailOptions as any);
        console.log("Email sent: %s", info.messageId);
    } catch (error) {
        console.error("Failed to send email:", error);
    }
}
