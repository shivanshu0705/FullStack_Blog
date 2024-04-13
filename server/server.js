/*
 Loading built-in modules
*/
require('dotenv').config()
const fs = require("fs")
const path = require("path")
/*
  Loading external modules
*/
const express = require("express")
const server = express()
const MongoClient = require("mongodb").MongoClient
const flash = require('express-flash')
const session = require('express-session')
const passport = require('passport')

/*
  Loading internal modules
*/
const config = require("./config/config")
const util = require('../models/util.js')
const homeController = require('../controllers/homeController')
const postsController = require('../controllers/postsController')
const userController = require("../controllers/userController")
const aiController = require("../controllers/aiController")


//----------------------------------------------------------------


//----------------------------------------------------------------

// setting view
//server.set('view engine', 'ejs')
//----------------------------------------------------------------
// middleware
server.use(express.static(config.ROOT))
server.use(express.json())
server.use(express.urlencoded({ extended: false }))
server.use(flash())
server.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}))
server.use(passport.initialize())
server.use(passport.session())
server.use(homeController)
server.use(postsController)
server.use(userController)
server.use(aiController)

server.get('/logs', async (req, res, next) => {
  util.logRequest(req,res,next)
})
// catch all middleware
server.use((req, res, next) => {
  //res.status(404).sendFile('404.html',{root:config.ROOT})
  res.status(404).sendFile('404.html', { root: config.ROOT})
})
server.listen(config.PORT, "localhost", () => {
  console.log(`\t|Server listening on ${config.PORT}`)
})