const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'profile'
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    },
    comment: {
        type: String,
        required: [true, 'Please write some text']
    },
    voting: {
        type: Number,
        default: 0
    }
});
const Comment = mongoose.model('comment', commentSchema);
module.exports = Comment;