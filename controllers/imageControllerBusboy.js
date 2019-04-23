const path = require('path')
var Busboy = require('busboy');
const randomstring = require("randomstring");
var fs = require('fs')

exports.uploadBusboy = function (req, res) {
    var busboy = new Busboy({ headers: req.headers });
    req.pipe(req.busboy);
    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        filename = randomstring.generate() + "_" + filename;
        var saveTo = path.join('images', filename);
        console.log('Uploading: ' + saveTo);
        console.log(saveTo);
        file.pipe(fs.createWriteStream(saveTo));
    });
    busboy.on('finish', function () {
        console.log('Upload complete');

        res.writeHead(200, { 'Connection': 'close' });
        res.end("That's all folks!");
    });
    // busboy.on("close",()=>{

    // })

    return req.pipe(busboy);
}