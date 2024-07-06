import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const result = await axios.get('http://localhost:5000/api/movies');
      setMovies(result.data);
    };

    fetchMovies();
  }, []);

  return (
    <div className="home-page">
      <h1>Available Movies</h1>
      <div className="movies">
        {movies.map(movie => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-tile">
            <img src={movie.poster} alt={movie.title} />
            <h2>{movie.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
