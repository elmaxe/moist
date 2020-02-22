const nodemailer = require('nodemailer');

const sendEmail = (email, subject, messageHTML, callback) => {

    var transporter = nodemailer.createTransport({
        service: process.env.MAIL_SERVICE,
        auth: {
            user: process.env.MAIL_ADR,
            pass: process.env.MAIL_PSWD
        }
    });

    const mailOptions = {
        from: process.env.MAIL_ADR, // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        html: messageHTML //Message in HTML
    };

    transporter.sendMail(mailOptions, function (err, info) {
        // console.log(info)
        // console.log(err)
        if(err)
            return callback(err, null)
        else return callback(null, "Email sent.")
    });
}

module.exports = sendEmail