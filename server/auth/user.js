'use strict'

var express = require('express')
var router = express.Router()
const db = require('../database');
const {validCookie} = require('../auth/validCookie')

router.post('/change-description', validCookie, (req, res) => {
    const {description} = req.body
    const user = req.session.user

    const getdesc = db.prepare('SELECT description FROM Users WHERE id = ?')
    const setdesc = db.prepare('UPDATE Users SET description = ? WHERE id = ?')

    getdesc.get([user.id], (err, row) => {
        if (err) {
            res.status(500).json({"error":"Internal server error."})
            return
        }

        if (row === undefined) {
            res.status(404).json({"error":"Invalid session."})
            return
        }

        console.log(row)
        
        if (description.length > 250) {
            res.status(403).json({"error":"Description too long, maximum 250 characters."})
            return
        } else if (description === row) {
            res.status(200).json({"status":"No changes made to description, not saved."})
            return
        }

        setdesc.run([description, user.id], function(err) {
            if (err) {
                res.status(500).json({"error":"Internal server error."})
                return
            }

            if (this.changes > 0) {
                res.status(200).json({"status":"Description updated."})
            } else {
                res.status(403).json({"error":"Something went wrong."})
            }
        })

    })


})

module.exports = router