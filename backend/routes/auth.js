// backend/routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  console.log("Incoming body:", req.body);//delete
  const { userName,userId, email,mobile, password } = req.body;
  if (!userName || !userId || !email || !mobile || !password ) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if user already exists
    const [existing] = await db.promise().query('SELECT * FROM users WHERE email = ? OR mobile = ?', [email, mobile]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Insert into DB
    await db.promise().execute(
      'INSERT INTO users (user_name, user_id, email, mobile, password) VALUES (?, ?, ?, ?, ?)',
      [userName, userId, email, mobile, hashed]
    );

    res.status(201).json({ message: 'User created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login through email
router.post('/email', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'Email and password required' });
  try {
    const [rows] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const user = rows[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
//login throug mobile
router.post('/login', async (req, res) => {
  const { mobile, password } = req.body;
  if (!mobile || !password)
    return res.status(400).json({ message: 'Mobile and password required' });
  try {
    const [rows] = await db.promise().query('SELECT * FROM users WHERE mobile = ?', [mobile]);
    if (rows.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const user = rows[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT
    const token = jwt.sign(
      { userId: user.id, mobile: user.mobile },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
