// models/Tweet.js
const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        maxLength: 280
    },
    postedAt: {
        type: Date,
        default: Date.now
    },
    scheduledFor: {
        type: Date
    },
    status: {
        type: String,
        enum: ['posted', 'scheduled', 'failed'],
        default: 'posted'
    },
    engagement: {
        likes: { type: Number, default: 0 },
        retweets: { type: Number, default: 0 },
        replies: { type: Number, default: 0 }
    },
    twitterId: String
});

module.exports = mongoose.model('Tweet', tweetSchema);