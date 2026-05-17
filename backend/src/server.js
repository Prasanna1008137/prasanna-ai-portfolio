const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the AI Portfolio Management System API' });
});

// We will add routes here
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api', require('./routes/portfolioRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
