const Post = require('../models/post');
const Comment = require('../models/comment');
const Profile = require('../models/profile');
const mongoose = require('mongoose');
const postWithLikesNoComments = async (id) => {
    const post = await Post.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(id)
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
    return post;
};
const postWithCommentsNoLikes = async (id) => {
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
            $group: {
                _id: '$_id',
                user_id: { $first: '$user_id' },
                description: { $first: '$description' },
                image: { $first: '$image' },
                comments: { $first: '$comments' },
                likes: { $first: '$likes' },
                __v: { $first: '$__v' },
            }
        },
    ]);
    return post;
};
const postWithLikesComments = async (id) => {
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
    return post;
};

const commentHavingVote = async function (id) {
    const comment = await Comment.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(id)
            }
        },
        {
            $unwind: '$voters'
        },
        {
            $lookup: {
                foreignField: '_id',
                localField: 'voters',
                from: 'profiles',
                as: 'voters'
            }
        },
        {
            $group: {
                _id: '$_id',
                user_id: { $first: '$user_id' },
                post_id: { $first: '$post_id' },
                image: { $first: '$image' },
                comment: { $first: '$comment' },
                voting: { $first: '$voting' },
                voters: { $push: { $arrayElemAt: ['$voters', 0] } },
                __v: { $first: '$__v' },
            }
        }
    ]);
    return comment;
}
module.exports = { postWithLikesNoComments, postWithCommentsNoLikes, postWithLikesComments, commentHavingVote };