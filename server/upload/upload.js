'use strict'

var express = require('express')
var router = express.Router()
const uuid4 = require('uuid4');
const fileUpload = require('express-fileupload')
const fileType = require('file-type')

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

    let imageFile = req.files.imageFile

    fileType.fromBuffer(imageFile.data)
    .then(result => {
        if (result.mime !== 'image/jpeg' && result.mime !== 'image/png') {
            res.status(403).json({"error":"File type not allowed."})
            return
        }
        let newName = uuid4() + ".png"
        //Utgår tydligen från app:s directory och inte upload.js
        imageFile.mv('./images/' + newName, (err) => {
            if (err) {
                res.status(500).json({"error":"Internal server error."})
                return
            }
    
            res.status(200).json({
                "status":"File uploaded.",
                image: {
                    name: newName,
                    mimetype: imageFile.mimetype,
                    path: '/images/' + newName,
                    size: imageFile.size
                }
            })
        })
    })
    // res.send("upload")
});

module.exports = router
