const path = require('path'); //  Helps resolve relative paths, into absolute baths, independent of operating system
const sqlite3 = require('sqlite3').verbose();

const databasePath = path.join(__dirname, 'db.sqlite');
const db = new sqlite3.Database(databasePath);
//THIS LINE MAKES ON DELETE CASCADE WORK
db.exec("PRAGMA foreign_keys=ON")

// Auto increment automatically increments the id entry, there is no need to supply it a value.
const userTable = 'CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL, username TEXT NOT NULL, password TEXT NOT NULL, regDate TEXT)';

db.serialize(() => {
    db.run('DROP TABLE IF EXISTS Users');
    // db.run('DROP TABLE IF EXISTS Todos');
    db.run(userTable);
});

module.exports = db;
