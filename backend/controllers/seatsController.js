const pool = require('../config/database');

const getSeatsByMovieAndShowtime = async (req, res) => {
  const { movieId, showtimeId } = req.query;

  try {
    const result = await pool.query(
      'SELECT * FROM seats WHERE movie_id = $1 AND showtime_id = $2',
      [movieId, showtimeId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  getSeatsByMovieAndShowtime,
};
