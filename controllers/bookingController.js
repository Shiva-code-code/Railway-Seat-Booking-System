const pool = require('../config/db');

// Book seats (max 7, priority row, fallback closest)
async function bookSeats(req, res) {
  const { numSeats } = req.body;
  const userId = req.user.userId;

  if (!numSeats || numSeats < 1 || numSeats > 7)
    return res.status(400).json({ message: 'You can book between 1 to 7 seats only' });

  try {
    await pool.query('BEGIN');

    const rows = await pool.query(`
      SELECT row_number, array_agg(seat_number ORDER BY seat_number) AS seats
      FROM seats
      WHERE is_booked = false
      GROUP BY row_number
      ORDER BY row_number
    `);

    let selectedSeats = [];

    for (const row of rows.rows) {
      const seats = row.seats;
      for (let i = 0; i <= seats.length - numSeats; i++) {
        const group = seats.slice(i, i + numSeats);
        if (group.length === numSeats) {
          selectedSeats = group;
          break;
        }
      }
      if (selectedSeats.length) break;
    }

    if (!selectedSeats.length) {
      const fallback = await pool.query(`
        SELECT seat_number FROM seats
        WHERE is_booked = false
        ORDER BY seat_number
        LIMIT $1
      `, [numSeats]);
      selectedSeats = fallback.rows.map(row => row.seat_number);
    }

    if (selectedSeats.length !== numSeats) {
      await pool.query('ROLLBACK');
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    for (const seat of selectedSeats) {
      await pool.query(`
        UPDATE seats SET is_booked = true, booked_by = $1 WHERE seat_number = $2
      `, [userId, seat]);
    }

    await pool.query(`
      INSERT INTO bookings (user_id, seat_numbers) VALUES ($1, $2)
    `, [userId, selectedSeats]);

    await pool.query('COMMIT');
    res.status(200).json({ message: 'Booking successful', seats: selectedSeats });

  } catch (err) {
    await pool.query('ROLLBACK');
    console.error('Booking failed:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getAllSeats(req, res) {
  try {
    const result = await pool.query('SELECT * FROM seats ORDER BY seat_number');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch seats' });
  }
}

async function resetAllSeats(req, res) {
  try {
    await pool.query('BEGIN');
    await pool.query(`UPDATE seats SET is_booked = false, booked_by = NULL`);
    await pool.query(`DELETE FROM bookings`);
    await pool.query('COMMIT');
    res.status(200).json({ message: 'All seats reset successfully' });
  } catch (err) {
    await pool.query('ROLLBACK');
    console.error('Reset error:', err);
    res.status(500).json({ message: 'Failed to reset seats' });
  }
}

module.exports = { bookSeats, getAllSeats, resetAllSeats };
