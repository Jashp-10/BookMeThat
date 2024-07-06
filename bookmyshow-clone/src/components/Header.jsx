import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <nav>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/profile" className="nav-link">Profile</Link>
        <div className="logo">App Logo</div>
        <input type="text" className="search-bar" placeholder="Search for a movie..." />
      </nav>
    </header>
  );
};

export default Header;
