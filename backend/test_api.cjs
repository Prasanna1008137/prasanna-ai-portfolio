const axios = require('axios');

async function testLogin() {
  const url = 'http://localhost:5000/api/auth/login';

  try {
    // 1. Invalid email
    try {
      await axios.post(url, { email: 'wrong@gmail.com', password: 'abc' });
    } catch (e) {
      console.log('Test 1 (Invalid Email):', e.response.status, e.response.data.message);
    }

    // 2. Incorrect password
    try {
      await axios.post(url, { email: 'mondiprasanna8@gmail.com', password: 'wrong' });
    } catch (e) {
      console.log('Test 2 (Incorrect Password):', e.response.status, e.response.data.message);
    }

    // 3. Success
    try {
      const res = await axios.post(url, { email: 'mondiprasanna8@gmail.com', password: 'admin123' });
      console.log('Test 3 (Success):', res.status, 'Token exists?', !!res.data.token);
    } catch (e) {
      console.log('Test 3 Error:', e.response?.data || e.message);
    }

  } catch (err) {
    console.error('Fatal Error:', err.message);
  }
}

testLogin();
