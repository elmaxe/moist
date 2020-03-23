'use strict'

var express = require('express')
var router = express.Router()
const db = require('../database');
const {validCookie} = require('../auth/validCookie')

router.get('/get-all', validCookie, (req, res) => {
    const {gid} = req.body
    const user = req.session.user

    if (!gid) {
        res.status(403).json({"error":"No garden to add plant to."})
        return
    }
    
    const checkCorrectUser = db.prepare('SELECT * FROM Gardens WHERE uid = ? AND gid = ?')
    const get = db.prepare('SELECT * FROM Plants WHERE gid = ?')

    checkCorrectUser.get([user.id, gid], (err, row) => {
        if (err) {
            res.status(500).json({"error":"Internal server error."})
            return
        }

        if (row === undefined) {
            res.status(404).json({"error":"No garden with that id is specified with the user."})
            return
        }

        get.all([gid], (err, rows) => {
            res.status(200).json({
                plants: rows
            })
        })
    })
})

router.post('/get', validCookie, (err, row) => {
    const {pid, gid} = req.body
    const user = req.session.user

    if (!gid || !pid) {
        res.status(403).json({"error":"Garden id or plant id missing."})
        return
    }
    
    const get = db.prepare('SELECT * FROM Plants WHERE gid = ? AND pid = pid')
    const checkCorrectUser = db.prepare('SELECT * FROM Gardens WHERE uid = ? AND gid = ?')

    checkCorrectUser.get([user.id, gid], (err, row) => {
        if (err) {
            res.status(500).json({"error":"Internal server error."})
            return
        }

        if (row === undefined) {
            res.status(404).json({"error":"No garden with that id is specified with the user."})
            return
        }

        get.get([gid, pid], (err, row) => {
            if (err) {
                res.status(500).json({"error":"Internal server error."})
                return
            }

            res.status(200).json({plant: row})
        })
    })
})

router.post('/create', validCookie, (req, res) => {
    const {gid, name, description, image, birth, death} = req.body
    const user = req.session.user

    if (!gid || !name) {
        res.status(403).json({"error":"Name or garden id missing."})
        return
    }

    const create = db.prepare('INSERT INTO Plants (gid, name, description, image, birth, death) VALUES (?, ?, ?, ? ,?, ?)')
    const checkCorrectUser = db.prepare('SELECT * FROM Gardens WHERE uid = ? AND gid = ?')

    checkCorrectUser.get([user.id, gid], (err, row) => {
        if (err) {
            res.status(500).json({"error":"Internal server error."})
            return
        }

        if (row === undefined) {
            res.status(404).json({"error":"No garden with that id is specified with the user."})
            return
        }

        create.run([gid, name, description, image, birth, death], (err) => {
            if (err) {
                res.status(500).json({"error":"Internal server error."})
                return
            }
    
            res.status(201).json({"status":"Plant created"})
        })
    })
})

router.post('/remove', validCookie, (req, res) => {
    const {pid, gid} = req.body
    const user = req.session.user

    if (!gid || !pid) {
        res.status(403).json({"error":"Garden id or plant id missing."})
        return
    }

    const remove = db.prepare('DELETE FROM Plants WHERE gid = ? AND pid = ?')
    const checkCorrectUser = db.prepare('SELECT * FROM Gardens WHERE uid = ? AND gid = ?')

    checkCorrectUser.get([user.id, gid], (err, row) => {
        if (err) {
            res.status(500).json({"error":"Internal server error."})
            return
        }

        if (row === undefined) {
            res.status(404).json({"error":"No garden with that id is specified with the user."})
            return
        }

        remove.run([gid, pid], function(err) {
            if (err) {
                res.status(500).json({"error":"Internal server error."})
                return
            }

            if (this.changes > 0) {
                res.status(200).json({"status":"Removed plant."})
            } else {
                res.status(404).json({"status":"No plant removed."})
            }
        })
    })
})

router.post('/update', validCookie, (req, res) => {
    const {pid, gid, name, description, birth, death, image} = req.body
    const user = req.session.user

    if (!pid || !gid || !name) {
        res.status(403).json({"error":"Missing data."})
        return
    }

    const checkCorrectUser = db.prepare('SELECT * FROM Gardens WHERE uid = ? AND gid = ?')
    const update = db.prepare('UPDATE Plants SET name = ?, description = ?, birth = ?, death = ?, image = ? WHERE gid = ? AND pid = ?')

    checkCorrectUser.get([user.id, gid], (err, row) => {
        if (err) {
            res.status(500).json({"error":"Internal server error."})
            return
        }

        if (row === undefined) {
            res.status(404).json({"error":"No garden with that id is specified with the user."})
            return
        }

        update.run([name, description, birth, death, image, gid, pid], function(err) {
            if (err) {
                res.status(500).json({"error":"Internal server error."})
                return
            }

            if (this.changes > 0) {
                res.status(200).json({"status":"Updated plant."})
            } else {
                res.status(404).json({"status":"No plant removed."})
            }
        })
    })
})

module.exports = router
