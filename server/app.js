'use strict'

const fs = require('fs')
const http = require('http')
const https = require('https')

const path = require('path');
const express = require('express');
// const db = require('./database');

const port = 4000;

const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
//logging
var morgan = require('morgan')
const session = require('express-session')
const redis = require('redis')
const uuid4 = require('uuid4');
const helmet = require('helmet')

app.use(helmet())

app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// const getDate = () => {
//     let date = new Date()
//     let year = date.getUTCFullYear()
//     let month = date.getUTCMonth()+1 < 10 ? "0"+(date.getUTCMonth()+1) : date.getUTCMonth()+1
//     let day = date.getUTCDate() < 10 ? "0"+date.getUTCDate() : date.getUTCDate()
//     date = year + "-" + month + "-" + day
//     return date
// }

//Console logging
app.use(morgan('dev'));
// app.use(morgan('common', {
//     stream: fs.createWriteStream('./logs/' + getDate() + '.log', {flags: 'a'})
// }))

app.use(express.urlencoded({
    extended: true,
}));

const cookieMaxAge = 60*60*2

app.use(session({
    name: "session",
    //Non-memory-leaking store
    // store: new RedisStore({
    //     client: redisClient,
    //     ttl: cookieMaxAge,
    //     //Disabled resettig the max age in store upon checking the session
    //     disableTouch: true
    // }),
    genid: () => {return uuid4()},
    secret: "1234",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*cookieMaxAge,
        httpOnly: true,
        // secure: true,
        // domain: "127.0.0.1"
    }
}))

const login = require('./auth/login')
const logout = require('./auth/logout')
const register = require('./auth/register')

app.listen(port, () => {
    console.info(`Listening on port ${port}!`);
});

app.use('/api/auth/login', login)
app.use('/api/auth/logout', logout)
app.use('/api/auth/register', register)

// app.use(express.static(path.join(__dirname, '../client/todoapp/build')))

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/todoapp/build', 'index.html'))
// })

const httpServer = http.createServer(app)
// const httpsServer = https.createServer({
//     key: fs.readFileSync('./key.pem'),
//     cert: fs.readFileSync('./cert.pem'),
//     passphrase: "12345"
// }, app)
httpServer.listen(8080)
// httpsServer.listen(8443)
