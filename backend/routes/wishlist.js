const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

const db = new sqlite3.Database('onlineshop.sqlite');

// Get: get all wishlist items for a specific userId
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  db.all(
    'SELECT * FROM wishlist WHERE userId = ?',
    [userId],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows || []);
    }
  );
});

// Post: create new wishlist item
router.post('/', async (req, res) => {
  const { userId, productId } = req.body;
  const date = new Date().toISOString();
  
  db.run(
    'INSERT INTO wishlist (userId, productId, date) VALUES (?, ?, ?)',
    [userId, productId, date],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ wishlistId: this.lastID, message: 'Item added to wishlist' });
    }
  );
});

// Delete: delete wishlist item with same userId and productId
router.delete('/', async (req, res) => {
  const { userId, productId } = req.body;
  
  db.run(
    'DELETE FROM wishlist WHERE userId = ? AND productId = ?',
    [userId, productId],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Wishlist item not found' });
      }
      res.json({ message: 'Item removed from wishlist' });
    }
  );
});

module.exports = router;
