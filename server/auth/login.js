'use strict'

var express = require('express')
var router = express.Router()
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
    const {password} = req.body;
	const email = req.body.email.toLowerCase()
    
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
                authenticate(req, row)
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
    getUser.finalize()
});

router.get('/isAuth', (req, res) => {
    const user = req.session.user
    console.log(user)
    const getUser = db.prepare('SELECT * FROM Users WHERE id = ?')

    if (user) {
        getUser.get([user.id], (err, row) => {
            if (err) {
                res.status(500).json({"error":"Internal server error."})
                return
            }

            if (row === undefined) {
                res.status(404).json({"error":"Invalid session."})
                return
            }

            res.status(200).json({
                authenticated: true,
                user: {
                    id: row.id,
                    email: row.email,
                    username: row.username,
                    regDate: row.regDate,
                    profilePicture: row.profilePicture
                }
            })
        })
        getUser.finalize()
    } else {
        res.status(404).json({
            authenticated: false,
            user: {
                id: "",
                email: "",
                username: "",
                regDate: "",
                profilePicture: ""
            }
        })
    }
})

module.exports = router

const authenticate = (req, row) => {
    if (!req.session.user) {
        console.log("Create new session for user: " + row.username)
        req.session.user = {
            id: row.id,
            email: row.email,
            username: row.username
        }
    } else {
        console.log(`User ${row.username} already has a session`)
    }
}