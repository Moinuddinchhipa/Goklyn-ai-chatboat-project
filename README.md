# Goklyn-ai-chatboat-project
# 🤖 AI-Powered Chatbot Website

This project is a full-stack AI-powered chatbot web application built using **React.js**, **Node.js**, **MongoDB**, and **OpenAI API**. It allows users to interact with an intelligent chatbot via a modern UI, with backend support for storing and processing chats.

## 🚀 Features

- 🌐 Frontend in React.js with real-time user chat interface
- ⚙️ Backend in Node.js and Express
- 🧠 Integration with OpenAI API for intelligent responses
- 🗃️ MongoDB to store chat history
- 🔐 Environment variable support using `.env`
- 🔁 Modular, scalable codebase

---

## 🔧 Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Moinuddinchhipa/Goklyn-ai-chatboat-project.git
cd Goklyn-ai-chatboat-project

Backend


cd backend
npm install

Frontend


cd ../frontend
npm install

Create a .env file in the backend folder and add:

PORT=5000
MONGO_URI=mongodb://localhost:27017/chatbot
OPENAI_API_KEY=your_openai_api_key_here

Start the backend


cd backend
npm run dev

Start the frontend


cd ../frontend
npm start

Technology	              Description
React.js	              Frontend library
Node.js	                  Backend runtime
Express.js	              Backend framework
MongoDB	                  Database
OpenAI API	              AI chatbot intelligence provider
Dotenv	                  Manage environment variables
Axios	                  API requests from React frontend
