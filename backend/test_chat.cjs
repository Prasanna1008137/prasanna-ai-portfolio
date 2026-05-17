const axios = require('axios');

async function testChat() {
  try {
    console.log("Sending chat request...");
    const res = await axios.post('http://localhost:5000/api/chat', { message: "Hello AI!" });
    console.log('Response status:', res.status);
    console.log('Response data:', res.data);
  } catch (err) {
    console.error('Full Error Object:', err);
  }
}

testChat();
