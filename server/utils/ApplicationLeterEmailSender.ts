import nodemailer from 'nodemailer';
import { configOptionsMailer } from '~/server/config/mailer';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const config = useRuntimeConfig();

export async function ApplicationLetterEmailSender(title: string, description: string, date: string, category: string, nik: string, create_by: number) {
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
        <h1>${title}</h1>
        <p>${description}</p>
        <p>Date: ${date}</p>
        <p>Created by: ${citizen.full_name}</p>
        <p>NIK: ${nik}</p>
        <p>Best regards,</p>
        <p>YourApp Team</p>
    `;

    if (category === 'SuratPengantarKTP') {
        emailContent = `
            <h1>${title}</h1>
            <p>${description}</p>
            <p>Date: ${date}</p>
            <p>Category: Surat Pengantar KTP</p>
            <p>Full Name: ${citizen.full_name}</p>
            <p>Date of Birth: ${citizen.dob}</p>
            <p>Gender: ${citizen.gender}</p>
            <p>Address: ${citizen.address}</p>
            <p>NIK: ${nik}</p>
            <p>Best regards,</p>
            <p>YourApp Team</p>
        `;
    } else if (category === 'SuratKeteranganDomisili') {
        emailContent = `
            <h1>${title}</h1>
            <p>${description}</p>
            <p>Date: ${date}</p>
            <p>Category: Surat Keterangan Domisili</p>
            <p>Full Name: ${citizen.full_name}</p>
            <p>Date of Birth: ${citizen.dob}</p>
            <p>Gender: ${citizen.gender}</p>
            <p>Address: ${citizen.address}</p>
            <p>NIK: ${nik}</p>
            <p>Best regards,</p>
            <p>YourApp Team</p>
        `;
    } else if (category === 'SuratKeteranganUsaha') {
        emailContent = `
            <h1>${title}</h1>
            <p>${description}</p>
            <p>Date: ${date}</p>
            <p>Category: Surat Keterangan Usaha</p>
            <p>Full Name: ${citizen.full_name}</p>
            <p>Date of Birth: ${citizen.dob}</p>
            <p>Gender: ${citizen.gender}</p>
            <p>Address: ${citizen.address}</p>
            <p>NIK: ${nik}</p>
            <p>Best regards,</p>
            <p>YourApp Team</p>
        `;
    } else if (category === 'SuratPengantarNikah') {
        emailContent = `
            <h1>${title}</h1>
            <p>${description}</p>
            <p>Date: ${date}</p>
            <p>Category: Surat Pengantar Nikah</p>
            <p>Full Name: ${citizen.full_name}</p>
            <p>Date of Birth: ${citizen.dob}</p>
            <p>Gender: ${citizen.gender}</p>
            <p>Address: ${citizen.address}</p>
            <p>NIK: ${nik}</p>
            <p>Best regards,</p>
            <p>YourApp Team</p>
        `;
    } else if (category === 'SuratKeteranganTidakMampu') {
        emailContent = `
            <h1>${title}</h1>
            <p>${description}</p>
            <p>Date: ${date}</p>
            <p>Category: Surat Keterangan Tidak Mampu</p>
            <p>Full Name: ${citizen.full_name}</p>
            <p>Date of Birth: ${citizen.dob}</p>
            <p>Gender: ${citizen.gender}</p>
            <p>Address: ${citizen.address}</p>
            <p>NIK: ${nik}</p>
            <p>Best regards,</p>
            <p>YourApp Team</p>
        `;
    }

    // Email message
    const mailOptions = {
        from: `${config.APP_NAME ?? ""} <${config.MAIL_FROM_EMAIL ?? ""}>`,
        to: user.email, // Recipient email
        subject: "New Application Letter Notification",
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
