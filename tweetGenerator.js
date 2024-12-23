const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function generateTweet() {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Generate a creative tweet about technology:",
    max_tokens: 280
  });
  return completion.data.choices[0].text;
}