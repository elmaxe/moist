'use strict'

var express = require('express')
var router = express.Router()
var errr = ""
const db = require('../database');
const bcrypt = require('bcrypt');

const validCredentials = (req, res, next) => {
    const {password, email} = req.body
    if (!password || !email) {
        res.status(400).json({"error":"Missing credentials."})
        return
    }
    next()
}

router.post('/', validCredentials, (req, res) => {
    console.log(req.body);
    const {email, password} = req.body;

    const getUser = db.prepare('SELECT * FROM USERS WHERE email = ?')

    getUser.get([email], (err, row) => {
        if (err) {
            res.status(500).json({"error":"Internal server error."})
            return
        }
        if (row === undefined) {
            res.status(403).json({"error":"Invalid username or password."})
            return
        }
        bcrypt.compare(password, row.password, (err, equal) => {
            if (err) {
                res.status(500).json({"error":"Internal server error."})
                return
            }
            if (equal) {
                res.status(200).json({
                    id: row.id,
                    username: row.username,
                    email: row.email,
                    regDate: row.regDate,
                    profilePicture: row.profilePicture
                })
            } else {
                res.status(403).json({"error":"Invalid username or password."})
                return
            }
        })
    })
});

module.exports = router
