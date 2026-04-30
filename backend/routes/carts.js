const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

const db = new sqlite3.Database('onlineshop.sqlite');

// Get: get all carts for a specific userId
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  
  db.all(
    'SELECT * FROM cart WHERE userId = ?',
    [userId],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows || []);
    }
  );
});

// Post: create new cart
router.post('/', async (req, res) => {
  const { userId, productId, quantity } = req.body;
  const date = new Date().toISOString();
  
  db.run(
    'INSERT INTO cart (userId, productId, quantity, date) VALUES (?, ?, ?, ?)',
    [userId, productId, quantity, date],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ cartId: this.lastID, message: 'Cart created successfully' });
    }
  );
});

// Put: update cart with same userId and productId
router.put('/', async (req, res) => {
  const { userId, productId, quantity } = req.body;
  const date = new Date().toISOString();
  
  db.run(
    'UPDATE cart SET quantity = ?, date = ? WHERE userId = ? AND productId = ?',
    [quantity, date, userId, productId],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Cart item not found' });
      }
      res.json({ message: 'Cart updated successfully' });
    }
  );
});

// Delete: delete cart with same userId and productId
router.delete('/', async (req, res) => {
  const { userId, productId } = req.body;
  
  db.run(
    'DELETE FROM cart WHERE userId = ? AND productId = ?',
    [userId, productId],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Cart item not found' });
      }
      res.json({ message: 'Cart deleted successfully' });
    }
  );
});

module.exports = router;
