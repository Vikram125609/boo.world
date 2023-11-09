const express = require('express');
const router = express.Router();
const Profile = require('../models/profile');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports = function () {
    router.post('/create', async function (req, res, next) {
        const { user_id, description, image } = req.body;
        const post = new Post({ user_id, description, image });
        await post.save();
        res.status(200).json({ post: post });
    });
    router.post('/comment', async function (req, res, next) {
        const { user_id, post_id, comment } = req.body;
        const comment_on_post = new Comment({ user_id, post_id, comment });
        const post = await Post.findByIdAndUpdate(post_id,
            {
                $push: {
                    'comments': user_id
                }
            },
            {
                new: true
            }
        );
        await comment_on_post.save();
        res.status(200).json({
            comment: comment_on_post,
            post: post
        });
    });
    router.post('/like', async function (req, res, next) {
        const { post_id } = req.body;
        
    });
    return router;
}