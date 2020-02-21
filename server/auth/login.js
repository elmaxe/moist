var express = require('express')
var router = express.Router()

router.get('/', (req, res) => {
    res.send({"login":"hi from login"})
})

module.exports = router