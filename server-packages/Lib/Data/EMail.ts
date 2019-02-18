import * as nodemailer from "nodemailer";
import * as config from "../../mailconfig.json";

export default async function sendMail(to: string, subject: string, html: string) {

    let mailOptions = {
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

    return await transporter.sendMail(mailOptions);
}

