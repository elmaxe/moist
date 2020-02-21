'use strict'

var express = require('express')
var router = express.Router()
const db = require('../database');
const bcrypt = require('bcrypt');

const saltRounds = require('./config')

router.get('/', (req, res) => {
    res.send({"register":"hi from register"})
})

router.post('/', (req, res) => {
    const {username, email, password} = req.body
    registerUser(username, email, password, (err, obj) => {
        if (err) {
            res.status(403)
            if (err === 0) res.json({"status":"ERROR","error":"Invalid user data (empty?)", "payload":{}})
            else if (err === 1) res.json({"status":"ERROR","error":"Username or email already exists", "payload":{}})
            else if (err === 2) res.json({"status":"ERROR","error":"Internal server error","payload":{}})
            return
        }
        res.status(200).json({
            "status": "OK",
            "error": null,
            "payload": {}
        })
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

            const st = db.prepare('INSERT INTO Users (username, email, password, registration_date) VALUES (?, ?, ?, ?)')

            bcrypt.genSalt(saltRounds, (err, salt) => {
                if (err) return callback(2, 'Hashing error, no user created.')

                bcrypt.hash(password, salt, (err2, hash) => {
                    if (err2) return callback(2, 'Hashing error, no user created.')

                    st.run([username, email, hash, new Date().toISOString()])
                    st.finalize();
                    return callback(null, `User ${username} created and stored in database.`)
                })
            })

        } else {
            return callback(1, 'Email or password already exists, no user created.')
        }
    })
}
