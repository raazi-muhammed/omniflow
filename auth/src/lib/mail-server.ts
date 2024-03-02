import { createTransport } from "nodemailer";

const send = async (options: {
    email: string;
    subject: string;
    message: string;
    html: string;
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
        html: options.html,
    };
    await transporter.sendMail(mailOptions);
};

async function sendVerificationCodeMail({
    name,
    email,
    code,
}: {
    name: string;
    email: string;
    code: number;
}) {
    send({
        email: email,
        subject:
            "Omniflow Account Verification - Your Verification Code Inside",
        message: `Dear ${name},

Welcome to Omniflow, your all-in-one SaaS solution! We're thrilled to have you on board. To ensure the security of your Omniflow account, we need to verify your email address.

Please use the following verification code to complete the process: ${code}

${code}

If you haven't initiated this verification or encounter any issues, please reach out to our support team at Support Email. We're here to help.

Thank you for choosing Omniflow!

Best regards,
Omniflow
`,
        html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Omniflow Account Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
        }

        .verification-code {
            background-color: #f0f0f0;
            padding: 10px;
            font-weight: bold;
            font-size: 18px;
        }

        .contact-info {
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <p>Dear ${name},</p>
        <p>Welcome to Omniflow, your all-in-one SaaS solution! We're thrilled to have you on board. To ensure the security of your Omniflow account, we need to verify your email address.</p>

        <div class="verification-code">
            <p>Please use the following verification code to complete the process:</p>
            <p>${code}</p>
        </div>

        <p>If you haven't initiated this verification or encounter any issues, please reach out to our support team at <a href="mailto:support@example.com">Support Email</a>. We're here to help.</p>

        <p>Thank you for choosing Omniflow!</p>

        <div class="contact-info">
            <p>Best regards,</p>
            <p>Omniflow</p>
        </div>
    </div>
</body>
</html>

`,
    });
}

export const mailService = Object.freeze({
    sendVerificationCodeMail,
});

export type IMailService = typeof mailService;
