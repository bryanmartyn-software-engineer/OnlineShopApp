const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { createDatabase } = require('./createDatabase');

const path = require('path');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Namespace: /onlineShop
const onlineShop = io.of('/onlineShop');
app.use(express.json());

// Serve static images from the public folder
app.use('/public', express.static(path.join(__dirname, '../public')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/carts', require('./routes/carts'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/products', require('./routes/products'));
app.use('/api/users', require('./routes/users'));
app.use('/api/wishlist', require('./routes/wishlist'));


//  On connection
onlineShop.on('connection', (socket) => {
  console.log('Connected to /onlineShop');

  // Equivalent to: @socketio.on('client_connected')
  socket.on('client_connected', (data) => {
    console.log('Connection Status:', data.connected);
  });
});

// Start server
const PORT = 5000;
createDatabase().then(() => {
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
});