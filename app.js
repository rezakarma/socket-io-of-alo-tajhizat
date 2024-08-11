const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: false
  }));
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: false
    }
  });
// Create 4 separate namespaces for each service
const service1Namespace = io.of('/realtimeBrands');
const categoryNamespace = io.of('/realtimeCategories');
const typeNamespace = io.of('/realtimeTypes');
const service4Namespace = io.of('/service4');

// Require each service file
require('./services/realtimeBrands')(service1Namespace);
require('./services/realtimeCategories')(categoryNamespace);
require('./services/realtimeTypes')(typeNamespace);
// require('./services/service3')(service3Namespace);
// require('./services/service4')(service4Namespace);
app.use(bodyParser.json());
app.post('/addBrand', (req, res) => {
  const data = req.body;
  console.log(data)
  service1Namespace.emit('addBrand', data); // Emit data to connected clients
  res.status(200).json({ message: 'Data received and broadcasted' });
});

app.post('/deleteBrand', (req, res) => {
  const data = req.body;
  service1Namespace.emit('deleteBrand', data); // Emit data to connected clients
  res.status(200).json({ message: 'Data received and broadcasted' });
});

app.post('/updateBrand', (req, res) => {
  const data = req.body;
  service1Namespace.emit('updateBrand', data); // Emit data to connected clients
  res.status(200).json({ message: 'Data received and broadcasted' });
});


app.post('/addCategory', (req, res) => {
  const data = req.body;
  console.log(data) 
  categoryNamespace.emit('addCategory', data); // Emit data to connected clients
  res.status(200).json({ message: 'Data received and broadcasted' });
});

app.post('/deleteCategory', (req, res) => {
  const data = req.body;
  categoryNamespace.emit('deleteCategory', data); // Emit data to connected clients
  res.status(200).json({ message: 'Data received and broadcasted' });
});

app.post('/updateCategory', (req, res) => {
  const data = req.body;
  typeNamespace.emit('updateCategory', data); // Emit data to connected clients
  res.status(200).json({ message: 'Data received and broadcasted' });
});


// web socket for types

app.post('/addType', (req, res) => {
  const data = req.body;
  console.log(data) 
  typeNamespace.emit('addType', data); // Emit data to connected clients
  res.status(200).json({ message: 'Data received and broadcasted' });
});

app.post('/deleteType', (req, res) => {
  const data = req.body;
  console.log(data) 
  typeNamespace.emit('deleteType', data); // Emit data to connected clients
  res.status(200).json({ message: 'Data received and broadcasted' });
});

app.post('/updateType', (req, res) => {
  const data = req.body;
  typeNamespace.emit('updateType', data); // Emit data to connected clients
  res.status(200).json({ message: 'Data received and broadcasted' });
});




server.listen(3002, () => { 
  console.log('Server listening on port 3001');
});