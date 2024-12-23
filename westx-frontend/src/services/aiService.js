// services/aiService.js
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function generateTweetContent() {
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "Generate an engaging tweet about technology and AI:",
            max_tokens: 60,
            temperature: 0.7,
        });
        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error('OpenAI Error:', error);
        throw error;
    }
}

module.exports = {
    generateTweetContent
};