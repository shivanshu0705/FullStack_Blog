const util = require('../models/util.js')
const express = require('express')
const config = require("../server/config/config")

const homeController = express.Router()


function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

// homeController.use('/', checkAuthenticated);
// homeController.use('/about', checkAuthenticated);



homeController.get('/', util.logRequest, checkAuthenticated, (req, res) => {
    res.sendFile('index.html', {root: config.ROOT})
})


homeController.get('/home', util.logRequest, checkAuthenticated, (req, res) => {
    res.sendFile('index.html', {root: config.ROOT})
})



homeController.get('/about', checkAuthenticated, (req, res) => {
    res.sendFile('about.html', { root: config.ROOT })
})


module.exports = homeController