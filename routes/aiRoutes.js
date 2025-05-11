import express from 'express';
import OpenAI from 'openai';

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
  
});

router.post('/generate', async (req, res) => {
  const { productName, customerType } = req.body;

  if (!productName || !customerType) {
    return res.status(400).json({ error: 'Missing product or customer info' });
  }

  try {
    const prompt = `Write a short, engaging campaign message for a product called "${productName}" targeted at "${customerType}". Make it persuasive and under 280 characters.`;

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo', 
      messages: [
        { role: 'system', content: 'You are a creative marketing assistant.' },
        { role: 'user', content: prompt },
      ],
    });

    const message = completion.data.choices[0].message.content.trim();
    res.json({ message });
  } catch (err) {
    console.error('AI generation error:', err.message);
    res.status(500).json({ error: 'Failed to generate message' });
  }
});

export default router;
