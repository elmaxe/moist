'use strict'

const path = require('path');
const express = require('express'); 
const db = require('./database');

require('dotenv').config()

const port = process.env.PORT;
const publicPath = path.join(__dirname, 'public');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
//logging
var morgan = require('morgan')
var router = express.Router();

const login = require('./auth/login')
const register = require('./auth/register')
const passwordreset = require('./auth/passwordReset')

app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Console logging
app.use(morgan('dev'));

app.use(express.urlencoded({
    extended: true,
}));

app.listen(port, () => {
    console.info(`Listening on port ${port}!`);
});

app.get('/', (req, res) => {
    db.all('SELECT * FROM PasswordReset', (err, rows) => {
        res.send(rows)
    })
})

app.use('/auth/register', register)
app.use('/auth/login', login)
app.use('/auth/resetpassword', passwordreset)


setInterval(() => {
    console.log("Clearing password resets")
    db.run(`DELETE FROM PasswordReset WHERE expires < ${Date.now()}`)
}, 30000)