const axios = require('axios');
const Chat = require('../models/Chat');

const chatbotController = async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post('http://127.0.0.1:5001/generate', { message });
    const reply = response.data.reply;

    // Save to MongoDB
    const chat = new Chat({ message, reply });
    await chat.save();

    res.json({ reply });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to get response from ML model' });
  }
};

module.exports = chatbotController;
