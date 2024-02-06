import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

dotenv.config()

const sendMail = async (to, subject, linkPreview, redirectLink) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com.",
        port: 465,
        secure: true,
        auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.SENDER_PASSWORD
        },
    });

    const info = await transporter.sendMail({
        from: 'MyDukaan', // sender address
        to: "forstudycoding@gmail.com", // list of receivers 
        subject, // Subject line
        text: redirectLink, // html body
        html: `<a href="${redirectLink}"> ${linkPreview} ↗️</a>`
    });
    console.log(info)
};
export default sendMail