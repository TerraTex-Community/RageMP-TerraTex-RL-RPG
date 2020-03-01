import * as nodemailer from "nodemailer";
// @ts-ignore
import * as config from "../../mailconfig.json";

export async function sendMail(to: string, subject: string, html: string): Promise<void> {

    const mailOptions = {
        from: `"${config.sendName}" <${config.sendMail}>`,
        to,
        subject,
        html
    };

    const transporter = nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: false,
        auth: {
            user: config.user,
            pass: config.password
        },
        tls: { rejectUnauthorized: false }
    });

    return transporter.sendMail(mailOptions);
}

