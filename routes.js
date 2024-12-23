// routes.js
const express = require('express');
const router = express.Router();
const Tweet = require('./models/Tweet');

// 1. Generate Tweet
router.post('/api/tweets/generate', async (req, res) => {
    try {
        // Placeholder for AI generation
        const content = "This is a generated tweet!";
        res.json({ content });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. Post Tweet
router.post('/api/tweets/post', async (req, res) => {
    try {
        const { content } = req.body;
        const tweet = new Tweet({
            content,
            status: 'posted',
            postedAt: new Date()
        });
        await tweet.save();
        res.json({ 
            success: true, 
            message: 'Tweet posted successfully',
            tweet 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. Schedule Tweet
router.post('/api/tweets/schedule', async (req, res) => {
    try {
        const { content, scheduledFor } = req.body;
        const tweet = new Tweet({
            content,
            status: 'scheduled',
            scheduledFor: new Date(scheduledFor)
        });
        await tweet.save();
        res.json({ 
            success: true, 
            message: 'Tweet scheduled successfully',
            tweet
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. Get Analytics
router.get('/api/tweets/analytics', async (req, res) => {
    try {
        const totalTweets = await Tweet.countDocuments({ status: 'posted' });
        const scheduledTweets = await Tweet.countDocuments({ status: 'scheduled' });
        
        res.json({
            totalTweets,
            scheduledTweets,
            engagement: 0 // Placeholder for actual engagement calculation
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 5. Get Recent Tweets
router.get('/api/tweets/recent', async (req, res) => {
    try {
        const tweets = await Tweet.find()
            .sort({ postedAt: -1 })
            .limit(10);
        res.json(tweets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;