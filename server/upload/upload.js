'use strict'

var express = require('express')
var router = express.Router()
const uuid4 = require('uuid4');
const fileUpload = require('express-fileupload')

router.use(fileUpload({
    createParentPath: true,
    safeFileNames: true,
    limits: {
        fileSize: 1024*1024*5
    }
}))

router.post('/', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).json({"error":"No file provided, no file uploaded."})
    }

    let sampleFile = req.files.sampleFile
    let newName = uuid4() + ".png"
    //Utgår tydligen från app:s directory och inte upload.js
    sampleFile.mv('./images/' + newName, (err) => {
        if (err) {
            res.status(500).json({"error":"Internal server error."})
            return
        }

        res.status(200).json({
            "status":"File uploaded.",
            image: {
                name: newName,
                mimetype: sampleFile.mimetype,
                path: '/images/' + newName,
                size: sampleFile.size
            }
        })
    })

    // res.send("upload")
});

module.exports = router
