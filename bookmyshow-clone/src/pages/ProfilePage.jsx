import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfilePage.css';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      // Fetch bookings for the user from the backend
      const fetchBookings = async () => {
        try {
          const result = await axios.get(`http://localhost:5000/api/bookings/user/${storedUser.id}`);
          setBookings(result.data);
        } catch (error) {
          console.error('Error fetching bookings:', error);
        }
      };
      fetchBookings();
    }
  }, []);

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className="profile-page">
      <h1>{user.email}'s Profile</h1>
      <div className="bookings">
        {bookings.length > 0 ? (
          bookings.map((booking, index) => (
            <div key={index} className="booking">
              <img src={`path/to/movie/poster/${booking.movieId}.jpg`} alt={booking.movieTitle} className="movie-poster" />
              <div className="booking-info">
                <h2>{booking.movieTitle}</h2>
                <p>Showtime ID: {booking.showtimeId}</p>
                <p>Seats: {booking.seats.join(', ')}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No bookings yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
