import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

export const generateMessage = async (req, res) => {
  const { product, tone, goal } = req.body;

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Write a ${tone} promotional message for a product called "${product}" that helps users "${goal}". Keep it concise and engaging.`
        }
      ],
    });

    const message = completion.data.choices[0].message.content;
    res.json({ message });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'AI message generation failed' });
  }
};
