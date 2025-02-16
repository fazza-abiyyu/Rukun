import nodemailer from 'nodemailer';
import { configOptionsMailer } from '~/server/config/mailer';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const config = useRuntimeConfig();

export async function ApplicationLetterEmailSender(email: string, title: string, description: string, category: string, nik: string, create_by: number) {
    // Create a transporter
    let transporter = nodemailer.createTransport(configOptionsMailer);
    const date = new Date();

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
        where: { id: create_by }
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
            <!DOCTYPE html>
            <html lang="id">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Surat Pengantar KTP</title>
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
                        <h1>PEMERINTAH DESA RUKUN</h1>
                        <p>Jl. Damai No. 10, Kecamatan Harmoni, Kabupaten Sejahtera</p>
                        <p>Email: desa@rukun.id | Telp: (021) 123456</p>
                    </div>
            
                    <h2 style="text-align: center;">SURAT PENGANTAR KTP</h2>
                    <p><strong>Deskripsi:</strong> ${description}</p>
                    <p><strong>Tanggal:</strong> ${date}</p>
                    <p><strong>Kategori:</strong> Surat Pengantar KTP</p>
            
                    <h3>Data Pemohon:</h3>
                    <p><strong>Nama Lengkap:</strong> ${citizen.full_name}</p>
                    <p><strong>Tanggal Lahir:</strong> ${citizen.dob}</p>
                    <p><strong>Jenis Kelamin:</strong> ${citizen.gender}</p>
                    <p><strong>Alamat:</strong> ${citizen.address}</p>
                    <p><strong>NIK:</strong> ${nik}</p>
            
                    <div class="signature">
                        <p>Hormat Kami,</p>
                        <p><strong>Kepala Desa Rukun</strong></p>
                        <br><br>
                        <p><strong>(Nama Kepala Desa)</strong></p>
                    </div>
            
                    <div class="footer">
                        <p>Salam hangat,</p>
                        <p><strong>Tim RUKUN</strong></p>
                    </div>
                </div>
            </body>
            </html>

        `;
    } else if (category === 'SuratKeteranganDomisili') {
        emailContent = `
            <!DOCTYPE html>
            <html lang="id">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Surat Keterangan Domisili</title>
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
                        <h1>PEMERINTAH DESA RUKUN</h1>
                        <p>Jl. Damai No. 10, Kecamatan Harmoni, Kabupaten Sejahtera</p>
                        <p>Email: desa@rukun.id | Telp: (021) 123456</p>
                    </div>
            
                    <h2 style="text-align: center;">SURAT KETERANGAN DOMISILI</h2>
                    <p><strong>Deskripsi:</strong> ${description}</p>
                    <p><strong>Tanggal:</strong> ${date}</p>
                    <p><strong>Kategori:</strong> Surat Keterangan Domisili</p>
            
                    <h3>Data Pemohon:</h3>
                    <p><strong>Nama Lengkap:</strong> ${citizen.full_name}</p>
                    <p><strong>Tanggal Lahir:</strong> ${citizen.dob}</p>
                    <p><strong>Jenis Kelamin:</strong> ${citizen.gender}</p>
                    <p><strong>Alamat:</strong> ${citizen.address}</p>
                    <p><strong>NIK:</strong> ${nik}</p>
            
                    <div class="signature">
                        <p>Hormat Kami,</p>
                        <p><strong>Kepala Desa Rukun</strong></p>
                        <br><br>
                        <p><strong>(Nama Kepala Desa)</strong></p>
                    </div>
            
                    <div class="footer">
                        <p>Salam hangat,</p>
                        <p><strong>Tim RUKUN</strong></p>
                    </div>
                </div>
            </body>
            </html>

        `;
    } else if (category === 'SuratKeteranganUsaha') {
        emailContent = `
            <!DOCTYPE html>
            <html lang="id">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Surat Keterangan Usaha</title>
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
                        <h1>PEMERINTAH DESA RUKUN</h1>
                        <p>Jl. Damai No. 10, Kecamatan Harmoni, Kabupaten Sejahtera</p>
                        <p>Email: desa@rukun.id | Telp: (021) 123456</p>
                    </div>
            
                    <h2 style="text-align: center;">SURAT KETERANGAN USAHA</h2>
                    <p><strong>Deskripsi:</strong> ${description}</p>
                    <p><strong>Tanggal:</strong> ${date}</p>
                    <p><strong>Kategori:</strong> Surat Keterangan Usaha</p>
            
                    <h3>Data Pemohon:</h3>
                    <p><strong>Nama Lengkap:</strong> ${citizen.full_name}</p>
                    <p><strong>Tanggal Lahir:</strong> ${citizen.dob}</p>
                    <p><strong>Jenis Kelamin:</strong> ${citizen.gender}</p>
                    <p><strong>Alamat:</strong> ${citizen.address}</p>
                    <p><strong>NIK:</strong> ${nik}</p>
            
                    <div class="signature">
                        <p>Hormat Kami,</p>
                        <p><strong>Kepala Desa Rukun</strong></p>
                        <br><br>
                        <p><strong>(Nama Kepala Desa)</strong></p>
                    </div>
            
                    <div class="footer">
                        <p>Salam hangat,</p>
                        <p><strong>Tim RUKUN</strong></p>
                    </div>
                </div>
            </body>
            </html>
        `;
    } else if (category === 'SuratPengantarNikah') {
        emailContent = `
                        <!DOCTYPE html>
            <html lang="id">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Surat Keterangan Usaha</title>
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
                        <h1>PEMERINTAH DESA RUKUN</h1>
                        <p>Jl. Damai No. 10, Kecamatan Harmoni, Kabupaten Sejahtera</p>
                        <p>Email: desa@rukun.id | Telp: (021) 123456</p>
                    </div>
            
                    <h2 style="text-align: center;">SURAT PENGANTAR NIKAH</h2>
                    <p><strong>Deskripsi:</strong> ${description}</p>
                    <p><strong>Tanggal:</strong> ${date}</p>
                    <p><strong>Kategori:</strong> Surat Pengantar Nikah</p>
            
                    <h3>Data Pemohon:</h3>
                    <p><strong>Nama Lengkap:</strong> ${citizen.full_name}</p>
                    <p><strong>Tanggal Lahir:</strong> ${citizen.dob}</p>
                    <p><strong>Jenis Kelamin:</strong> ${citizen.gender}</p>
                    <p><strong>Alamat:</strong> ${citizen.address}</p>
                    <p><strong>NIK:</strong> ${nik}</p>
            
                    <div class="signature">
                        <p>Hormat Kami,</p>
                        <p><strong>Kepala Desa Rukun</strong></p>
                        <br><br>
                        <p><strong>(Nama Kepala Desa)</strong></p>
                    </div>
            
                    <div class="footer">
                        <p>Salam hangat,</p>
                        <p><strong>Tim RUKUN</strong></p>
                    </div>
                </div>
            </body>
            </html>
        `;
    } else if (category === 'SuratKeteranganTidakMampu') {
        emailContent = `
                        <!DOCTYPE html>
            <html lang="id">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Surat Keterangan Usaha</title>
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
                        <h1>PEMERINTAH DESA RUKUN</h1>
                        <p>Jl. Damai No. 10, Kecamatan Harmoni, Kabupaten Sejahtera</p>
                        <p>Email: desa@rukun.id | Telp: (021) 123456</p>
                    </div>
            
                    <h2 style="text-align: center;">SURAT KETERANGAN TIDAK MAMPU</h2>
                    <p><strong>Deskripsi:</strong> ${description}</p>
                    <p><strong>Tanggal:</strong> ${date}</p>
                    <p><strong>Kategori:</strong> Surat Keterangan Tidak Mampu</p>
            
                    <h3>Data Pemohon:</h3>
                    <p><strong>Nama Lengkap:</strong> ${citizen.full_name}</p>
                    <p><strong>Tanggal Lahir:</strong> ${citizen.dob}</p>
                    <p><strong>Jenis Kelamin:</strong> ${citizen.gender}</p>
                    <p><strong>Alamat:</strong> ${citizen.address}</p>
                    <p><strong>NIK:</strong> ${nik}</p>
            
                    <div class="signature">
                        <p>Hormat Kami,</p>
                        <p><strong>Kepala Desa Rukun</strong></p>
                        <br><br>
                        <p><strong>(Nama Kepala Desa)</strong></p>
                    </div>
            
                    <div class="footer">
                        <p>Salam hangat,</p>
                        <p><strong>Tim RUKUN</strong></p>
                    </div>
                </div>
            </body>
            </html>
        `;
    }

    // Email message
    const mailOptions = {
        from: `${config.APP_NAME ?? ""} <${config.MAIL_FROM_EMAIL ?? ""}>`,
        to: email,
        subject: "Pengajuan Surat Desa Rukun",
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
