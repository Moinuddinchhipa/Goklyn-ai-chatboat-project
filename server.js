<<<<<<< HEAD
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const Chat = require('./models/Chat'); // <-- Import model
// const axios = require('axios');

// const app = express();
// app.use(cors());
// app.use(express.json());

// // MongoDB Connection
// mongoose.connect('mongodb://127.0.0.1:27017/ai_chatbot')
//   .then(() => console.log("✅ Connected to MongoDB"))
//   .catch(err => console.error("❌ MongoDB connection error:", err));

// // Chat route
// app.post('/chat', async (req, res) => {
//   const { message } = req.body;

//   try {
//     // Save user message
//     await Chat.create({ sender: 'user', text: message });

//     // Get reply from ML server
//     const response = await axios.post('http://127.0.0.1:5001/generate', { message });
//     const reply = response.data.reply;

//     // Save bot response
//     await Chat.create({ sender: 'bot', text: reply });

//     res.json({ reply });
//   } catch (error) {
//     console.error('Error during chat:', error);
//     res.status(500).json({ error: 'Something went wrong.' });
//   }
// });

// // ✅ NEW: History route
// app.get('/history', async (req, res) => {
//   try {
//     const history = await Chat.find().sort({ timestamp: 1 });
//     res.json(history);
//   } catch (err) {
//     console.error("Error fetching history:", err);
//     res.status(500).json({ error: "Failed to fetch chat history" });
//   }
// });

// // ✅ New: Clear chat history
// app.delete('/clear', async (req, res) => {
//   try {
//     await Chat.deleteMany({});
//     res.status(200).json({ message: "Chat history cleared." });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to clear chat history" });
//   }
// });


// app.get('/', (req, res) => {
//   res.send("AI Chatbot Backend is running.");
// });

// app.listen(8000, () => {
//   console.log("Server running on http://localhost:8000");
// });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const Chat = require("./models/Chat"); // Ensure you create this model

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/ai_chatbot", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Root route for health check
app.get("/", (req, res) => {
  res.send("🤖 AI Chatbot Backend is running.");
});

// ✅ Chat route
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    // Save user message to DB
    await Chat.create({ sender: 'user', text: message });

    // Call Python ML server
    const response = await axios.post("http://127.0.0.1:5001/generate", { message });
    const reply = response.data.reply;

    // Save bot reply to DB
    await Chat.create({ sender: 'bot', text: reply });

    res.json({ reply });
  } catch (error) {
    console.error("💥 Chat error:", error);
    res.status(500).json({ error: "Failed to process message." });
  }
});

app.listen(8000, () => {
  console.log("🚀 Server running on http://localhost:8000");
});
=======
// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Chatbot Backend is running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error(err));
>>>>>>> 35dfe3d719b365720bc3ef3deab73d48c372da9a
