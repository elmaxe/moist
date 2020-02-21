'use strict'

const path = require('path'); //  Helps resolve relative paths, into absolute baths, independent of operating system
const sqlite3 = require('sqlite3').verbose();

const databasePath = path.join(__dirname, 'db.sqlite');
const db = new sqlite3.Database(databasePath);

db.serialize(() => {
    // db.run('DROP TABLE IF EXISTS Users')
    // db.run(`CREATE TABLE IF NOT EXISTS ${Users}`);

})

module.exports = db