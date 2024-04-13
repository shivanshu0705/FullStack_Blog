const util = require('../models/util.js')
const express = require('express')
const config = require("../server/config/config")

const homeController = express.Router()

// homeController.use('/', checkAuthenticated);
// homeController.use('/about', checkAuthenticated);



homeController.get('/', util.logRequest, (req, res) => {
    res.sendFile('index.html', {root: config.ROOT})
})


homeController.get('/home', util.logRequest, (req, res) => {
    res.sendFile('index.html', {root: config.ROOT})
})



homeController.get('/about', (req, res) => {
    res.sendFile('about.html', { root: config.ROOT })
})


module.exports = homeController