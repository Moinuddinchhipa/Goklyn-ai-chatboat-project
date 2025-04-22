const express = require('express');
const router = express.Router();

// Example basic response
router.post('/message', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Dummy AI reply for now
  const reply = `You said: "${message}"`;

  res.json({ reply });
});

module.exports = router;
