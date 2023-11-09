const mongoose = require('mongoose');
const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },
    mbti: {
        type: String,
        required: [true, 'mbti is required']
    },
    enneagram: {
        type: String,
        required: [true, 'enneagram is required']
    },
    variant: {
        type: String,
        required: [true, 'variant is required']
    },
    tritype: {
        type: Number,
        required: [true, 'tritype is required']
    },
    socionics: {
        type: String,
        required: [true, 'socionics is required']
    },
    sloan: {
        type: String,
        required: [true, 'sloan is required']
    },
    psyche: {
        type: String,
        required: [true, 'psyche is required']
    },
    image: {
        type: String,
        default: "https://avatars.githubusercontent.com/u/93823479?v=4"
    }
});
const Profile = mongoose.model('profile', profileSchema);
module.exports = Profile;