var express = require('express')
var router = express.Router()

router.get('/', (req, res) => {
    res.send({"newpassword":"hi from passwordreset"})
})

module.exports = router