'use strict'

var express = require('express')
var router = express.Router()
const db = require('../database');
const {validCookie} = require('../auth/validCookie')

router.post('/update', validCookie, (req, res) => {
    const {path} = req.body
    const user = req.session.user

    if (!req.body.path) {
        res.status(403).json({"error":"Something went wrong: Missing file path."})
        return
    }

    const update = db.prepare('UPDATE Users SET profilePicture = ? WHERE id = ?')
    update.run([path, user.id], function (err) {
        if (err) {
            res.status(500).json({"error":"Internal server error."})
            return
        }

        if (this.changes > 0) {
            res.status(200).json({"status":"Profile picture updated."})
        } else {
            res.status(200).json({"status":"Somethign went wrong, no profile picture updated."})
        }
    })
})

module.exports = router