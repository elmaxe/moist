var express = require('express')
var router = express.Router()
const db = require('../database')
const bcrypt = require('bcrypt');

const nodemailer = require('nodemailer');
const cryptoRandomString = require('crypto-random-string');

const saltRounds = require('./config')

router.get('/', (req, res) => {
    res.send({"newpassword":"hi from passwordreset"})
})

router.post('/init', (req, res) => {
    const {email, username} = req.body
    const key = cryptoRandomString({length: 10, type: 'numeric'});

    db.get('SELECT * FROM Users WHERE email = ?', [email], (err, row) => {

        if (row === undefined) {
            console.log("Password reset failed, user not registered")
            res.status(200).json({})
            return
        }

        deleteDuplicates(row.id, () => {
            saveKey(row.id, key, (err, msg) => {
                if (err) {
                    console.log("Something went wrong when saving reset password key")
                    res.status(200).json({})
                    return;
                }
                sendEmail(email, username, key, (err, obj) => {
                    if (err) console.log(err)
                    console.log(`Password successfully reset for ${username}`)
                    res.status(200).json({})
                })
            })
        })
    })
})

router.post('/confirm', (req, res) => {
    
})

const deleteDuplicates = (user_id, callback) => {
    db.serialize(() => {
        db.run(`DELETE FROM PasswordReset WHERE user_id = ?`, [user_id])
        return callback()
    })
}

const saveKey = (user_id, key, callback) => {
    var d1 = new Date ();
    var d2 = new Date (d1);
    d2.setMinutes (d1.getMinutes() + 15);
    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) throw new Error(err)
        bcrypt.hash(key, salt, (err, hash) => {
            if (err) throw new Error(err)

            db.run('INSERT INTO PasswordReset(user_id, key, expires) VALUES (?, ?, ?)', [user_id, hash, d2], (err) => {
                return callback(err, null);
            })
            return callback(null, "Saved key")
        })
    })
}

const sendEmail = (email, username, key, callback) => {
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
        subject: `Password reset, ${username}`, // Subject line
        html: `<h2>Hi ${username}!</h2>
        <p>A password reset has been requested for your account. Below is the code for resetting your password.</p>
        <p>Reset code: ${key}</p>
        <p>Sincerely,
        <br><strong>The Moist Team</strong></p>`
    };
    
    transporter.sendMail(mailOptions, function (err, info) {
        //console.log(info)
        
        if(err)
            return callback(err, null)
        else return callback(null, "Email sent.")
    });
}

module.exports = router