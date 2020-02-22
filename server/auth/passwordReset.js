var express = require('express')
var router = express.Router()
const db = require('../database')
const bcrypt = require('bcrypt');

const nodemailer = require('nodemailer');
const cryptoRandomString = require('crypto-random-string');

const saltRounds = require('./config')

const validatePassword = require('./validatePassword')

// router.get('/', (req, res) => {
//     res.send({"newpassword":"hi from passwordreset"})
// })

router.post('/request', (req, res) => {
    const {email} = req.body
    const key = cryptoRandomString({length: 15, type: 'numeric'})

    db.get('SELECT * FROM Users WHERE email = ?', [email], (err, row) => {

        if (row === undefined) {
            console.log("Password reset failed, user not registered")
            res.status(200).json({})
            return
        }

        deleteKeys(row.id, () => {

            saveKey(row.id, key, (err, msg) => {

                if (err) {
                    console.log("Something went wrong when saving reset password key")
                    res.status(200).json({})
                    return;
                }

                sendEmail(email, row.username, key, (err, obj) => {
                    if (err) {
                        console.log(err)
                        return res.status(200).json({})
                    }
                    console.log(`Password request successfull for ${row.username}`)
                    res.status(200).json({})
                })
            })
        })
    })
})

router.post('/update', (req, res) => {
    const {password, email, key} = req.body
    validatePassword(password, (err) => {
        if (err) return res.status(403).json({"error":"Password too short"})

        
        db.get('SELECT * FROM Users WHERE email = ?', [email], (err, row) => {
            if (err) return res.status(500).json({"error":"Internal server error"})

            db.get('SELECT * FROM PasswordReset WHERE user_id = ?', [row.id], (err, row2) => {
                if (err) return res.status(500).json({"error":"Internal server error"})

                bcrypt.compare(key, row2.key, (err, equal) => {
                    if (equal) {
                        updateUser(row.id, password, (err) => {
                            if (err) return res.status(500).json({"error":"Internal server error"})

                            deleteKeys(row.id, () => {
                                console.log(`Password reset successfull for ${row.username}`)
                                return res.status(200).json({"status":"Password reset"})
                            })
                        })
                    } else {
                        return res.status(404).json({"error":"Not a valid key"})
                    }
                })
            })
        })
    })
    
})

const updateUser = (user_id, password, callback) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) callback("Hashing error")

        bcrypt.hash(password, salt, (err, hash) => {
            db.run('UPDATE Users SET password = ? WHERE id = ?', [hash, user_id])
            return callback(null)
        })
    })
}

const deleteKeys = (user_id, callback) => {
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
                if (err) return callback(err, null);
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
        <p>If you didn't request a password reset, ignore this email.</p>
        <p>Sincerely,
        <br><strong>The Moist Team</strong></p>`
    };
    
    transporter.sendMail(mailOptions, function (err, info) {
        // console.log(info)
        // console.log(err)
        if(err)
            return callback(err, null)
        else return callback(null, "Email sent.")
    });
}

module.exports = router