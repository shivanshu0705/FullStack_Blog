const util = require('../models/util.js')
const config = require("../server/config/config.js")
const Post = require("../models/post.js")
const client = util.getMongoClient(false)
const express = require('express')
const postsController = express.Router()

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}


postsController.get('/posts', util.logRequest, async (req, res, next) => {
    let collection = client.db().collection('posts')
    let posts = await util.find(collection, {})
    //Utils.saveJson(__dirname + '/../data/topics.json', JSON.stringify(topics))
    res.status(200).json(posts)

})

postsController.get('/posts/:id', util.logRequest, async (req, res) => {
    try {
        let collection = client.db().collection('posts')

        const post = (await util.find(collection, {id: parseInt(req.params.id)}))[0]

        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ error: "Post does not exist" });
        }
    } catch (error) {
        console.log("Error while querying the database:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

postsController.get('/postMessage', util.logRequest, checkAuthenticated, async (req, res, next) => {
    res.sendFile('postMessage.html', { root: config.ROOT })

})
postsController.post('/addPost', util.logRequest, checkAuthenticated, async (req, res, next) => {
    let collection = client.db().collection('posts')
    let topic = req.body.topic
    let message = req.body.message
    let user = req.body.by
    let post = Post(topic, message, user)
    util.insertOne(collection, post)

    // res.json(
    //     {
    //         message: `You post was added to the ${topic} forum`
    //     }
    // )
    //Utils.saveJson(__dirname + '/../data/posts.json', JSON.stringify(posts))
    res.redirect('/posts.html')
})

postsController.delete('/posts/:id', util.logRequest, async (req, res) => {
    const postId = parseInt(req.params.id);

    const collection = client.db().collection('posts');
    console.log("start deleting")
    const deletedPost = await util.deleteOne(collection, { id: postId });

    console.log({ message: "Post deleted successfully", deletedPost });
    res.redirect('/posts.html')

});




module.exports = postsController