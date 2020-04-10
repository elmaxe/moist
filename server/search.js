'use strict'

var express = require('express')
var router = express.Router()
const db = require('./database');
const {validCookie} = require('./auth/validCookie')

router.post('/', validCookie, (req, res) => {
    const {query} = req.body

    const users = db.prepare('SELECT DISTINCT username, email, profilePicture, id FROM Users WHERE username LIKE "%" || ? || "%"')

    var userResult

    users.all([query], (err, rows) => {
        if (err) {
            res.status(500).json({"error":"Internal server error."})
            return
        }
        
        userResult = rows.splice(0, 10)
        res.status(200).json({users: userResult})
    })
})

module.exports = router