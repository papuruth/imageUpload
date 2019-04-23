// Get the packages we need
var express = require('express')
var path = require('path')
var busboy = require('connect-busboy')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var cors = require('cors')
const route = require('./routes/imageRoutes')

// Connection with MongoDB
mongoose.connect('mongodb://localhost:27017/imageUpload', { useNewUrlParser: true })
const connection = mongoose.connection
connection.once('open', () => {
  console.log('Connection to MongoDB Successful')
})

// Create Express application
var app = express()
app.use(cors())
app.use(express.static('public'))
app.use(busboy());
// Image files path
app.use(express.static(path.join(__dirname, 'images')))

var NODE_ENV = 'development'
// Set Variables
app.set('env', process.env.NODE_ENV || 'production')

// Use environment defined port or 3000
var port = process.env.PORT || 3000
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', route)

// Start the server
app.listen(port)
console.log('Server starts on port ' + port)
console.log('Server starts in  ' + NODE_ENV + ' mode')
