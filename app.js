const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

dotenv.config();

const app = express();

// ✅ Whitelisted frontend origins (add your deployed and local frontend URLs)
const allowedOrigins = [
  'http://localhost:3001',
  'https://railway-seat-booking-system.vercel.app'
];

// ✅ CORS configuration middleware
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
};

app.use(cors(corsOptions));

// ✅ Handle preflight (OPTIONS) requests explicitly
app.options('*', cors(corsOptions));

// ✅ Middleware to parse incoming JSON
app.use(express.json());

// ✅ Routes
app.use('/auth', authRoutes);
app.use('/book', bookingRoutes);

// ✅ 404 fallback
app.use((req, res) => {
  res.status(404).send('Route not found');
});

// ✅ Centralized error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ message: 'Internal Server Error' });
});

// ✅ Server listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
