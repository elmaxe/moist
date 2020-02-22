'use strict'

const path = require('path'); //  Helps resolve relative paths, into absolute baths, independent of operating system
const sqlite3 = require('sqlite3').verbose();

const databasePath = path.join(__dirname, 'db.sqlite');
const db = new sqlite3.Database(databasePath);

const Users = 'Users(id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, email TEXT, password TEXT, registration_date TEXT, email_confirmed INTEGER)'
const PasswordReset = 'PasswordReset(id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, expires TEXT, key TEXT, FOREIGN KEY(user_id) REFERENCES Users(id) ON DELETE CASCADE)'
const RegistrationConfirm = 'RegistrationConfirm(id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, token TEXT, expires TEXT, FOREIGN KEY(user_id) REFERENCES Users(id) ON DELETE CASCADE)'

db.serialize(() => {
    // db.run('DROP TABLE IF EXISTS Users')
    // db.run('DROP TABLE IF EXISTS PasswordReset')
    // db.run('DROP TABLE IF EXISTS RegistrationConfirm')
    db.run(`CREATE TABLE IF NOT EXISTS ${Users}`);
    db.run(`CREATE TABLE IF NOT EXISTS ${PasswordReset}`);
    db.run(`CREATE TABLE IF NOT EXISTS ${RegistrationConfirm}`);
})

module.exports = db