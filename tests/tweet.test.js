const mongoose = require('mongoose');
const Tweet = require('../models/Tweet');
require('dotenv').config();

describe('Tweet Model Test', () => {
    beforeAll(async () => {
        jest.setTimeout(30000); // Increase timeout to 30 seconds
        try {
            const uri = process.env.MONGODB_URI;
            console.log('Attempting to connect to MongoDB...'); // Debug log
            if (!uri) {
                throw new Error('MONGODB_URI is not defined in environment variables');
            }
            await mongoose.connect(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log('Connected to MongoDB test database');
        } catch (error) {
            console.error('MongoDB connection error:', error);
            throw error;
        }
    });

    afterAll(async () => {
        try {
            await mongoose.connection.close();
            console.log('Closed MongoDB connection');
        } catch (error) {
            console.error('Error closing MongoDB connection:', error);
        }
    });

    beforeEach(async () => {
        if (mongoose.connection.readyState !== 1) {
            throw new Error('MongoDB not connected');
        }
        try {
            await mongoose.connection.collection('tweets').deleteMany({});
        } catch (error) {
            console.error('Error clearing collection:', error);
        }
    });

    it('should create & save tweet successfully', async () => {
        const validTweet = new Tweet({
            content: 'Test tweet content',
            postedAt: new Date(),
            engagement: 0
        });
        const savedTweet = await validTweet.save();
        expect(savedTweet._id).toBeDefined();
        expect(savedTweet.content).toBe(validTweet.content);
    }, 10000); // Add timeout of 10 seconds

    it('should fail to save tweet without required content', async () => {
        const tweetWithoutContent = new Tweet({
            postedAt: new Date()
        });
        let err;
        try {
            await tweetWithoutContent.save();
        } catch (error) {
            err = error;
        }
        expect(err).toBeDefined();
    }, 10000); // Add timeout of 10 seconds
});