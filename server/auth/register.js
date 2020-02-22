'use strict'

var express = require('express')
var router = express.Router()
const db = require('../database');
const bcrypt = require('bcrypt');
const cryptoRandomString = require('crypto-random-string');

const saltRounds = require('./config')

const validatePassword = require('./validatePassword')
const sendEmail = require('./sendEmail')

router.get('/', (req, res) => {
    res.send({"register":"hi from register"})
})

router.post('/', (req, res) => {
    const {username, email, password} = req.body
    registerUser(username, email, password, (err, obj) => {
        if (err) {
            res.status(403)
            if (err === 0) res.json({"error":"Invalid user data (empty?)", "payload":{}})
            else if (err === 1) res.json({"error":"Username or email already exists", "payload":{}})
            else if (err === 2) res.json({"error":"Internal server error","payload":{}})
            else if (err === 3) res.json({"error":"Password too short","payload":{}})
            return
        }
        res.status(200).json({"status":"Account created"})
        sendConfirmEmail(email, username)
    })
})

module.exports = router

//Register a new user if email or username does't exist
const registerUser = (username, email, password, callback) => {
    if (username.length === 0 || email.length === 0 || password.length === 0) {
        return callback(0, 'One of the fields was empty, no user created.')
    }

    db.get('SELECT * FROM Users WHERE username = ? OR email = ?', [username, email], (err, row) => {
        if (row === undefined) {

            const st = db.prepare('INSERT INTO Users (username, email, password, registration_date, email_confirmed) VALUES (?, ?, ?, ?, ?)')

            validatePassword(password, (err) => {
                if (err) return callback(3, 'Password error, no user created.')

                bcrypt.genSalt(saltRounds, (err, salt) => {
                    if (err) return callback(2, 'Hashing error, no user created.')
    
                    bcrypt.hash(password, salt, (err2, hash) => {
                        if (err2) return callback(2, 'Hashing error, no user created.')
                        
                        //atm we automatically confirm the user, set to 0 before "production"
                        st.run([username, email, hash, new Date().toISOString(), 1])
                        st.finalize();
                        return callback(null, `User ${username} created and stored in database.`)
                    })
                })
            })
        } else {
            return callback(1, 'Email or password already exists, no user created.')
        }
    })
}

//----------------
//Confirm email

router.post('/confirm', (req, res) => {

})

const sendConfirmEmail = (email, username) => {
    let token = cryptoRandomString({length: 50, type: 'url-safe'})

    db.get('SELECT id FROM Users WHERE email = ?', [email], (err, row) => {
        if (err) {
            console.log(err)
            return
        }
        var d1 = new Date ();
        var expireDate = new Date (d1);
        //48 hours
        expireDate.setTime(d1.getTime() + (1000*60*60*24*2));

        //Hash token before storing in db
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
                console.log("Hashing error")
                return
            }
            bcrypt.hash(token, salt, (err2, hash) => {
                if (err2) {
                    console.log("Hashing error")
                    return
                }
                db.run('INSERT INTO RegistrationConfirm (token, user_id, expires) VALUES (?, ?, ?)', [hash, row.id, expireDate])
            })
        })

        sendEmail(email, confirmationSubject(username), confirmationBody(username, token), (err, msg) => {
            if (err) {
                console.log(err)
                return
            }
            console.log(`Confirmation email sent to: ${email}`)
        })
    })
}

const confirmationSubject = (username) => {
    return `Confirm your account, ${username}`
}

const confirmationBody = (username, token) => {
    // return `<h2>Hi ${username}</h2>
    // <p>Thank you for registering. Confirm your email address by clicking the link below.</p>
    // <p>
    //   <a href="http://localhost:3000/somefuturelink/${token}" rel="noopener noreferrer" target="_blank">Confirm account</a>
    // </p>
    // <p>Sincerely,
    //   <br><strong>The Moist Team</strong></p>`
    return `<h2>Hi ${username}</h2>
    <p>Thank you for registering. Email confirmation is not yet implemented, but in the future there would be a working link below.</p>
    <p>
      <a href="#">${token}</a>
    </p>
    <p>Sincerely,
      <br><strong>The Moist Team</strong></p>`
}