'use strict'

const fs = require('fs')
const http = require('http')
const https = require('https')

const path = require('path');
const express = require('express');
// const db = require('./database');

const port = 8002;

const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
//logging
var morgan = require('morgan')
const session = require('express-session')
const redis = require('redis')
const uuid4 = require('uuid4');
const helmet = require('helmet')

let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient()

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            // defaultSrc: ["'self'", 'boredapi.com'],
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", 'maxcdn.bootstrapcdn.com'],
            styleSrc: ["'self'", 'maxcdn.bootstrapcdn.com', 'fonts.googleapis.com'],
            imgSrc: ["'self'", 'data:'],
            fontSrc: ['fonts.googleapis.com', 'fonts.gstatic.com']
        }
    }
}))

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

const cookieMaxAge = 60*60*2

app.use(session({
    name: "session",
    //Non-memory-leaking store
    store: new RedisStore({
        client: redisClient,
        ttl: cookieMaxAge,
        //Disabled resettig the max age in store upon checking the session
        disableTouch: true
    }),
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
const activities = require('./bukketlist/activities')
const bucketlist = require('./bukketlist/bucketlist')
const upload = require('./upload/upload')
const search = require('./search')
const user = require('./auth/user')
const updateprofilepic = require('./auth/changeprofilepic')

app.use('/api/auth/login', login)
app.use('/api/auth/logout', logout)
app.use('/api/auth/register', register)
app.use('/api/activities', activities)
app.use('/api/bukketlist', bucketlist)
app.use('/api/upload', upload)
app.use('/api/search', search)
app.use('/api/auth/user', user)
app.use('/api/auth/user/profilepic', updateprofilepic)

app.use('/bukket', express.static(path.join(__dirname, './bukket')))
app.use('/images', express.static(path.join(__dirname, './images')))
app.use('/u/images', express.static(path.join(__dirname, './images')))

app.use(express.static(path.join(__dirname, '../client/build')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
})

const httpServer = http.createServer(app)
httpServer.listen(port, () => (console.log(`Listening on port ${port}`)))