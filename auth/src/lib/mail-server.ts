import { createTransport } from "nodemailer";

const send = async (options: {
    email: string;
    subject: string;
    message: string;
}) => {
    const transporter = createTransport({
        // @ts-ignore
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        service: process.env.SMPT_SERVICE,
        secure: true,
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD,
        },
    });
    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };
    await transporter.sendMail(mailOptions);
};

export const mailService = Object.freeze({
    send,
});

export type IMailService = typeof mailService;
