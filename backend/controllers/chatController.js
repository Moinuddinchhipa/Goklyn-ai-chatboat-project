// backend/controllers/chatController.js
const Message = require('../models/Message');
const openai = require('openai');  // Assuming OpenAI API is used

// Function to send a message to OpenAI API and get response
const getBotReply = async (userMessage) => {
  const response = await openai.completion.create({
    model: 'text-davinci-003',
    prompt: userMessage,
    max_tokens: 150,
  });
  return response.choices[0].text.trim();
};

// Controller to save and retrieve messages
const sendMessage = async (req, res) => {
  const { userMessage } = req.body;

  try {
    // Get bot's reply
    const botReply = await getBotReply(userMessage);

    // Save to DB
    const newMessage = new Message({
      userMessage,
      botReply,
    });
    await newMessage.save();

    // Send response back to frontend
    res.json({ userMessage, botReply });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send message' });
  }
};

module.exports = { sendMessage };
