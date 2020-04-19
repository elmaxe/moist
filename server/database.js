const path = require('path'); //  Helps resolve relative paths, into absolute baths, independent of operating system
const sqlite3 = require('sqlite3').verbose();

const databasePath = path.join(__dirname, 'db.sqlite');
const db = new sqlite3.Database(databasePath);
//THIS LINE MAKES ON DELETE CASCADE WORK
db.exec("PRAGMA foreign_keys=ON")

// Auto increment automatically increments the id entry, there is no need to supply it a value.
const userTable = 'CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL, username TEXT NOT NULL, password TEXT NOT NULL, regDate TEXT, profilePicture TEXT, description TEXT)';
// const gardenTable = 'CREATE TABLE IF NOT EXISTS Gardens (gid INTEGER PRIMARY KEY AUTOINCREMENT, uid INTEGER NOT NULL, name TEXT NOT NULL, description TEXT, image TEXT, creationDate TEXT NOT NULL, location TEXT, FOREIGN KEY(uid) REFERENCES Users(id) ON DELETE CASCADE)'
// const plantTable = 'CREATE TABLE IF NOT EXISTS Plants (pid INTEGER PRIMARY KEY AUTOINCREMENT, gid INTEGER NOT NULL, name TEXT NOT NULL, image TEXT, birth TEXT, death TEXT, FOREIGN KEY(gid) REFERENCES Gardens(gid) ON DELETE CASCADE)'

const activitiesTable = 'CREATE TABLE IF NOT EXISTS Activities (aid INTEGER PRIMARY KEY AUTOINCREMENT, bid INTEGER NOT NULL, activity TEXT, accessibility TEXT, type TEXT, participants TEXT, price TEXT, link TEXT, key TEXT)'

const userCreatedActivities = 'CREATE TABLE IF NOT EXISTS UserCreatedActivities (ucaid INTEGER PRIMARY KEY AUTOINCREMENT, uid INTEGER NOT NULL, username TEXT NOT NULL, activity TEXT NOT NULL, accessibility TEXT, type TEXT, participants TEXT, price TEXT, link TEXT, key TEXT NOT NULL, creationDate TEXT NOT NULL)'

const bukketlist = 'CREATE TABLE IF NOT EXISTS Bukketlists (bid INTEGER PRIMARY KEY, uid INTEGER NOT NULL, private BOOLEAN NOT NULL, name TEXT NOT NULL, description TEXT, creationDate TEXT NOT NULL)'

db.serialize(() => {
    // db.run('DROP TABLE IF EXISTS Users');
    // db.run('DROP TABLE IF EXISTS Activities');
    // db.run('DROP TABLE IF EXISTS Bukketlists');
    // db.run('DROP TABLE IF EXISTS Gardens');
    // db.run('DROP TABLE IF EXISTS Plants');
    db.run(userTable);
    db.run(activitiesTable)
    db.run(userCreatedActivities)
    db.run(bukketlist)
    // db.run(gardenTable)
    // db.run(plantTable)
});

module.exports = db;
