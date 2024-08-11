module.exports = (namespace) => {
    namespace.on('connection', (socket) => {
      console.log('Client connected to service 1');
  
      // Emit data to clients every 5 seconds
      // setInterval(() => {
      //   socket.emit('infoData', { message: 'Hello from service 1!' });
      // }, 5000);
  
      // Handle data sent from Next.js app
      namespace.on('dataFromNextJs', (data) => {
        console.log('Received data from Next.js app:', data);
        socket.emit('addBrand', data);
      });

      const express = require('express');
      const router = express.Router();
      router.post('/receive-data', (req, res) => {
        const data = req.body;
        namespace.emit('receiveData', data); // Emit data to connected clients
        res.status(200).json({ message: 'Data received and broadcasted' });
      });
      
    });
  };