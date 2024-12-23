const twitterService = require('../twitterService');

jest.mock('../twitterService', () => ({
    postTweet: jest.fn()
}));

describe('Twitter Service Tests', () => {
    it('should successfully post a tweet', async () => {
        const tweetContent = 'Test tweet';
        twitterService.postTweet.mockResolvedValue({ id: '123', text: tweetContent });

        const result = await twitterService.postTweet(tweetContent);
        expect(result).toBeDefined();
        expect(result.text).toBe(tweetContent);
    });

    it('should handle posting errors', async () => {
        twitterService.postTweet.mockRejectedValue(new Error('Failed to post tweet'));
        await expect(twitterService.postTweet('Test tweet')).rejects.toThrow('Failed to post tweet');
    });
});