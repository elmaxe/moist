'use strict'

var express = require('express')
var router = express.Router()
const db = require('./database');
const {validCookie} = require('./auth/validCookie')

router.post('/', validCookie, (req, res) => {
    const user = req.session.user
    const {suggestion} = req.body

    const report = db.prepare('INSERT INTO Reports (ucaid, uid, date) VALUES (?, ?, ?)')
    report.run([suggestion.ucaid, user.id, Date.now()], (err) => {
        if (err) {
            res.status(500).json({"error":"Internal server error"})
            return
        }

        res.status(201).json({"status":"Activity reported."})
    })
})

module.exports = router