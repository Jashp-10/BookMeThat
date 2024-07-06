import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PaymentPage.css';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { movieId, showtimeId, selectedSeats } = location.state;

  const handlePayment = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      alert('Please log in to book seats.');
      navigate('/');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/bookings', {
        userId: user.id,
        movieId,
        showtimeId,
        seats: selectedSeats,
      });

      // Update localStorage with the new booking (mock for now)
      const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
      bookings.push({
        movieId,
        showtimeId,
        seats: selectedSeats,
      });
      localStorage.setItem('bookings', JSON.stringify(bookings));

      alert('Booking successful!');
      navigate('/profile');
    } catch (error) {
      console.error('Error:', error);
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <div className="payment-page">
      <h1>Payment</h1>
      <div className="payment-details">
        <p>Movie ID: {movieId}</p>
        <p>Showtime ID: {showtimeId}</p>
        <p>Seats: {selectedSeats.join(', ')}</p>
      </div>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default PaymentPage;
