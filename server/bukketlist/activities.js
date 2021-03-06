'use strict'

var express = require('express')
var router = express.Router()
const db = require('../database');
const uuid4 = require('uuid4');
const {validCookie} = require('../auth/validCookie')


//TODO: validCookie
router.get('/get/:bid', (req, res) => {
    const user = req.session.user
    const {bid} = req.params
    const activities = db.prepare('SELECT Activities.activity, Activities.aid, Activities.bid, Bukketlists.private, Bukketlists.private, Users.id, Activities.done FROM Activities \
                                    INNER JOIN Users ON Users.id = Bukketlists.uid \
                                    INNER JOIN Bukketlists ON Bukketlists.bid = Activities.bid \
                                    WHERE Bukketlists.bid = ?\
                                    AND (Bukketlists.private = false OR Bukketlists.private = true AND Users.id = ?)')
    activities.all([bid, user.id], (err, rows) => {
        if (err) {
            res.status(500).json({"error":"Internal server error."})
            return
        }

        rows = rows.map(x => {
            x.uid = x.id
            delete x["id"]
            return x
        })

        res.status(200).json({rows})
    })
})

router.post('/add', validCookie, (req, res) => {
    const user = req.session.user
    const {bid, activity, accessibility, type, participants, price, link, key, saveGlobally} = req.body
    const add = db.prepare('INSERT INTO Activities (bid, activity, accessibility, type, participants, price, link, key, done) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)')
    //TODO: KOLLA ATT BID TILLHÖR DIG SJÄLV, SÅ MAN INTE KAN LÄGGA TILL I ANDRAS LISTOR (GÅR EJ ATT GÖRA FRÅN WEBBLÄSARE, BARA VIA KOMMANDS)
    add.run([bid, activity, accessibility, type, participants, price, link, key, false], (err) => {
        if (err) {
            console.log(err)
            res.status(500).json({"error":"Internal server error"})
            return
        }

        if (saveGlobally === true) {
            const createNew = db.prepare('INSERT INTO UserCreatedActivities (uid, username, activity, accessibility, type, participants, price, key, creationDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)')
            createNew.run([user.id, user.username, activity, accessibility, "", participants, price, uuid4(), Date.now()], function(err2) {
                if (err2) {
                    console.log(err2)
                    
                    res.status(201).json({"status":"Added activity, but it was not saved globally."})
                    return
                }
                res.status(201).json({"status":"REEEE."})
                return
            })
        } else {
            res.status(201).json({"status":"Added activity."})
        }
    })
})

router.post('/remove', validCookie, (req, res) => {
    // const user = req.session.user
    const {bid, activity} = req.body

    const remove = db.prepare('DELETE FROM Activities WHERE bid = ? AND activity = ?')
    remove.run([bid, activity], function(err) {
        if (err) {
            res.status(500).json({"error":"Internal server error"})
            return
        }

        if (this.changes > 0) {
            res.status(200).json({"status":"Removed activity."})
        } else {
            res.status(403).json({"status":"No activity removed"})
        }
    })
})

//Takes in a number >= 0 (amount of user created activities in the database) and returns a number [0-60)
const customActivityChance = (amount) => {
    if (amount === undefined) return 30
    return -(60/((amount/50)+1)) + 60
}

const fetch = require('node-fetch');

router.get('/randomize', validCookie, (req, res) => {
    
    db.serialize(() => {
        let customAmount = 10
        db.all('SELECT * FROM UserCreatedActivities', (err, rows) => {
            customAmount = rows.length
            
            const rand = Math.floor(Math.random() * 101)
            let chance = Math.floor(customActivityChance(customAmount))
    
            if (rand <= chance) {
                const getCustomCreated = db.prepare('SELECT * FROM UserCreatedActivities')
                getCustomCreated.all((err, rows) => {
                    if (err) {
                        res.status(500).json({"error":"Internal server error"})
                        return
                    }
                    console.log(rows)
                    const body = rows[Math.floor(Math.random() * rows.length)]
                    console.log(body)
                    res.status(200).json({row: {
                        ucaid: body.ucaid,
                        activity: body.activity,
                        accessibility: body.accessibility,
                        type: body.type,
                        participants: body.participants,
                        price: body.price,
                        link: body.link,
                        key: body.key,
                        createdBy: {
                            username: body.username,
                            uid: body.uid,
                            date: body.creationDate
                        }
                    }})
                })
            } else {
                console.log(req.headers['x-forwarded-for'] || req.connection.remoteAddress)
                fetch('https://www.boredapi.com/api/activity', {
                    method: "GET",
                    headers: {
                        "x-forwarded-for": req.headers['x-forwarded-for'] || req.connection.remoteAddress
                    }
                })
                .then(res => res.json())
                .catch(error => {
                    console.log(error)
                    res.status(500).json({"error":"Error... API is down??"})
                })
                .then(json => {
                    // console.log(json)
                    res.status(200).json({row: json})
                })
            }
        })
    })

})

router.get('/submitted/:user', (req, res) => {
    const {user} = req.params

    const submitted = db.prepare('SELECT * FROM UserCreatedActivities WHERE username = ?')

    submitted.all([user], (err, rows) => {
        if (err) {
            res.status(500).json({"error":"Internal server error"})
            return
        }
        if (rows != undefined) {
            const formattedRows = rows.map(x => {
                return {
                    ucaid: x.ucaid,
                    activity: x.activity,
                    accessibility: x.accessibility,
                    type: x.type,
                    participants: x.participants,
                    price: x.price,
                    link: x.link,
                    key: x.key,
                    createdBy: {
                        username: x.username,
                        uid: x.uid,
                        date: x.creationDate
                    }
                }
            })
            console.log(formattedRows)
            res.status(200).json({rows: formattedRows})
        } else {
            res.status(200).json({"status":"No submitted activities"})
        }
    })
})

router.post('/markasdone', validCookie, (req, res) => {
    const user = req.session.user
    const {bid, aid, state} = req.body

    const hasaccess = db.prepare('SELECT * FROM Bukketlists WHERE bid = ? AND uid = ?')
    const mark = db.prepare('UPDATE Activities SET done = ? WHERE aid = ?')
    hasaccess.get([bid, user.id], (err, row) => {
        if (err) {
            res.status(500).json({"error":"Internal server error"})
            return
        }

        if (row == undefined) {
            res.status(401).json({"error":"Unauthorized."})
            return
        }

        mark.run([state, aid], (err) => {
            if (err) {
                res.status(500).json({"error":"Internal server error"})
                return
            }

            res.status(200).json({"status":"Activity state updated."})
        })
    })
})

module.exports = router