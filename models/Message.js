const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    userMessage: String,
    botMessage: String,
}, { timestamps: true });

module.exports = mongoose.model('Message', MessageSchema);
