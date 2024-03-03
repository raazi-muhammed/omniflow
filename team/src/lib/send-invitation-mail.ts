import { sendMail } from "@omniflow/common";

async function sendInvitationEmail({
    email,
    invitationLink,
}: {
    email: string;
    invitationLink: string;
}) {
    sendMail({
        email: email,
        subject: "Invitation Mail",
        message: `
Invitation Email
link : ${invitationLink}
`,
        html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Omniflow Account Verification</title>
    <style>
      html {
      background: #0A102A;
      color: white;
      margin: 0;
      padding: 0;
      height: 100%;
      }
        body {
            font-family: Arial, sans-serif;
      height: 100%;       
            background-color: #0A102A;
      color: white;
        background-repeat: repeat;
      background : url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232343D8' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")


        }

        .container {
            max-width: 600px;
            margin: 0 auto;
        }

        .verification-code {
            background-color: #09122D;
      		border: 1px solid #23346C;
            padding: 10px;
            font-weight: bold;
            font-size: 18px;
      		border-radius: 0.5rem;
      		color: white;
		    text-align: center;
        }

        .contact-info {
            margin-top: 20px;
        }
      .header{
                  font-weight: bold;
      font-size: 20px;
      text-align: center;
      color: #2A59F5;
      padding: 1px;
      }
    </style>
</head>
<body>
        <div class="header">
              <div class="container">
        <p>Omniflow</p>
          </div>

      </div>
    <div class="container">


        <p>Invitation Link</p>
<br/>
            <a href="${invitationLink}">View invitation</a>


        <p>Thank you for choosing Omniflow!</p>

        <div class="contact-info">
            <p>- Omniflow</p>
        </div>
      <br/>
      <br/>
      <br/>
    </div>
</body>
</html>
`,
    });
}

export const mailService = Object.freeze({
    sendInvitationEmail,
});

export type IMailService = typeof mailService;
