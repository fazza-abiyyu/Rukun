import nodemailer, { TransportOptions } from "nodemailer";

const config = useRuntimeConfig()

export const configOptionsMailer: TransportOptions | any = {
    host: config.SMTP_HOST ?? undefined,
    port: parseInt(config.SMTP_PORT as string) ?? undefined,
    secure: false, // true for port 465, false for other ports like 587
    auth: {
        user: config.SMTP_USER ?? undefined,
        pass: config.SMTP_PASSWORD ?? undefined,
    },
    tls: {
        rejectUnauthorized: false // Allow self-signed certificates
    }
};