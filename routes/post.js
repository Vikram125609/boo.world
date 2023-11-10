const express = require('express');
const router = express.Router();
const Profile = require('../models/profile');
const Post = require('../models/post');
const Comment = require('../models/comment');
const { default: mongoose } = require('mongoose');

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
                    'comments': comment_on_post._id
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
        const { post_id, user_id } = req.body;
        const check = await Post.findById(post_id);
        let post;
        if (check.likes.includes(new mongoose.Types.ObjectId(user_id))) {
            post = await Post.findByIdAndUpdate(post_id,
                {
                    $pull: {
                        'likes': user_id
                    }
                },
                { new: true }
            );
        }
        else {
            post = await Post.findByIdAndUpdate(post_id,
                {
                    $push: {
                        'likes': user_id
                    }
                },
                { new: true }
            );
        }
        res.status(200).json({
            post: post
        });
    });
    router.get('/:id', async function (req, res, next) {
        const { id } = req.params;
        const post = await Post.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $unwind: '$comments'
            },
            {
                $lookup: {
                    foreignField: '_id',
                    localField: 'comments',
                    from: 'comments',
                    as: 'comments'
                }
            },
            {
                $unwind: '$comments'
            },
            {
                $lookup: {
                    from: 'profiles',
                    localField: 'comments.user_id',
                    foreignField: '_id',
                    as: 'comments.user_id'
                }
            },
            {
                $unwind: '$comments.user_id'
            },
            {
                $group: {
                    _id: '$_id',
                    user_id: { $first: '$user_id' },
                    description: { $first: '$description' },
                    image: { $first: '$image' },
                    comments: { $push: '$comments' },
                    __v: { $first: '$__v' },
                    likes: { $first: '$likes' }
                }
            },
            {
                $unwind: '$likes'
            },
            {
                $lookup: {
                    foreignField: '_id',
                    localField: 'likes',
                    from: 'profiles',
                    as: 'likes'
                }
            },
            {
                $group: {
                    _id: '$_id',
                    user_id: { $first: '$user_id' },
                    description: { $first: '$description' },
                    image: { $first: '$image' },
                    comments: { $first: '$comments' },
                    likes: { $push: { $arrayElemAt: ['$likes', 0] } },
                    __v: { $first: '$__v' },
                }
            },
        ]);
        res.status(200).json({
            post: post
        });
    });
    return router;
}