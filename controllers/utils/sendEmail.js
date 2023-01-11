const nodemailer = require('nodemailer');

const sendMail = async (subject, message, send_to, sent_from, reply_to) => {
    const transporter = nodemailer.createTransport({

        host: "gmail",
        port: 587,
        auth: {
            user: "kmbappi33@gmail.com",
            pass: "jktbappi32"
        },
        tls: {
            rejectUnauthorized: false,
        }
    })

    //option for send email
    const options = {
        from: sent_from,
        to: send_to,
        subject: subject,
        html: message
    };
    // send email 
    transporter.sendMail(options, function (err, info) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(info)
        }
    })
};

module.exports = sendMail;