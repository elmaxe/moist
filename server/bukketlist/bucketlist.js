'use strict'

var express = require('express')
var router = express.Router()
const db = require('../database');
const uuid4 = require('uuid4');
const {validCookie} = require('../auth/validCookie')

router.post('/create', validCookie, (req, res) => {
    const {name, description} = req.body
    const isPrivate = req.body.private
    const user = req.session.user

    if (!name) {
        res.status(403).json({"error":"No name provided."})
    }

    const create = db.prepare('INSERT INTO Bukketlists (uid, private, name, description, creationDate) VALUES (?, ?, ?, ?, ?)')

    create.run([user.id, isPrivate, name, description, Date.now()], (err) => {
        if (err) {
            res.status(500).json({"error":"Internal server error."})
        } else {
            res.status(201).json({"status":"Created bukketlist."})
        }
    })
})

router.post('/remove', validCookie, (req, res) => {
    const {bid} = req.body
    const user = req.session.user

    const remove = db.prepare('DELETE FROM Bukketlists WHERE bid = ? AND uid = ?')
    remove.run([bid, user.id], function (err) {
        if (err) {
            res.status(500).json({"error":"Internal server error."})
            return
        }

        if (this.changes > 0) {
            res.status(200).json({"status":"Removed bukketlist."})
        } else {
            res.status(403).json({"status":"No bukketlist removed."})
        }
    })
})

router.get('/get/:bid', validCookie, (req, res) => {
    const {bid} = req.params
    const user = req.session.user

    const blists = db.prepare('SELECT * FROM Bukketlists WHERE bid = ? AND uid = ?')

    blists.get([bid, user.id], (err, row) => {
        if (err) {
            res.status(500).json({"error":"Internal server error."})
            return
        }

        if (row === undefined) {
            res.status(404).json({"error":"No bukketlist found. Is it yours?"})
        } else {
            res.status(200).json({bukketlist: row})
        }
    })
})

router.get('/mine', validCookie, (req, res) => {
    const user = req.session.user

    const blist = db.prepare('SELECT * FROM Bukketlists WHERE uid = ?')
    const activities = db.prepare('SELECT * FROM Activities WHERE bid = ?')
    var bukketlists = []

    db.serialize(() => {
        blist.all([user.id], (err, rows) => {
            if (err) {
                res.status(500).json({"error":"Internal server error."})
                return
            }
    
            bukketlists = rows

            for (let i = 0; i < bukketlists.length; i++) {

                const bukket = bukketlists[i]

                activities.all([bukket.bid], (err, ac) => {
                    if (err) {
                        res.status(500).json({"error":"Internal server error."})
                        return
                    }

                    bukketlists[i] = {
                        bukketlist: bukket,
                        activities: ac
                    }
                    if (i === bukketlists.length - 1) {
                        res.status(200).json({bukketlists})
                        return
                    }
                })
            }

            if (bukketlists.length === 0) {
                res.status(200).json({bukketlists})
                return
            }
            
        })

    })
})

module.exports = router