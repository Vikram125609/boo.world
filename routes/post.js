const express = require('express');
const router = express.Router();
const Profile = require('../models/profile');
const Post = require('../models/post');
const Comment = require('../models/comment');
const { default: mongoose } = require('mongoose');
const { postWithCommentsNoLikes, postWithLikesNoComments, postWithLikesComments } = require('../utils/queries');

module.exports = function () {
    router.get('/all', async function (req, res, next) {
        const posts = await Post.find().populate('user_id', 'name description mbti enneagram variant tritype socionics sloan psyche image');
        res.status(200).json({ posts: posts, message: 'All Post' });
    });
    router.post('/create', async function (req, res, next) {
        const { user_id, description, image } = req.body;
        const post = new Post({ user_id, description, image });
        await post.save();
        res.status(200).json({ post: post, message: 'Post Created Successfully' });
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
            post: post,
            message: 'Commented Successfully'
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
            post: post,
            message: 'Liked Successfully'
        });
    });
    router.get('/:id', async function (req, res, next) {
        const { id } = req.params;
        const post = await Post.findById(id);
        if (post.comments.length === 0 && post.likes.length === 0) {
            res.status(200).json({
                post: post,
                message: 'Get Post Using Id'
            });
        }
        else if (post.comments.length !== 0 && post.likes.length === 0) {
            const post = await postWithCommentsNoLikes(id);
            res.status(200).json({
                post: post,
                message: 'Get Post Using Id'
            });
        }
        else if (post.comments.length === 0 && post.likes.length !== 0) {
            const post = await postWithLikesNoComments(id);
            res.status(200).json({
                post: post,
                message: 'Get Post Using Id'
            });
        }
        else {
            const post = await postWithLikesComments(id);
            res.status(200).json({
                post: post,
                message: 'Get Post Using Id'
            });
        }
    });
    router.get('/:id/comment', async function (req, res, next) {
        const { id } = req.params;
        const { sort } = req.query;
        if (sort === 'best') {
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
                    $group: {
                        _id: '$_id',
                        user_id: { $first: '$user_id' },
                        description: { $first: '$description' },
                        image: { $first: '$image' },
                        comments: { $push: { $arrayElemAt: ['$comments', 0] } },
                        likes: { $first: '$likes' },
                        __v: { $first: '$__v' },
                    }
                },
                {
                    $unwind: "$comments"
                },
                {
                    $sort: { "comments.voting": -1 }
                },
                {
                    $group: {
                        _id: '$_id',
                        user_id: { $first: '$user_id' },
                        description: { $first: '$description' },
                        image: { $first: '$image' },
                        comments: { $push: '$comments' },
                        likes: { $first: '$likes' },
                        __v: { $first: '$__v' }
                    }
                }
            ]);
            res.status(200).json({
                post: post,
                message: 'best comments'
            });
        }
        else {
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
                    $group: {
                        _id: '$_id',
                        user_id: { $first: '$user_id' },
                        description: { $first: '$description' },
                        image: { $first: '$image' },
                        comments: { $push: { $arrayElemAt: ['$comments', 0] } },
                        likes: { $first: '$likes' },
                        __v: { $first: '$__v' },
                    }
                },
                {
                    $unwind: "$comments"
                },
                {
                    $sort: { "comments.createdAt": -1 }
                },
                {
                    $group: {
                        _id: '$_id',
                        user_id: { $first: '$user_id' },
                        description: { $first: '$description' },
                        image: { $first: '$image' },
                        comments: { $push: '$comments' },
                        likes: { $first: '$likes' },
                        __v: { $first: '$__v' }
                    }
                }
            ]);
            res.status(200).json({
                post: post,
                message: 'recent comments'
            });
        }
    });
    return router;
}