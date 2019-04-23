const imageModel = require('../models/imageModel')
const randomstring = require("randomstring");
const fs = require('fs')

exports.upload = function (req, res) {
    var base64Data = req.body.image.replace(/^data:image\/(?:jpeg|jpg|JPEG|JPG|png|PNG);base64,/, "");
    var filename = randomstring.generate(5);
    let extension;
    //write logic of finding extension from base64 string.
    const type = base64Data.substring(base64Data.indexOf('/') + 1, base64Data.indexOf(';base64'));
    if (type === '/') {
        extension = '.jpg'
    }

    if (type === 'i') {
        extension = '.png'
    }

    fs.writeFile("images/" + filename + extension, base64Data, 'base64', function(err) {
        const image = new imageModel({
            url: '/images/' + filename + extension,
            filename: filename + extension,
            imageType: extension
        })
        image.save(function(err) {
            if (err) {
                res.json(err)
            }
            res.json({
                success: true,
                path: '/' + filename + extension,
                fileName: filename + extension,
                imageType: extension
            })
        })
    })
}