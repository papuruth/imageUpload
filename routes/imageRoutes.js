const express = require('express')
const router = express.Router()
const imageController = require('../controllers/imageController')
const busboyController = require('../controllers/imageControllerBusboy')

// router.post('/upload', imageController.upload)
router.post('/upload', imageController.upload)
router.post('/uploadbb', busboyController.uploadBusboy)
module.exports = router