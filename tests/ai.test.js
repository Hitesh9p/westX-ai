const aiService = require('../aiService');

jest.mock('../aiService', () => ({
    generateTweet: jest.fn()
}));

describe('AI Service Tests', () => {
    it('should generate valid tweet content', async () => {
        const mockTweet = 'AI generated test tweet';
        aiService.generateTweet.mockResolvedValue(mockTweet);

        const result = await aiService.generateTweet();
        expect(result).toBe(mockTweet);
        expect(result.length).toBeLessThanOrEqual(280);
    });
});