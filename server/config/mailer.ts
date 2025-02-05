import nodemailer, { TransportOptions } from "nodemailer";

const config = useRuntimeConfig()

export const configOptionsMailer: TransportOptions | any = {
    host: config.SMTP_HOST ?? undefined,
    port: config.SMTP_PORT ?? undefined,
    auth: {
        user: config.SMTP_USER ?? undefined,
        pass: config.SMTP_PASSWORD ?? undefined,
    }
};