require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const canvasRoutes = require('./routes/canvas');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

app.use(cors()); // Enable CORS for all routes

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('draw', (data) => {
    io.emit('draw', data); // Broadcast the 'draw' event to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

// Middleware
app.use(express.json());

// Routes
app.use('/api', canvasRoutes);

// Start the server
server.listen(4000, () => {
  console.log('Server running on port 4000');
});
