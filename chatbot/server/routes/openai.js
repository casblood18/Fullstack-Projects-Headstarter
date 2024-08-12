const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/chat', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo', 
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    res.status(200).json(response.data.choices[0].message.content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error processing request' });
  }
});

module.exports = router;