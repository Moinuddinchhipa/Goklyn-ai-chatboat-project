// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const chatRoutes = require('./routes/chatRoutes');  // Import the routes

const app = express();

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));  // 🔄 Replace this for local frontend access
app.use(express.json());

// Routes
app.use('/api/chat', chatRoutes);  // Use the chatRoutes for /api/chat endpoint
app.get('/', (req, res) => res.send('Chatbot Backend is running'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
