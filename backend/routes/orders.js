const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

const db = new sqlite3.Database('onlineshop.sqlite');

// Get: get all orders with same userId and merge orderitems with same orderId in a list
router.get('/', async (req, res) => {
  const { userId } = req.query;
  
  db.all(
    `SELECT o.orderId, o.userId, o.orderDate, o.totalAmount, o.address,
            json_group_array(json_object('orderId', oi.orderId, 'productId', oi.productId, 'quantity', oi.quantity)) as items
     FROM "order" o
     LEFT JOIN orderitem oi ON o.orderId = oi.orderId
     WHERE o.userId = ?
     GROUP BY o.orderId`,
    [userId],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      const formattedRows = rows.map(row => ({
        ...row,
        items: row.items ? JSON.parse(row.items).filter(item => item.orderId !== null) : []
      }));
      
      res.json(formattedRows || []);
    }
  );
});

// Post: create order and orderitems
router.post('/', async (req, res) => {
  const { userId, totalAmount, address, items } = req.body;
  const orderDate = new Date().toISOString();
  
  db.run(
    'INSERT INTO "order" (userId, orderDate, totalAmount, address) VALUES (?, ?, ?, ?)',
    [userId, orderDate, totalAmount, address],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      const orderId = this.lastID;
      let completed = 0;
      let hasError = false;
      
      if (!items || items.length === 0) {
        return res.json({ orderId, message: 'Order created successfully' });
      }
      
      items.forEach(item => {
        db.run(
          'INSERT INTO orderitem (orderId, productId, quantity) VALUES (?, ?, ?)',
          [orderId, item.productId, item.quantity],
          (err) => {
            if (err && !hasError) {
              hasError = true;
              return res.status(500).json({ error: err.message });
            }
            completed++;
            if (completed === items.length && !hasError) {
              res.json({ orderId, message: 'Order created successfully with items' });
            }
          }
        );
      });
    }
  );
});

module.exports = router;
