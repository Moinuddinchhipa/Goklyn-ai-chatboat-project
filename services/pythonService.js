const axios = require("axios");

const getChatbotResponse = async (message) => {
  try {
    const response = await axios.post("http://localhost:5001/predict", { message });
    return response.data.response;
  } catch (error) {
    console.error("Error communicating with Python server:", error.message);
    return "Sorry, I couldn't understand that.";
  }
};

module.exports = { getChatbotResponse };
