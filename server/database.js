const path = require('path'); //  Helps resolve relative paths, into absolute baths, independent of operating system
const sqlite3 = require('sqlite3').verbose();

const databasePath = path.join(__dirname, 'db.sqlite');
const db = new sqlite3.Database(databasePath);
//THIS LINE MAKES ON DELETE CASCADE WORK
db.exec("PRAGMA foreign_keys=ON")

// Auto increment automatically increments the id entry, there is no need to supply it a value.
const userTable = 'CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL, username TEXT NOT NULL, password TEXT NOT NULL, regDate TEXT, profilePicture TEXT, description TEXT)';

const activitiesTable = 'CREATE TABLE IF NOT EXISTS Activities (aid INTEGER PRIMARY KEY AUTOINCREMENT, bid INTEGER NOT NULL, activity TEXT, accessibility TEXT, type TEXT, participants TEXT, price TEXT, link TEXT, key TEXT, done BOOLEAN, FOREIGN KEY(bid) REFERENCES Bukketlists(bid) ON DELETE CASCADE)'

const userCreatedActivities = 'CREATE TABLE IF NOT EXISTS UserCreatedActivities (ucaid INTEGER PRIMARY KEY AUTOINCREMENT, uid INTEGER NOT NULL, username TEXT NOT NULL, activity TEXT NOT NULL, accessibility TEXT, type TEXT, participants TEXT, price TEXT, link TEXT, key TEXT NOT NULL, creationDate TEXT NOT NULL, FOREIGN KEY(uid) REFERENCES Users(id) ON DELETE CASCADE)'

const bukketlist = 'CREATE TABLE IF NOT EXISTS Bukketlists (bid INTEGER PRIMARY KEY AUTOINCREMENT, uid INTEGER NOT NULL, private BOOLEAN NOT NULL, name TEXT NOT NULL, description TEXT, creationDate TEXT NOT NULL, FOREIGN KEY(uid) REFERENCES Users(id) ON DELETE CASCADE)'

const reports = 'CREATE TABLE IF NOT EXISTS Reports (rip INTEGER PRIMARY KEY AUTOINCREMENT, ucaid INTEGER NOT NULL, uid INTEGER NOT NULL, date TEXT, FOREIGN KEY(ucaid) REFERENCES UserCreatedActivities(ucaid) ON DELETE CASCADE)'

db.serialize(() => {
    // db.run('DROP TABLE IF EXISTS Users');
    // db.run('DROP TABLE IF EXISTS Activities');
    // db.run('DROP TABLE IF EXISTS Bukketlists');
    // db.run('DROP TABLE IF EXISTS UserCreatedActivities');
    db.run(userTable);
    db.run(activitiesTable)
    db.run(userCreatedActivities)
    db.run(bukketlist)
    db.run(reports)
});

module.exports = db;
