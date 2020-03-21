'use strict'

var express = require('express')
var router = express.Router()
const db = require('../database');
const bcrypt = require('bcrypt')

const validUserData = (req, res, next) => {
    const {email, username, password} = req.body

    if (!username || !password || !email) {
        res.status(400).json({"error":"Missing credentials."})
        return
    }

    if (username.length < 5) {
        res.status(400).json({"error":"Username should be at least 5 characters."})
        return
    }

    if (password.length < 5) {
        res.status(400).json({"error":"Password should be at least 5 characters."})
        return
    }

    next()
}

router.post('/', validUserData, (req, res) => {
    const {email, username, password} = req.body

    const checkExists = db.prepare('SELECT * FROM Users WHERE email = ?')
    const insertUser = db.prepare('INSERT INTO Users (email, username, password, regDate) VALUES (?, ?, ?, ?)')

    checkExists.get([email], (err, row) => {
        if (err) {
            res.status(500).json({"error":"Internal server error."})
            return
        }

        if (row !== undefined) {
            res.status(403).json({"error":"Email already in use."})
            return
        }

        bcrypt.genSalt(12, (err, salt) => {
            if (err) {
                res.status(500).json({"error":"Internal server error."})
                return
            }

            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    res.status(500).json({"error":"Internal server error."})
                    return
                }

                insertUser.run([email, username, password, new Date()], (err) => {
                    if (err) {
                        res.status(500).json({"error":"Internal server error"})
                        return
                    }

                    res.status(201).json({"status":"Account created."})
                })
                insertUser.finalize()
            })
        })
    })
    checkExists.finalize()
})

module.exports = router