const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const sendEmail = async (subject, message, send_to, sent_from) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mahadibappi@outlook.com',
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const options = {
        from: sent_from,
        to: send_to,
        subject: subject,
        html: message
    };

    transporter.sendMail(options, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
};

module.exports = sendEmail;
