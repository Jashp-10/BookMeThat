const pool = require('../config/database');

const createBooking = async (req, res) => {
  const { userId, movieId, showtimeId, seats } = req.body;

  try {
    // Start a transaction
    await pool.query('BEGIN');

    // Insert the booking
    const bookingResult = await pool.query(
      'INSERT INTO bookings (user_id, movie_id, showtime_id, seats) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, movieId, showtimeId, seats]
    );

    // Update the seats table
    for (const seat of seats) {
      const [row, col] = seat.split(':');
      await pool.query(
        'UPDATE seats SET booked_by = $1 WHERE movie_id = $2 AND showtime_id = $3 AND row = $4 AND col = $5',
        [userId, movieId, showtimeId, row, col]
      );
    }

    // Commit the transaction
    await pool.query('COMMIT');

    res.json(bookingResult.rows[0]);
  } catch (error) {
    // Rollback the transaction in case of error
    await pool.query('ROLLBACK');
    res.status(500).json({ message: 'Server error', error });
  }
};

const getBookingsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM bookings WHERE user_id = $1',
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  createBooking,
  getBookingsByUserId,
};
