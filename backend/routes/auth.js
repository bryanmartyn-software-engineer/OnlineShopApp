const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

const db = new sqlite3.Database('onlineshop.sqlite');

// Login: check if email and password match, return userId
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  db.get(
    'SELECT userId FROM user WHERE email = ? AND password = ?',
    [email, password],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (row) {
        res.json({ userId: row.userId });
      } else {
        res.status(401).json({ error: 'Invalid email or password' });
      }
    }
  );
});

// Register: check if email doesn't exist
router.post('/register', async (req, res) => {
  const { email } = req.body;
  
  db.get(
    'SELECT userId FROM user WHERE email = ?',
    [email],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (row) {
        return res.status(400).json({ error: 'Email already exists' });
      }
      else {
        res.json({ message: 'Email is available' });
      }
    }
  );
});

// Verify: check if password matches
router.post('/verify', async (req, res) => {
  const { userId, password } = req.body;
  
  db.get(
    'SELECT userId FROM user WHERE userId = ? AND password = ?',
    [userId, password],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!row) {
        return res.status(401).json({ error: 'Incorrect password' });
      }
      res.json({ message: 'User is authenticated' });
    }
  );
});

// Edit: check if userId exists
router.post('/edit', async (req, res) => {
  const { userId, name, password, address } = req.body;
  
  db.get(
    'SELECT userId FROM user WHERE userId = ?',
    [userId],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!row) {
        return res.status(404).json({ error: 'User not found' });
      }
      if (!name && !password && !address) {
        return res.status(400).json({ error: 'No fields to update' });
      }

      res.json({ message: 'User exists and can be updated' });
    }
  );
});

module.exports = router;
