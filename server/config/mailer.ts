import type { TransportOptions } from "nodemailer";

const config = (typeof useRuntimeConfig === 'function')
    ? useRuntimeConfig()
    : {
        SMTP_HOST: process.env.SMTP_HOST,
        SMTP_PORT: process.env.SMTP_PORT,
        SMTP_USER: process.env.SMTP_USER,
        SMTP_PASSWORD: process.env.SMTP_PASSWORD,
        MAIL_FROM_EMAIL: process.env.MAIL_FROM_EMAIL,
        SMTP_FROM: process.env.SMTP_FROM,
        APP_NAME: process.env.APP_NAME
    } as any;

export const configOptionsMailer: TransportOptions | any = {
    host: config.SMTP_HOST ?? undefined,
    port: parseInt(config.SMTP_PORT as string) ?? undefined,
    secure: false,
    auth: {
        user: config.SMTP_USER ?? undefined,
        pass: config.SMTP_PASSWORD ?? undefined,
    },
    tls: {
        rejectUnauthorized: false // Allow self-signed certificates
    }
};

export function getDefaultMailFromHeader() {
    const fromEmail = config.MAIL_FROM_EMAIL ?? config.SMTP_FROM ?? config.SMTP_USER ?? '';
    const appName = config.APP_NAME ?? '';

    if (!fromEmail) {
        return '';
    }

    if (appName) return `${appName} <${fromEmail}>`;
    return fromEmail;
}