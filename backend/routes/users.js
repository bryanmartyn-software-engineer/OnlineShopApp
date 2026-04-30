const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

const db = new sqlite3.Database('onlineshop.sqlite');

// Get: get user with same userId
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  
  db.get(
    'SELECT * FROM user WHERE userId = ?',
    [userId],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!row) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(row);
    }
  );
});

// Post: create new user
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  
  db.run(
    'INSERT INTO user (name, email, password) VALUES (?, ?, ?)',
    [name, email, password],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ userId: this.lastID, message: 'User created successfully' });
    }
  );
});

// Put: update user password, name, or address with same userId
router.put('/:userId', async (req, res) => {
  const { userId } = req.params;
  const { name, password, address } = req.body;
  
  db.run(
    'UPDATE user SET name = ?, password = ?, address = ? WHERE userId = ?',
    [name, password, address, userId],
    function(err) {
        if (err) {
        return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'User updated successfully' });
    }
  );
});

module.exports = router;
