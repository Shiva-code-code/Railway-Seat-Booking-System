const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
require('dotenv').config();

const app = express(); // <-- Initialize first

app.use(cors({ origin: 'http://localhost:3001', credentials: true }));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/book', bookingRoutes);

app.use((req, res) => res.status(404).send('Route not found'));

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
