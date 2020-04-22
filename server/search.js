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

    const users = db.prepare('SELECT DISTINCT username, email, profilePicture, id, description FROM Users WHERE username LIKE "%" || ? || "%"')

    var userResult

    users.all([query], (err, rows) => {
        if (err) {
            res.status(500).json({"error":"Internal server error."})
            return
        }

        const bukketlists = db.prepare('SELECT Bukketlists.bid, Bukketlists.name, Bukketlists.description, Bukketlists.creationDate, Bukketlists.private, Users.id, Users.username FROM Bukketlists \
        INNER JOIN Users ON Users.id = Bukketlists.uid \
        WHERE (Users.username = ? AND Users.username LIKE "%" || ? || "%" AND Bukketlists.private = true) \
        OR (Users.username LIKE "%" || ? || "%" AND Bukketlists.private = false)')
    
        userResult = rows.splice(0, 10)
        console.log(req.session.user.username)
        bukketlists.all([req.session.user.username, query, query], (err, rows) => {
            // res.json({bukketlists: rows})
            res.status(200).json({users: userResult, bukketlists: rows.splice(0,15)})
        })
        
    })
})

router.get('/user/:user', (req, res) => {
    const query = req.params.user

    const user = db.prepare('SELECT username, profilePicture, id, regDate, description FROM Users WHERE username = ?')

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

router.get('/bukketlists', (req, res) => {    
    const bukketlists = db.prepare('SELECT Bukketlists.bid, Bukketlists.name, Bukketlists.description, Bukketlists.creationDate, Bukketlists.private, Users.id, Users.username FROM Bukketlists \
                                    INNER JOIN Users ON Users.id = Bukketlists.uid \
                                    WHERE NOT Bukketlists.private = true')

    bukketlists.all((err, rows) => {
        if (err) {
            res.status(500).json({"error":"Internal server error."})
            return
        }
        res.json({bukketlists: rows})
    })
})

router.get('/bukketlist/:username', validCookie, (req, res) => {
    const bukketlists = db.prepare('SELECT Bukketlists.bid, Bukketlists.name, Bukketlists.description, Bukketlists.creationDate, Bukketlists.private, Users.id, Users.username FROM Bukketlists \
    INNER JOIN Users ON Users.id = Bukketlists.uid \
    WHERE (Users.username = ? AND Users.username = ? AND Bukketlists.private = true) \
    OR (Users.username = ? AND Bukketlists.private = false)')

    bukketlists.all([req.session.user.username, req.params.username, req.params.username], (err, rows) => {
        res.json({bukketlists: rows})
    })
})

module.exports = router