const path = require('path')
const imageModel = require('../models/imageModel')
const Busboy = require('busboy');
const randomstring = require("randomstring");
const fs = require('fs')

exports.uploadBusboy = function (req, res) {
    var busboy = new Busboy({ headers: req.headers });
    req.pipe(req.busboy);
    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        console.log(fieldname)
        filename = randomstring.generate(7) + "_" + filename;
        var saveTo = path.join('./images/', filename);
        console.log('Uploading: ' + saveTo);
        const url = '/' + filename
        file.pipe(fs.createWriteStream(saveTo));
        const imageData = new imageModel({
            url: url,
            filename: filename,
            imageType: mimetype
        })
        imageData.save(function(err) {
            if (err) {
                res.json(err);
            }
            res.json({
                success: true,
                path: url,
                fileName: filename
            })
        })
    });
    return req.pipe(busboy);
}