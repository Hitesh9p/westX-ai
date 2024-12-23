const { TwitterApi } = require('twitter-api-v2');

// Initialize Twitter client with your API credentials
const client = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

// Function to post a tweet
async function postTweet(content) {
    try {
        const tweet = await client.v2.tweet(content);
        return tweet;
    } catch (error) {
        console.error('Error posting tweet:', error);
    }
}

// Export the function to use in other files
module.exports = { postTweet };