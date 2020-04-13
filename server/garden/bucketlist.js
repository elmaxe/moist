'use strict'

var express = require('express')
var router = express.Router()
const db = require('../database');
const uuid4 = require('uuid4');
const {validCookie} = require('../auth/validCookie')


router.get('/get', validCookie, (req, res) => {
    const user = req.session.user
    const get = db.prepare('SELECT * FROM Activities WHERE uid = ?')

    get.all([user.id], (err, rows) => {
        if (err) {
            res.status(500).json({"error":"Internal server error"})
            return
        }

        res.status(200).json({rows})
    })
})

router.post('/get', validCookie, (req, res) => {
    const user = req.session.user
    const {aid} = req.body
    const get = db.prepare('SELECT * FROM Activities WHERE uid = ? AND aid = ?')

    get.get([user.id, aid], (err, row) => {
        if (err) {
            res.status(500).json({"error":"Internal server error"})
            return
        }

        res.status(200).json({row})
    })
})

router.post('/add', validCookie, (req, res) => {
    const user = req.session.user
    const {activity, accessibility, type, participants, price, link, key, saveGlobally} = req.body
    const add = db.prepare('INSERT INTO Activities (uid, activity, accessibility, type, participants, price, link, key) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')

    add.run([user.id, activity, accessibility, type, participants, price, link, key], (err) => {
        if (err) {
            console.log(err)
            res.status(500).json({"error":"Internal server error"})
            return
        }

        if (saveGlobally === true) {
            const createNew = db.prepare('INSERT INTO UserCreatedActivities (uid, username, activity, accessibility, type, participants, price, key) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
            createNew.run([user.id, user.username, activity, accessibility, "type", participants, price, uuid4()], function(err2) {
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
    const user = req.session.user
    const {data, aid} = req.body

    const remove = db.prepare('DELETE FROM Activities WHERE uid = ? AND aid = ?')
    remove.run([user.id, aid], function(err) {
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

router.post('/update', validCookie, (req, res) => {
    const user = req.session.user
    const {data, aid} = req.body

    const update = db.prepare('UPDATE Activities SET data = ? WHERE uid = ? AND aid = ?')

    update.run([data, user.id, aid], function(err) {
        if (err) {
            res.status(500).json({"error":"Internal server error"})
            return
        }

        if (this.changes > 0) {
            res.status(200).json({"status":"Updated activity."})
        } else {
            res.status(403).json({"status":"No activity updated"})
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
                getCustomCreated.all((err, rows) => {
                    if (err) {
                        res.status(500).json({"error":"Internal server error"})
                        return
                    }
                    console.log(rows)
                    const body = rows[Math.floor(Math.random() * rows.length)]
                    console.log(body)
                    res.status(200).json({row: body})
                })
            } else {
                fetch('https://www.boredapi.com/api/activity', {
                    method: "GET"
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

module.exports = router