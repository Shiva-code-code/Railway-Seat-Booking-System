const pool = require('../config/db');

// Book seats (max 7, priority row, fallback closest)
async function bookSeats(req, res) {
  const { numSeats } = req.body;
  const userId = req.user.userId;

  if (!numSeats || numSeats < 1 || numSeats > 7)
    return res.status(400).json({ message: 'You can book between 1 to 7 seats only' });

  try {
    await pool.query('BEGIN');

    // Step 1: Try to find a full group in one row
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

    // Step 2: Fallback if no row has a full group
    if (!selectedSeats.length) {
      const fallback = await pool.query(`
        SELECT seat_number FROM seats
        WHERE is_booked = false
        ORDER BY seat_number
        LIMIT $1
      `, [numSeats]);
      selectedSeats = fallback.rows.map(row => row.seat_number);
    }

    // Step 3: Validate and fail if not enough seats
    if (selectedSeats.length !== numSeats) {
      await pool.query('ROLLBACK');
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    // Step 4: Mark seats as booked
    for (const seat of selectedSeats) {
      await pool.query(`
        UPDATE seats SET is_booked = true, booked_by = $1 WHERE seat_number = $2
      `, [userId, seat]);
    }

    // Step 5: Insert booking record
    await pool.query(`
      INSERT INTO bookings (user_id, seat_numbers, seat_ids) VALUES ($1, $2, $3)
    `, [userId, selectedSeats, selectedSeats]);

    await pool.query('COMMIT');
    res.status(200).json({ message: 'Booking successful', seats: selectedSeats });

  } catch (err) {
    await pool.query('ROLLBACK');
    console.error('Booking failed:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}
