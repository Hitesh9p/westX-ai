// routes/tweets.js
const express = require('express');
const router = express.Router();
const { postTweet } = require('../services/twitterService');

router.post('/post', async (req, res) => {
    try {
        const { content } = req.body;
        const tweet = await postTweet(content);
        res.json({ 
            success: true, 
            tweet,
            message: 'Tweet posted successfully'
        });
    } catch (error) {
        console.error('Error posting tweet:', error);
        res.status(500).json({ 
            error: error.message,
            message: 'Failed to post tweet'
        });
    }
});