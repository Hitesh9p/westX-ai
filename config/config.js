require('dotenv').config();

const config = {
    // Database Configuration
    mongodb: {
        uri: process.env.MONGODB_URI,
        testUri: process.env.MONGODB_URI + '-test',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },

    // Twitter API Configuration
    twitter: {
        apiKey: process.env.TWITTER_API_KEY,
        apiSecret: process.env.TWITTER_API_SECRET,
        accessToken: process.env.TWITTER_ACCESS_TOKEN,
        accessSecret: process.env.TWITTER_ACCESS_SECRET
    },

    // OpenAI Configuration
    openai: {
        apiKey: process.env.OPENAI_API_KEY
    },

    // Server Configuration
    server: {
        port: process.env.PORT || 3000,
        env: process.env.NODE_ENV || 'development'
    }
};

module.exports = config;