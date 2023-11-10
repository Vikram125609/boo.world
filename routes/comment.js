const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const Comment = require('../models/comment');
const { default: mongoose } = require('mongoose');
const { commentHavingVote } = require('../utils/queries');

module.exports = function () {
    router.post('/:id/vote', async function (req, res, next) {
        const { id } = req.params;
        const { user_id } = req.body;
        const check = await Comment.findById(id);
        let comment;
        if (check.voters.includes(new mongoose.Types.ObjectId(user_id))) {
            comment = await Comment.findByIdAndUpdate(id,
                {
                    $pull: {
                        voters: user_id
                    },
                    $inc: {
                        voting: -1
                    }
                },
                {
                    new: true
                }
            );
        }
        else {
            comment = await Comment.findByIdAndUpdate(id,
                {
                    $push: {
                        voters: user_id
                    },
                    $inc: {
                        voting: 1
                    }
                },
                {
                    new: true
                }
            );
        }
        res.status(200).json({ comment: comment });
    });
    router.get('/:id', async function (req, res, next) {
        const { id } = req.params;
        let comment = await Comment.findById(id);
        if (comment.voting === 0) {
            res.status(200).json({ comment: comment });
        }
        else {
            comment = await commentHavingVote(id);
            res.status(200).json({ comment: comment });
        }
    });
    return router;
}