const express = require('express');
const router = express.Router();
const seatsController = require('../controllers/seatsController');

router.get('/', seatsController.getSeatsByMovieAndShowtime);

module.exports = router;
