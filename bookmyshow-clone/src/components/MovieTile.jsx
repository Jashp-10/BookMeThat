import React from 'react';
import { Link } from 'react-router-dom';
import './MovieTile.css'; // Create a CSS file for styling

const MovieTile = ({ movie }) => {
  return (
    <div className="movie-tile">
      <Link to={`/movie/${movie.id}`}>
        <img src={movie.poster} alt={movie.name} className="movie-poster" />
        <h3 className="movie-name">{movie.name}</h3>
        <p className="movie-rating">IMDB Rating: {movie.rating}</p>
      </Link>
    </div>
  );
};

export default MovieTile;
