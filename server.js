// backend/server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");
const Chat = require("./models/Chat"); // Make sure this file exists

// Load env variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
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
    // Save user message
    await Chat.create({ sender: 'user', text: message });

    // Get bot reply from ML server
    const response = await axios.post(process.env.PYTHON_API_URL || "http://127.0.0.1:5001/generate", { message });
    const reply = response.data.reply;

    // Save bot reply
    await Chat.create({ sender: 'bot', text: reply });

    res.json({ reply });
  } catch (error) {
    console.error("💥 Chat error:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
});

// ✅ Get chat history
app.get("/history", async (req, res) => {
  try {
    const history = await Chat.find().sort({ timestamp: 1 });
    res.json(history);
  } catch (err) {
    console.error("❌ Error fetching history:", err);
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
});

// ✅ Clear chat history
app.delete("/clear", async (req, res) => {
  try {
    await Chat.deleteMany({});
    res.status(200).json({ message: "Chat history cleared." });
  } catch (err) {
    res.status(500).json({ error: "Failed to clear chat history" });
  }
});

// ✅ Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
