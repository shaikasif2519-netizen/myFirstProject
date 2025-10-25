// backend/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messages');

const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;
// ---------------------------------
// const messageRoutes = require('./routes/messages');
// app.use('/api/messages', messageRoutes);
// ----------------------------------

app.use(cors({
  origin: 'http://localhost:5173', // frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // only if you're using cookies or authorization headers
}));
app.use(express.json());

// Public routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);


// Protected test route
app.get('/api/profile', authMiddleware, (req, res) => {
  res.json({ message: 'This is protected data', user: req.user });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
