const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

const db = new sqlite3.Database('onlineshop.sqlite');

// Get: get all products
router.get('/', async (req, res) => {
  db.all(
    'SELECT * FROM product',
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows || []);
    }
  );
});

module.exports = router;
