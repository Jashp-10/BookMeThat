import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './MoviePage.css';

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [showtimes, setShowtimes] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      const result = await axios.get(`http://localhost:5000/api/movies/${id}`);
      setMovie(result.data);
    };

    const fetchShowtimes = async () => {
      const result = await axios.get(`http://localhost:5000/api/movies/${id}/showtimes`);
      setShowtimes(result.data);
    };

    fetchMovie();
    fetchShowtimes();
  }, [id]);

  return (
    <div className="movie-page">
      {movie && (
        <>
          <img src={movie.poster} alt={movie.title} />
          <h1>{movie.title}</h1>
          <p>{movie.description}</p>
          <h2>Showtimes</h2>
          <div className="showtimes">
            {showtimes.map(showtime => (
              <Link to={`/seating/${movie.id}/${showtime.id}`} key={showtime.id} className="showtime">
                {showtime.time_slot === 0 && 'Morning (9:30 AM - 12:00 PM)'}
                {showtime.time_slot === 1 && 'Afternoon (3:30 PM - 6:00 PM)'}
                {showtime.time_slot === 2 && 'Evening (9:30 PM - 12:00 AM)'}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MoviePage;
