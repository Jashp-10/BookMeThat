const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Server } = require('socket.io');
const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movies');
const bookingRoutes = require('./routes/bookings');
const seatsRoutes = require('./routes/seats');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/seats', seatsRoutes);

// WebSocket logic
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('reserveSeats', ({ userId, movieId, showtimeId, seats }) => {
    // Emit event to all clients to update seat reservation status
    io.emit('seatsReserved', { userId, movieId, showtimeId, seats, reserved: true });
  });

  socket.on('releaseSeats', ({ userId, movieId, showtimeId, seats }) => {
    // Emit event to all clients to update seat reservation status
    io.emit('seatsReserved', { userId, movieId, showtimeId, seats, reserved: false });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Export io for use in other modules
module.exports.io = io;

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
