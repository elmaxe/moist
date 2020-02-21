'use strict'

const path = require('path');
const express = require('express'); 
const bcrypt = require('bcrypt');
// const db = require('./database');

const port = 4000;
const publicPath = path.join(__dirname, 'public');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')

var router = express.Router();

var morgan = require('morgan')

app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Logging
app.use(morgan('dev'));

// Register a middleware that adds support for a URL encoded request body.
// This is needed in order to send data to express using a FORM with a POST action.
app.use(express.urlencoded({
    extended: true,
}));

app.listen(port, () => {
    console.info(`Listening on port ${port}!`);
});

app.get('/', (req, res) => {
    res.json({"hej":"då"})
})
