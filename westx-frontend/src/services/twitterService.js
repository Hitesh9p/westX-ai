// services/twitterService.js
const { TwitterApi } = require('twitter-api-v2');

const client = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

const twitterClient = client.readWrite;

async function postTweet(content) {
    try {
        console.log('Posting to Twitter:', content);
        const tweet = await twitterClient.v2.tweet(content);
        console.log('Tweet posted:', tweet);
        return tweet;
    } catch (error) {
        console.error('Twitter API Error:', error);
        throw error;
    }
}

module.exports = { postTweet };