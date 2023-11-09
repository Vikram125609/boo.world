const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    user_id: {
        type: String,
        ref: 'profile'
    },
    description: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: "https://avatars.githubusercontent.com/u/93823479?v=4"
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    }]
});
const Post = mongoose.model('post', postSchema);
module.exports = Post;