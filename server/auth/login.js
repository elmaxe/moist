'use strict'

var express = require('express')
var router = express.Router()
const db = require('../database');
const bcrypt = require('bcrypt');

router.post('/', (req, res) => {
    const {email, password} = req.body
    loginUser(email, password, (err, msg, obj) => {
        if (err) {
            res.status(403)
            if (err === 0) res.json({"error":"Invalid user data (empty?)", "payload":{}})
            if (err === 1) res.json({"error":"Internal server error", "payload":{}})
            if (err === 2) res.json({"error":"Wrong username or password", "payload":{}})
            return;
        }
        res.status(200).json({"payload": {
            //TODO: Send cookie (and user data?)
        }})
    })
})

module.exports = router


const loginUser = (email, password, callback) => {
    if (email.length === 0 || password.length === 0) {
        return callback(0, 'One of the fields were empty, no user logged in.')
    }

    db.get('SELECT * FROM Users WHERE email = ?', [email], (err, row) => {
        if (err) return callback(1, 'Internal server error.')
        
        if (row === undefined) {
            return callback(2, 'User doesn\'t exist.')
        }

        bcrypt.compare(password, row.password, (err, equal) => {
            if (equal) {
                //TODO: Create cookie/token
                return callback(null, `Logged in user ${row.username}.`, {"cookie":"In the future this is a cookie"})
            } else return callback(2, 'Wrong password.')
        })
    })
}