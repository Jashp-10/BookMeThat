const pool = require('../config/database');

const getAllMovies = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM movies');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const getMovieById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM movies WHERE id = $1', [id]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const getShowtimesByMovieId = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM showtimes WHERE movie_id = $1', [id]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  getShowtimesByMovieId,
};
