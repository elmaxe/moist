'use strict'

var express = require('express')
var router = express.Router()
const db = require('../database');
const {validCookie} = require('../auth/validCookie')


router.get('/get', validCookie, (req, res) => {
    const user = req.session.user
    const get = db.prepare('SELECT * FROM Activities WHERE uid = ?')

    get.all([user.id], (err, rows) => {
        if (err) {
            res.status(500).json({"error":"Internal server error"})
            return
        }

        res.status(200).json({rows})
    })
})

router.post('/get', validCookie, (req, res) => {
    const user = req.session.user
    const {aid} = req.body
    const get = db.prepare('SELECT * FROM Activities WHERE uid = ? AND aid = ?')

    get.get([user.id, aid], (err, row) => {
        if (err) {
            res.status(500).json({"error":"Internal server error"})
            return
        }

        res.status(200).json({row})
    })
})

router.post('/add', validCookie, (req, res) => {
    const user = req.session.user
    const {activity, accessibility, type, participants, price, link, key} = req.body

    const add = db.prepare('INSERT INTO Activities (uid, activity, accessibility, type, participants, price, link, key) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')

    add.run([user.id, activity, accessibility, type, participants, price, link, key], (err) => {
        if (err) {
            console.log(err)
            res.status(500).json({"error":"Internal server error"})
            return
        }
        res.status(201).json({"status":"Added activity"})
    })
})

router.post('/remove', validCookie, (req, res) => {
    const user = req.session.user
    const {data, aid} = req.body

    const remove = db.prepare('DELETE FROM Activities WHERE uid = ? AND aid = ?')
    remove.run([user.id, aid], function(err) {
        if (err) {
            res.status(500).json({"error":"Internal server error"})
            return
        }

        if (this.changes > 0) {
            res.status(200).json({"status":"Removed activity."})
        } else {
            res.status(403).json({"status":"No activity removed"})
        }
    })
})

router.post('/update', validCookie, (req, res) => {
    const user = req.session.user
    const {data, aid} = req.body

    const update = db.prepare('UPDATE Activities SET data = ? WHERE uid = ? AND aid = ?')

    update.run([data, user.id, aid], function(err) {
        if (err) {
            res.status(500).json({"error":"Internal server error"})
            return
        }

        if (this.changes > 0) {
            res.status(200).json({"status":"Updated activity."})
        } else {
            res.status(403).json({"status":"No activity updated"})
        }
    })
})

module.exports = router