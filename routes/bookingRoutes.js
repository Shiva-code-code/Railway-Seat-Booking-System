const express = require('express');
const { bookSeats, getAllSeats, resetAllSeats } = require('../controllers/bookingController');
const authenticateJWT = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/seats', getAllSeats);
router.post('/book-seat', authenticateJWT, bookSeats);
router.post('/reset', resetAllSeats); // Optional: Admin only

module.exports = router;
