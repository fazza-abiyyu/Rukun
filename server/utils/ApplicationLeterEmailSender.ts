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

    // Format date in Indonesian locale
    const formattedDate = new Intl.DateTimeFormat('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);

    // Generate email content based on the category
    let emailContent = `
        <!DOCTYPE html>
        <html lang="id">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
            <style>
                body {
                    font-family: 'Times New Roman', serif;
                    line-height: 1.6;
                    margin: 0;
                    padding: 0;
                    background-color: #f8f9fa;
                    color: #2c3e50;
                }
                .container {
                    max-width: 800px;
                    margin: 20px auto;
                    padding: 30px;
                    background: #ffffff;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    border-top: 4px solid #2c5aa0;
                }
                .header {
                    text-align: center;
                    border-bottom: 3px double #2c5aa0;
                    padding-bottom: 15px;
                    margin-bottom: 30px;
                }
                .header h1 {
                    margin: 8px 0;
                    color: #2c5aa0;
                    font-size: 20px;
                    font-weight: bold;
                    letter-spacing: 1px;
                }
                .header p {
                    margin: 4px 0;
                    font-size: 14px;
                }
                .content {
                    margin: 20px 0;
                }
                .content p {
                    margin: 12px 0;
                    text-align: justify;
                }
                .signature {
                    margin-top: 50px;
                    text-align: right;
                }
                .signature p {
                    margin: 8px 0;
                }
                .footer {
                    margin-top: 30px;
                    text-align: center;
                    font-size: 13px;
                    border-top: 1px solid #dee2e6;
                    padding-top: 15px;
                    color: #6c757d;
                }
                .data-section {
                    background-color: #f8f9fa;
                    padding: 15px;
                    border-left: 4px solid #2c5aa0;
                    margin: 20px 0;
                }
                .data-section h3 {
                    margin-top: 0;
                    color: #2c5aa0;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>PEMERINTAH DESA RUKUN</h1>
                    <p>Jl. Damai No. 10, Kecamatan Harmoni, Kabupaten Sejahtera</p>
                    <p>Kode Pos: 12345 | Email: desa@rukun.id | Telp: (021) 123-456</p>
                </div>
        
                <div class="content">
                    <h2 style="text-align: center; color: #2c5aa0; margin-bottom: 30px;">${title}</h2>
                    
                    <p>Kepada Yth.<br>
                    <strong>${citizen.full_name}</strong><br>
                    Di tempat</p>
                    
                    <p>Dengan hormat,</p>
                    
                    <p style="text-indent: 30px;">Berdasarkan permohonan yang telah diajukan, dengan ini kami sampaikan bahwa pengajuan surat Anda telah kami terima dan sedang dalam proses penanganan.</p>
                    
                    <div class="data-section">
                        <h3>Detail Permohonan:</h3>
                        <p><strong>Jenis Surat:</strong> ${category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</p>
                        <p><strong>Keterangan:</strong> ${description}</p>
                        <p><strong>Tanggal Pengajuan:</strong> ${formattedDate}</p>
                    </div>
                    
                    <div class="data-section">
                        <h3>Data Pemohon:</h3>
                        <p><strong>Nama Lengkap:</strong> ${citizen.full_name}</p>
                        <p><strong>NIK:</strong> ${nik}</p>
                        <p><strong>Tanggal Lahir:</strong> ${new Intl.DateTimeFormat('id-ID').format(new Date(citizen.dob))}</p>
                        <p><strong>Jenis Kelamin:</strong> ${citizen.gender}</p>
                        <p><strong>Alamat:</strong> ${citizen.address}</p>
                    </div>
                    
                    <p style="text-indent: 30px;">Kami akan memproses permohonan Anda sesuai dengan ketentuan yang berlaku. Untuk informasi lebih lanjut, silakan menghubungi kantor desa pada jam kerja.</p>
                    
                    <p>Demikian surat konfirmasi ini kami sampaikan. Atas perhatian dan kerjasamanya, kami ucapkan terima kasih.</p>
                </div>
        
                <div class="signature">
                    <p>${formattedDate}</p>
                    <p>Hormat Kami,</p>
                    <br><br>
                    <p><strong>Kepala Desa Rukun</strong></p>
                    <br><br>
                    <p><strong>H. Ahmad Setiawan, S.Sos</strong></p>
                </div>
        
                <div class="footer">
                    <p><em>Email ini dikirim secara otomatis oleh sistem. Mohon tidak membalas email ini.</em></p>
                    <p><strong>Sistem Informasi Desa Rukun</strong> | Melayani dengan Sepenuh Hati</p>
                </div>
            </div>
        </body>
        </html>
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
                        font-family: 'Times New Roman', serif;
                        line-height: 1.8;
                        margin: 0;
                        padding: 0;
                        background-color: #f8f9fa;
                        color: #2c3e50;
                    }
                    .container {
                        max-width: 800px;
                        margin: 20px auto;
                        padding: 40px;
                        background: #ffffff;
                        border-radius: 8px;
                        box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
                        border-top: 4px solid #2c5aa0;
                    }
                    .header {
                        text-align: center;
                        border-bottom: 3px double #2c5aa0;
                        padding-bottom: 20px;
                        margin-bottom: 40px;
                    }
                    .header h1 {
                        margin: 10px 0;
                        color: #2c5aa0;
                        font-size: 22px;
                        font-weight: bold;
                        letter-spacing: 2px;
                    }
                    .header p {
                        margin: 5px 0;
                        font-size: 14px;
                        color: #495057;
                    }
                    .title {
                        text-align: center;
                        margin: 30px 0;
                        color: #2c5aa0;
                        font-size: 18px;
                        font-weight: bold;
                        text-decoration: underline;
                    }
                    .content p {
                        margin: 15px 0;
                        text-align: justify;
                        text-indent: 30px;
                    }
                    .data-table {
                        width: 100%;
                        margin: 25px 0;
                        border-collapse: collapse;
                    }
                    .data-table td {
                        padding: 8px 15px;
                        border: 1px solid #dee2e6;
                        vertical-align: top;
                    }
                    .data-table td:first-child {
                        background-color: #f8f9fa;
                        font-weight: bold;
                        width: 30%;
                    }
                    .signature {
                        margin-top: 60px;
                        text-align: right;
                        line-height: 1.6;
                    }
                    .signature p {
                        margin: 10px 0;
                    }
                    .footer {
                        margin-top: 40px;
                        text-align: center;
                        font-size: 12px;
                        border-top: 1px solid #dee2e6;
                        padding-top: 20px;
                        color: #6c757d;
                    }
                    .official-stamp {
                        text-align: center;
                        margin: 20px 0;
                        padding: 10px;
                        border: 2px solid #2c5aa0;
                        background-color: #f8f9fa;
                        border-radius: 5px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>PEMERINTAH DESA RUKUN</h1>
                        <h1>KECAMATAN HARMONI</h1>
                        <h1>KABUPATEN SEJAHTERA</h1>
                        <p>Jl. Damai No. 10, Kecamatan Harmoni, Kabupaten Sejahtera</p>
                        <p>Kode Pos: 12345 | Email: desa@rukun.id | Telp: (021) 123-456</p>
                    </div>
            
                    <div class="title">SURAT PENGANTAR KTP</div>
                    <p style="text-align: center; margin-bottom: 30px;"><strong>Nomor: 470/${Math.floor(Math.random() * 1000)}/DS.RK/${new Date().getFullYear()}</strong></p>
            
                    <div class="content">
                        <p>Yang bertanda tangan di bawah ini, Kepala Desa Rukun, Kecamatan Harmoni, Kabupaten Sejahtera, dengan ini menerangkan bahwa:</p>
                        
                        <table class="data-table">
                            <tr>
                                <td>Nama Lengkap</td>
                                <td>${citizen.full_name}</td>
                            </tr>
                            <tr>
                                <td>NIK</td>
                                <td>${nik}</td>
                            </tr>
                            <tr>
                                <td>Tanggal Lahir</td>
                                <td>${new Intl.DateTimeFormat('id-ID').format(new Date(citizen.dob))}</td>
                            </tr>
                            <tr>
                                <td>Jenis Kelamin</td>
                                <td>${citizen.gender}</td>
                            </tr>
                            <tr>
                                <td>Alamat Lengkap</td>
                                <td>${citizen.address}</td>
                            </tr>
                            <tr>
                                <td>Agama</td>
                                <td>Islam</td>
                            </tr>
                            <tr>
                                <td>Status Perkawinan</td>
                                <td>Belum Kawin</td>
                            </tr>
                            <tr>
                                <td>Pekerjaan</td>
                                <td>Karyawan Swasta</td>
                            </tr>
                        </table>
                        
                        <p>Adalah benar-benar warga Desa Rukun dan berdomisili di alamat tersebut di atas. Yang bersangkutan bermaksud untuk mengurus pembuatan KTP (Kartu Tanda Penduduk).</p>
                        
                        <p>Demikian surat pengantar ini dibuat dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya.</p>
                        
                        <p><strong>Keterangan Tambahan:</strong> ${description}</p>
                    </div>
                    
                    <div class="official-stamp">
                        <p><strong>STEMPEL DESA</strong></p>
                    </div>
            
                    <div class="signature">
                        <p>Rukun, ${formattedDate}</p>
                        <p>Kepala Desa Rukun</p>
                        <br><br><br>
                        <p><strong>H. Ahmad Setiawan, S.Sos</strong></p>
                        <p>NIP. 196801011990031005</p>
                    </div>
            
                    <div class="footer">
                        <p><em>Surat ini telah ditandatangani secara elektronik dan sah menurut hukum</em></p>
                        <p><strong>Sistem Informasi Desa Rukun</strong> | Melayani dengan Profesional</p>
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
                        font-family: 'Times New Roman', serif;
                        line-height: 1.8;
                        margin: 0;
                        padding: 0;
                        background-color: #f8f9fa;
                        color: #2c3e50;
                    }
                    .container {
                        max-width: 800px;
                        margin: 20px auto;
                        padding: 40px;
                        background: #ffffff;
                        border-radius: 8px;
                        box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
                        border-top: 4px solid #2c5aa0;
                    }
                    .header {
                        text-align: center;
                        border-bottom: 3px double #2c5aa0;
                        padding-bottom: 20px;
                        margin-bottom: 40px;
                    }
                    .header h1 {
                        margin: 10px 0;
                        color: #2c5aa0;
                        font-size: 22px;
                        font-weight: bold;
                        letter-spacing: 2px;
                    }
                    .header p {
                        margin: 5px 0;
                        font-size: 14px;
                        color: #495057;
                    }
                    .title {
                        text-align: center;
                        margin: 30px 0;
                        color: #2c5aa0;
                        font-size: 18px;
                        font-weight: bold;
                        text-decoration: underline;
                    }
                    .content p {
                        margin: 15px 0;
                        text-align: justify;
                        text-indent: 30px;
                    }
                    .data-table {
                        width: 100%;
                        margin: 25px 0;
                        border-collapse: collapse;
                    }
                    .data-table td {
                        padding: 8px 15px;
                        border: 1px solid #dee2e6;
                        vertical-align: top;
                    }
                    .data-table td:first-child {
                        background-color: #f8f9fa;
                        font-weight: bold;
                        width: 30%;
                    }
                    .signature {
                        margin-top: 60px;
                        text-align: right;
                        line-height: 1.6;
                    }
                    .signature p {
                        margin: 10px 0;
                    }
                    .footer {
                        margin-top: 40px;
                        text-align: center;
                        font-size: 12px;
                        border-top: 1px solid #dee2e6;
                        padding-top: 20px;
                        color: #6c757d;
                    }
                    .official-stamp {
                        text-align: center;
                        margin: 20px 0;
                        padding: 10px;
                        border: 2px solid #2c5aa0;
                        background-color: #f8f9fa;
                        border-radius: 5px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>PEMERINTAH DESA RUKUN</h1>
                        <h1>KECAMATAN HARMONI</h1>
                        <h1>KABUPATEN SEJAHTERA</h1>
                        <p>Jl. Damai No. 10, Kecamatan Harmoni, Kabupaten Sejahtera</p>
                        <p>Kode Pos: 12345 | Email: desa@rukun.id | Telp: (021) 123-456</p>
                    </div>
            
                    <div class="title">SURAT KETERANGAN DOMISILI</div>
                    <p style="text-align: center; margin-bottom: 30px;"><strong>Nomor: 470/${Math.floor(Math.random() * 1000)}/SKD/${new Date().getFullYear()}</strong></p>
            
                    <div class="content">
                        <p>Yang bertanda tangan di bawah ini, Kepala Desa Rukun, Kecamatan Harmoni, Kabupaten Sejahtera, dengan ini menerangkan dengan sesungguhnya bahwa:</p>
                        
                        <table class="data-table">
                            <tr>
                                <td>Nama Lengkap</td>
                                <td>${citizen.full_name}</td>
                            </tr>
                            <tr>
                                <td>NIK</td>
                                <td>${nik}</td>
                            </tr>
                            <tr>
                                <td>Tanggal Lahir</td>
                                <td>${new Intl.DateTimeFormat('id-ID').format(new Date(citizen.dob))}</td>
                            </tr>
                            <tr>
                                <td>Jenis Kelamin</td>
                                <td>${citizen.gender}</td>
                            </tr>
                            <tr>
                                <td>Alamat Domisili</td>
                                <td>${citizen.address}</td>
                            </tr>
                            <tr>
                                <td>Agama</td>
                                <td>Islam</td>
                            </tr>
                            <tr>
                                <td>Status Perkawinan</td>
                                <td>Belum Kawin</td>
                            </tr>
                            <tr>
                                <td>Pekerjaan</td>
                                <td>Karyawan Swasta</td>
                            </tr>
                        </table>
                        
                        <p>Adalah benar-benar berdomisili di wilayah Desa Rukun, Kecamatan Harmoni, Kabupaten Sejahtera. Yang bersangkutan telah tinggal menetap di alamat tersebut sejak tahun 2020 hingga sekarang dan berkelakuan baik serta tidak pernah terlibat dalam kegiatan yang melanggar hukum.</p>
                        
                        <p>Surat keterangan domisili ini dibuat atas permintaan yang bersangkutan untuk keperluan ${description}.</p>
                        
                        <p>Demikian surat keterangan domisili ini dibuat dengan sebenarnya dan dapat dipergunakan untuk keperluan yang dimaksud.</p>
                    </div>
                    
                    <div class="official-stamp">
                        <p><strong>STEMPEL DESA</strong></p>
                    </div>
            
                    <div class="signature">
                        <p>Rukun, ${formattedDate}</p>
                        <p>Kepala Desa Rukun</p>
                        <br><br><br>
                        <p><strong>H. Ahmad Setiawan, S.Sos</strong></p>
                        <p>NIP. 196801011990031005</p>
                    </div>
            
                    <div class="footer">
                        <p><em>Surat ini telah ditandatangani secara elektronik dan sah menurut hukum</em></p>
                        <p><strong>Sistem Informasi Desa Rukun</strong> | Melayani dengan Profesional</p>
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
                        font-family: 'Times New Roman', serif;
                        line-height: 1.8;
                        margin: 0;
                        padding: 0;
                        background-color: #f8f9fa;
                        color: #2c3e50;
                    }
                    .container {
                        max-width: 800px;
                        margin: 20px auto;
                        padding: 40px;
                        background: #ffffff;
                        border-radius: 8px;
                        box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
                        border-top: 4px solid #2c5aa0;
                    }
                    .header {
                        text-align: center;
                        border-bottom: 3px double #2c5aa0;
                        padding-bottom: 20px;
                        margin-bottom: 40px;
                    }
                    .header h1 {
                        margin: 10px 0;
                        color: #2c5aa0;
                        font-size: 22px;
                        font-weight: bold;
                        letter-spacing: 2px;
                    }
                    .header p {
                        margin: 5px 0;
                        font-size: 14px;
                        color: #495057;
                    }
                    .title {
                        text-align: center;
                        margin: 30px 0;
                        color: #2c5aa0;
                        font-size: 18px;
                        font-weight: bold;
                        text-decoration: underline;
                    }
                    .content p {
                        margin: 15px 0;
                        text-align: justify;
                        text-indent: 30px;
                    }
                    .data-table {
                        width: 100%;
                        margin: 25px 0;
                        border-collapse: collapse;
                    }
                    .data-table td {
                        padding: 8px 15px;
                        border: 1px solid #dee2e6;
                        vertical-align: top;
                    }
                    .data-table td:first-child {
                        background-color: #f8f9fa;
                        font-weight: bold;
                        width: 30%;
                    }
                    .signature {
                        margin-top: 60px;
                        text-align: right;
                        line-height: 1.6;
                    }
                    .signature p {
                        margin: 10px 0;
                    }
                    .footer {
                        margin-top: 40px;
                        text-align: center;
                        font-size: 12px;
                        border-top: 1px solid #dee2e6;
                        padding-top: 20px;
                        color: #6c757d;
                    }
                    .official-stamp {
                        text-align: center;
                        margin: 20px 0;
                        padding: 10px;
                        border: 2px solid #2c5aa0;
                        background-color: #f8f9fa;
                        border-radius: 5px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>PEMERINTAH DESA RUKUN</h1>
                        <h1>KECAMATAN HARMONI</h1>
                        <h1>KABUPATEN SEJAHTERA</h1>
                        <p>Jl. Damai No. 10, Kecamatan Harmoni, Kabupaten Sejahtera</p>
                        <p>Kode Pos: 12345 | Email: desa@rukun.id | Telp: (021) 123-456</p>
                    </div>
            
                    <div class="title">SURAT KETERANGAN USAHA</div>
                    <p style="text-align: center; margin-bottom: 30px;"><strong>Nomor: 470/${Math.floor(Math.random() * 1000)}/SKU/${new Date().getFullYear()}</strong></p>
            
                    <div class="content">
                        <p>Yang bertanda tangan di bawah ini, Kepala Desa Rukun, Kecamatan Harmoni, Kabupaten Sejahtera, dengan ini menerangkan dengan sesungguhnya bahwa:</p>
                        
                        <table class="data-table">
                            <tr>
                                <td>Nama Lengkap</td>
                                <td>${citizen.full_name}</td>
                            </tr>
                            <tr>
                                <td>NIK</td>
                                <td>${nik}</td>
                            </tr>
                            <tr>
                                <td>Tanggal Lahir</td>
                                <td>${new Intl.DateTimeFormat('id-ID').format(new Date(citizen.dob))}</td>
                            </tr>
                            <tr>
                                <td>Jenis Kelamin</td>
                                <td>${citizen.gender}</td>
                            </tr>
                            <tr>
                                <td>Alamat Tempat Tinggal</td>
                                <td>${citizen.address}</td>
                            </tr>
                            <tr>
                                <td>Agama</td>
                                <td>Islam</td>
                            </tr>
                            <tr>
                                <td>Status Perkawinan</td>
                                <td>Kawin</td>
                            </tr>
                            <tr>
                                <td>Pekerjaan</td>
                                <td>Wiraswasta</td>
                            </tr>
                        </table>
                        
                        <p>Adalah benar-benar penduduk Desa Rukun yang menjalankan usaha dengan keterangan sebagai berikut:</p>
                        
                        <table class="data-table">
                            <tr>
                                <td>Jenis Usaha</td>
                                <td>Warung Kelontong</td>
                            </tr>
                            <tr>
                                <td>Alamat Usaha</td>
                                <td>${citizen.address}</td>
                            </tr>
                            <tr>
                                <td>Lama Usaha</td>
                                <td>Sejak Tahun 2020</td>
                            </tr>
                            <tr>
                                <td>Keterangan</td>
                                <td>${description}</td>
                            </tr>
                        </table>
                        
                        <p>Yang bersangkutan adalah orang yang berkelakuan baik, rajin bekerja, dan tidak pernah terlibat masalah hukum. Usaha yang dijalankan tidak mengganggu ketertiban dan keamanan lingkungan.</p>
                        
                        <p>Surat keterangan usaha ini dibuat untuk keperluan administrasi dan dapat dipergunakan sebagaimana mestinya.</p>
                        
                        <p>Demikian surat keterangan usaha ini dibuat dengan sebenarnya.</p>
                    </div>
                    
                    <div class="official-stamp">
                        <p><strong>STEMPEL DESA</strong></p>
                    </div>
            
                    <div class="signature">
                        <p>Rukun, ${formattedDate}</p>
                        <p>Kepala Desa Rukun</p>
                        <br><br><br>
                        <p><strong>H. Ahmad Setiawan, S.Sos</strong></p>
                        <p>NIP. 196801011990031005</p>
                    </div>
            
                    <div class="footer">
                        <p><em>Surat ini telah ditandatangani secara elektronik dan sah menurut hukum</em></p>
                        <p><strong>Sistem Informasi Desa Rukun</strong> | Melayani dengan Profesional</p>
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
                <title>Surat Pengantar Nikah</title>
                <style>
                    body {
                        font-family: 'Times New Roman', serif;
                        line-height: 1.8;
                        margin: 0;
                        padding: 0;
                        background-color: #f8f9fa;
                        color: #2c3e50;
                    }
                    .container {
                        max-width: 800px;
                        margin: 20px auto;
                        padding: 40px;
                        background: #ffffff;
                        border-radius: 8px;
                        box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
                        border-top: 4px solid #2c5aa0;
                    }
                    .header {
                        text-align: center;
                        border-bottom: 3px double #2c5aa0;
                        padding-bottom: 20px;
                        margin-bottom: 40px;
                    }
                    .header h1 {
                        margin: 10px 0;
                        color: #2c5aa0;
                        font-size: 22px;
                        font-weight: bold;
                        letter-spacing: 2px;
                    }
                    .header p {
                        margin: 5px 0;
                        font-size: 14px;
                        color: #495057;
                    }
                    .title {
                        text-align: center;
                        margin: 30px 0;
                        color: #2c5aa0;
                        font-size: 18px;
                        font-weight: bold;
                        text-decoration: underline;
                    }
                    .content p {
                        margin: 15px 0;
                        text-align: justify;
                        text-indent: 30px;
                    }
                    .data-table {
                        width: 100%;
                        margin: 25px 0;
                        border-collapse: collapse;
                    }
                    .data-table td {
                        padding: 8px 15px;
                        border: 1px solid #dee2e6;
                        vertical-align: top;
                    }
                    .data-table td:first-child {
                        background-color: #f8f9fa;
                        font-weight: bold;
                        width: 30%;
                    }
                    .signature {
                        margin-top: 60px;
                        text-align: right;
                        line-height: 1.6;
                    }
                    .signature p {
                        margin: 10px 0;
                    }
                    .footer {
                        margin-top: 40px;
                        text-align: center;
                        font-size: 12px;
                        border-top: 1px solid #dee2e6;
                        padding-top: 20px;
                        color: #6c757d;
                    }
                    .official-stamp {
                        text-align: center;
                        margin: 20px 0;
                        padding: 10px;
                        border: 2px solid #2c5aa0;
                        background-color: #f8f9fa;
                        border-radius: 5px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>PEMERINTAH DESA RUKUN</h1>
                        <h1>KECAMATAN HARMONI</h1>
                        <h1>KABUPATEN SEJAHTERA</h1>
                        <p>Jl. Damai No. 10, Kecamatan Harmoni, Kabupaten Sejahtera</p>
                        <p>Kode Pos: 12345 | Email: desa@rukun.id | Telp: (021) 123-456</p>
                    </div>
            
                    <div class="title">SURAT PENGANTAR NIKAH</div>
                    <p style="text-align: center; margin-bottom: 30px;"><strong>Nomor: 470/${Math.floor(Math.random() * 1000)}/SPN/${new Date().getFullYear()}</strong></p>
            
                    <div class="content">
                        <p>Yang bertanda tangan di bawah ini, Kepala Desa Rukun, Kecamatan Harmoni, Kabupaten Sejahtera, dengan ini menerangkan dengan sesungguhnya bahwa:</p>
                        
                        <table class="data-table">
                            <tr>
                                <td>Nama Lengkap</td>
                                <td>${citizen.full_name}</td>
                            </tr>
                            <tr>
                                <td>NIK</td>
                                <td>${nik}</td>
                            </tr>
                            <tr>
                                <td>Tanggal Lahir</td>
                                <td>${new Intl.DateTimeFormat('id-ID').format(new Date(citizen.dob))}</td>
                            </tr>
                            <tr>
                                <td>Jenis Kelamin</td>
                                <td>${citizen.gender}</td>
                            </tr>
                            <tr>
                                <td>Alamat Lengkap</td>
                                <td>${citizen.address}</td>
                            </tr>
                            <tr>
                                <td>Agama</td>
                                <td>Islam</td>
                            </tr>
                            <tr>
                                <td>Status Perkawinan</td>
                                <td>Belum Kawin</td>
                            </tr>
                            <tr>
                                <td>Pekerjaan</td>
                                <td>Karyawan Swasta</td>
                            </tr>
                            <tr>
                                <td>Nama Ayah</td>
                                <td>Budi Santoso</td>
                            </tr>
                            <tr>
                                <td>Nama Ibu</td>
                                <td>Siti Aminah</td>
                            </tr>
                        </table>
                        
                        <p>Adalah benar-benar penduduk Desa Rukun yang berdomisili di alamat tersebut di atas. Yang bersangkutan bermaksud melangsungkan pernikahan dan telah memenuhi syarat-syarat untuk melangsungkan pernikahan sesuai dengan ketentuan yang berlaku.</p>
                        
                        <p>Yang bersangkutan adalah orang yang berkelakuan baik, tidak pernah terlibat masalah hukum, dan tidak ada halangan syar'i untuk melangsungkan pernikahan.</p>
                        
                        <p>Surat pengantar nikah ini dibuat untuk keperluan ${description} dan dapat dipergunakan sebagaimana mestinya.</p>
                        
                        <p>Demikian surat pengantar nikah ini dibuat dengan sebenarnya.</p>
                    </div>
                    
                    <div class="official-stamp">
                        <p><strong>STEMPEL DESA</strong></p>
                    </div>
            
                    <div class="signature">
                        <p>Rukun, ${formattedDate}</p>
                        <p>Kepala Desa Rukun</p>
                        <br><br><br>
                        <p><strong>H. Ahmad Setiawan, S.Sos</strong></p>
                        <p>NIP. 196801011990031005</p>
                    </div>
            
                    <div class="footer">
                        <p><em>Surat ini telah ditandatangani secara elektronik dan sah menurut hukum</em></p>
                        <p><strong>Sistem Informasi Desa Rukun</strong> | Melayani dengan Profesional</p>
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
                <title>Surat Keterangan Tidak Mampu</title>
                <style>
                    body {
                        font-family: 'Times New Roman', serif;
                        line-height: 1.8;
                        margin: 0;
                        padding: 0;
                        background-color: #f8f9fa;
                        color: #2c3e50;
                    }
                    .container {
                        max-width: 800px;
                        margin: 20px auto;
                        padding: 40px;
                        background: #ffffff;
                        border-radius: 8px;
                        box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
                        border-top: 4px solid #2c5aa0;
                    }
                    .header {
                        text-align: center;
                        border-bottom: 3px double #2c5aa0;
                        padding-bottom: 20px;
                        margin-bottom: 40px;
                    }
                    .header h1 {
                        margin: 10px 0;
                        color: #2c5aa0;
                        font-size: 22px;
                        font-weight: bold;
                        letter-spacing: 2px;
                    }
                    .header p {
                        margin: 5px 0;
                        font-size: 14px;
                        color: #495057;
                    }
                    .title {
                        text-align: center;
                        margin: 30px 0;
                        color: #2c5aa0;
                        font-size: 18px;
                        font-weight: bold;
                        text-decoration: underline;
                    }
                    .content p {
                        margin: 15px 0;
                        text-align: justify;
                        text-indent: 30px;
                    }
                    .data-table {
                        width: 100%;
                        margin: 25px 0;
                        border-collapse: collapse;
                    }
                    .data-table td {
                        padding: 8px 15px;
                        border: 1px solid #dee2e6;
                        vertical-align: top;
                    }
                    .data-table td:first-child {
                        background-color: #f8f9fa;
                        font-weight: bold;
                        width: 30%;
                    }
                    .signature {
                        margin-top: 60px;
                        text-align: right;
                        line-height: 1.6;
                    }
                    .signature p {
                        margin: 10px 0;
                    }
                    .footer {
                        margin-top: 40px;
                        text-align: center;
                        font-size: 12px;
                        border-top: 1px solid #dee2e6;
                        padding-top: 20px;
                        color: #6c757d;
                    }
                    .official-stamp {
                        text-align: center;
                        margin: 20px 0;
                        padding: 10px;
                        border: 2px solid #2c5aa0;
                        background-color: #f8f9fa;
                        border-radius: 5px;
                    }
                    .highlight {
                        background-color: #fff3cd;
                        padding: 15px;
                        border-left: 4px solid #ffc107;
                        margin: 20px 0;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>PEMERINTAH DESA RUKUN</h1>
                        <h1>KECAMATAN HARMONI</h1>
                        <h1>KABUPATEN SEJAHTERA</h1>
                        <p>Jl. Damai No. 10, Kecamatan Harmoni, Kabupaten Sejahtera</p>
                        <p>Kode Pos: 12345 | Email: desa@rukun.id | Telp: (021) 123-456</p>
                    </div>
            
                    <div class="title">SURAT KETERANGAN TIDAK MAMPU</div>
                    <p style="text-align: center; margin-bottom: 30px;"><strong>Nomor: 470/${Math.floor(Math.random() * 1000)}/SKTM/${new Date().getFullYear()}</strong></p>
            
                    <div class="content">
                        <p>Yang bertanda tangan di bawah ini, Kepala Desa Rukun, Kecamatan Harmoni, Kabupaten Sejahtera, dengan ini menerangkan dengan sesungguhnya bahwa:</p>
                        
                        <table class="data-table">
                            <tr>
                                <td>Nama Lengkap</td>
                                <td>${citizen.full_name}</td>
                            </tr>
                            <tr>
                                <td>NIK</td>
                                <td>${nik}</td>
                            </tr>
                            <tr>
                                <td>Tanggal Lahir</td>
                                <td>${new Intl.DateTimeFormat('id-ID').format(new Date(citizen.dob))}</td>
                            </tr>
                            <tr>
                                <td>Jenis Kelamin</td>
                                <td>${citizen.gender}</td>
                            </tr>
                            <tr>
                                <td>Alamat Lengkap</td>
                                <td>${citizen.address}</td>
                            </tr>
                            <tr>
                                <td>Agama</td>
                                <td>Islam</td>
                            </tr>
                            <tr>
                                <td>Status Perkawinan</td>
                                <td>Kawin</td>
                            </tr>
                            <tr>
                                <td>Pekerjaan</td>
                                <td>Buruh Harian Lepas</td>
                            </tr>
                        </table>
                        
                        <div class="highlight">
                            <p style="text-indent: 0; margin: 0;"><strong>KETERANGAN EKONOMI:</strong></p>
                            <p style="text-indent: 0;">Berdasarkan pengamatan dan keterangan dari masyarakat setempat, yang bersangkutan adalah keluarga yang kurang mampu dengan kondisi ekonomi sebagai berikut:</p>
                            <ul style="margin: 10px 0; padding-left: 20px;">
                                <li>Penghasilan tidak tetap dan terbatas</li>
                                <li>Tidak memiliki tabungan atau aset berharga</li>
                                <li>Kesulitan memenuhi kebutuhan sehari-hari</li>
                                <li>Tempat tinggal sederhana</li>
                            </ul>
                        </div>
                        
                        <p>Yang bersangkutan adalah orang yang berkelakuan baik, rajin bekerja, namun penghasilannya tidak mencukupi untuk memenuhi kebutuhan hidup sehari-hari keluarga.</p>
                        
                        <p>Surat keterangan tidak mampu ini dibuat untuk keperluan ${description} dan dapat dipergunakan sebagaimana mestinya.</p>
                        
                        <p>Demikian surat keterangan tidak mampu ini dibuat dengan sebenar-benarnya dan penuh tanggung jawab.</p>
                    </div>
                    
                    <div class="official-stamp">
                        <p><strong>STEMPEL DESA</strong></p>
                    </div>
            
                    <div class="signature">
                        <p>Rukun, ${formattedDate}</p>
                        <p>Kepala Desa Rukun</p>
                        <br><br><br>
                        <p><strong>H. Ahmad Setiawan, S.Sos</strong></p>
                        <p>NIP. 196801011990031005</p>
                    </div>
            
                    <div class="footer">
                        <p><em>Surat ini telah ditandatangani secara elektronik dan sah menurut hukum</em></p>
                        <p><strong>Sistem Informasi Desa Rukun</strong> | Melayani dengan Profesional</p>
                    </div>
                </div>
            </body>
            </html>
        `;
    }

    // Email message
    const mailOptions = {
        from: `Pemerintah Desa Rukun <${config.MAIL_FROM_EMAIL ?? ""}>`,
        to: email,
        subject: `Konfirmasi Pengajuan Surat - ${category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}`,
        html: emailContent,
        attachments: [
            {
                filename: 'logo-desa.png',
                path: './public/logo-desa.png', // Path ke logo desa jika ada
                cid: 'logo-desa' // untuk reference di HTML
            }
        ]
    };

    try {
        // Send email
        const info = await transporter.sendMail(mailOptions as any);
        console.log(`✅ Email berhasil dikirim ke ${email}`);
        console.log(`📧 Message ID: ${info.messageId}`);
        console.log(`📄 Jenis Surat: ${category}`);
        console.log(`👤 Pemohon: ${citizen.full_name} (${nik})`);
        
        return {
            success: true,
            messageId: info.messageId,
            message: "Email berhasil dikirim"
        };
    } catch (error) {
        console.error(`❌ Gagal mengirim email ke ${email}:`, error);
        
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            message: "Gagal mengirim email"
        };
    }
}
