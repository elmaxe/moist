var express = require('express')
var router = express.Router()

router.get('/', (req, res) => {
    res.send({"register":"hi from register"})
})

module.exports = router

//Register a new user, throw error if exists.
const registerUser = (name, password, email, callback) => {
    
}
