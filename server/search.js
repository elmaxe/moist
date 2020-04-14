'use strict'

var express = require('express')
var router = express.Router()
const db = require('./database');
const {validCookie} = require('./auth/validCookie')

router.post('/', validCookie, (req, res) => {
    const {query} = req.body

    if (query === "") {
        res.status(200).json({users: []})
        return
    }

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

router.get('/user/:user', (req, res) => {
    const query = req.params.user

    const user = db.prepare('SELECT username, profilePicture, id, regDate FROM Users WHERE username = ?')

    user.get([query], (err, row) => {
        if (err) {
            res.status(500).json({"error":"Internal server error."})
            return
        }
        if (row === undefined) {
            res.status(404).json({"error":"No user found."})
        } else {
            res.status(200).json({user: row})
        }
    })
})

module.exports = router