// const mongoose = require('mongoose');

// const chatSchema = new mongoose.Schema({
//   sender: String,
//   text: String
// }, { timestamps: true }); // ✅ Enables createdAt

// module.exports = mongoose.model('Chat', chatSchema);

const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  sender: {
    type: String,
    enum: ['user', 'bot'],
    required: true
  },
  text: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Chat', chatSchema);
