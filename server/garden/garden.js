'use strict'

var express = require('express')
var router = express.Router()
const db = require('../database');

router.get('/', (req, res) => {
    res.send("Hej")
});

const plants = require('./plant')
router.use('/plants', plants)

module.exports = router
