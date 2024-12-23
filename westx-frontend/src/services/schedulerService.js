// services/schedulerService.js
const cron = require('node-cron');
const Tweet = require('../models/Tweet');
const { postTweet } = require('./twitterService');

function initializeScheduler() {
    // Check for scheduled tweets every minute
    cron.schedule('* * * * *', async () => {
        try {
            const now = new Date();
            const scheduledTweets = await Tweet.find({
                scheduledFor: { $lte: now },
                status: 'scheduled'
            });

            for (const tweet of scheduledTweets) {
                try {
                    await postTweet(tweet.content);
                    tweet.status = 'posted';
                    tweet.postedAt = now;
                    await tweet.save();
                } catch (error) {
                    tweet.status = 'failed';
                    await tweet.save();
                }
            }
        } catch (error) {
            console.error('Scheduler Error:', error);
        }
    });
}

module.exports = {
    initializeScheduler
};