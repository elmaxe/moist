'use strict'

var express = require('express')
var router = express.Router()
const db = require('../database');
const {validCookie} = require('../auth/validCookie')

const plants = require('./plant')
router.use('/plants', plants)

router.get('/get-all', validCookie, (req, res) => {
    const user = req.session.user

    const gardens = db.prepare('SELECT * FROM Gardens WHERE uid = ?')

    gardens.all([user.id], (err, rows) => {
        if (err) {
            res.status(500).json({"error":"Internal server error"})
            return
        }

        res.status(200).json({"gardens":rows})
    })
});

router.post('/get', validCookie, (req, res) => {
    const {gid} = req.body
    const user = req.session.user

    if (!gid) {
        res.status(403).json({"error":"No gid provided."})
        return
    }

    const garden = db.prepare('SELECT * FROM Gardens WHERE uid = ? AND gid = ?')

    garden.get([user.id, gid], (err, row) => {
        if (err) {
            res.status(500).json({"error":"Internal server error."})
            return
        }

        if (row === undefined) {
            res.status(404).json({"error":"No garden with that id is specified with the user."})
            return
        }

        res.status(200).json({"garden":row})
    })
})

router.post('/create', validCookie, (req, res) => {
    const {name, description, image, location} = req.body
    const user = req.session.user
    console.log(req.body)

    if (!name) {
        res.status(403).json({"error":"Garden must have a name."})
        return
    }

    const insert = db.prepare('INSERT INTO Gardens (uid, name, description, image, location, creationDate) VALUES(?, ?, ?, ?, ?, ?)')

    db.serialize(() => {
        insert.run([
            user.id,
            name,
            description === undefined ? null : description,
            image === undefined ? null : image,
            location === undefined ? null : location,
            Date.now()
        ], (err) => {
            if (err) {
                res.status(500).json({"error":"Internal server error"})
                return
            }
        })
        insert.finalize()
    })
    res.status(201).json({"status":"Garden created."})
})

router.post('/remove', validCookie, (req, res) => {
    const user = req.session.user
    const {gid} = req.body
    
    if (!gid) {
        res.status(403).json({"error":"No gid provided, no garden removed."})
        return
    }

    const remove = db.prepare('DELETE FROM Gardens WHERE gid = ? AND uid = ?')

    remove.run([gid, user.id], function(err) {
        if (err) {
            res.status(500).json({"error":"Internal server error."})
            return
        }

        if (this.changes > 0) {
            res.status(200).json({"status":"Garden removed."})
        } else {
            res.status(404).json({"status":"No garden removed."})
        }
    })

})

router.post('/update', validCookie, (req, res) => {
    const {gid, name, description, image, location} = req.body
    const user = req.session.user

    if (!gid) {
        res.status(403).json({"error":"No gid provided, no garden updated."})
    }

    if (!name) {
        res.status(403).json({"error":"Garden must have a name."})
        return
    }

    const update = db.prepare('UPDATE Gardens SET name = ?, description = ?, image = ?, location = ? WHERE gid = ? AND uid = ?')

    update.run([name, description, image, location, gid, user.id], function(err) {
        if (this.changes > 0) {
            res.status(200).json({"status":"Garden updated."})
        } else {
            res.status(404).json({"status":"Garden not found"})
        }
    })
})

module.exports = router
