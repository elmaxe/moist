'use strict'

var express = require('express')
var router = express.Router()
// const db = require('./database');

const {validCookie} = require('./validCookie')

router.get('/', validCookie, (req, res, next) => {
    req.session.destroy()
    res.cookie('session', '', {expires: new Date(Date.now()-1000*60*60*24*365*100), httpOnly: true})
    res.status(200).json({"status":"Logged out."})
})

module.exports = router