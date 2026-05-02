const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();
const fs = require('fs');
const path = require('path');

const db = new sqlite3.Database('onlineshop.sqlite');

// Get: get all products
router.get('/', async (req, res) => {
  db.all(
    'SELECT * FROM product',
    [],
    async (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      const enhancedRows = await Promise.all(rows.map(async (row) => {
        const images = [];
        // Get absolute path to the project root (backend/routes/.. /.. )
        const projectRoot = path.resolve(__dirname, '..', '..');
        // Ensure photoLocation is a relative path from project root
        const relativeLocation = row.photoLocation.startsWith('/') ? row.photoLocation.substring(1) : row.photoLocation;
        const fullPath = path.join(projectRoot, relativeLocation);
        
        if (fs.existsSync(fullPath)) {
          const files = fs.readdirSync(fullPath);
          files.forEach(file => {
            if (file.match(/\.(png|jpe?g|gif|webp)$/i)) {
              // Ensure the returned path starts with a slash for the frontend
              const imagePath = path.join('/', relativeLocation, file).replace(/\\/g, '/');
              images.push(imagePath);
            }
          });
        }
        
        return {
          ...row,
          images: images.length > 0 ? images : [row.activeThumbnail]
        };
      }));

      res.json(enhancedRows);
    }
  );
});

module.exports = router;
