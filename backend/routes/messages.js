const express = require('express');
const db = require('../db');
const router = express.Router();

// Send a message
router.post('/send', async (req, res) => {
  const { sender_id, receiver_id, content } = req.body;
  if (!sender_id || !receiver_id || !content)
    return res.status(400).json({ message: 'All fields required' });

  try {
    await db.promise().execute(
      'INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)',
      [sender_id, receiver_id, content]
    );
    res.status(201).json({ message: 'Message sent' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get chat history between two users
router.get('/:user1/:user2', async (req, res) => {
  const { user1, user2 } = req.params;
  try {
    const [rows] = await db.promise().query(
      `SELECT * FROM messages 
       WHERE (sender_id = ? AND receiver_id = ?) 
          OR (sender_id = ? AND receiver_id = ?) 
       ORDER BY timestamp ASC`,
      [user1, user2, user2, user1]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
