import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './SeatingPage.css';

const SeatingPage = () => {
  const { movieId, showtimeId } = useParams();
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const result = await axios.get('http://localhost:5000/api/seats', {
          params: {
            movieId,
            showtimeId,
          },
        });
        setSeats(result.data);
      } catch (error) {
        console.error('Error fetching seats:', error);
      }
    };

    fetchSeats();
  }, [movieId, showtimeId]);

  const handleSelectSeat = (row, col) => {
    const seatId = `${row}:${col}`;
    setSelectedSeats(prev =>
      prev.includes(seatId) ? prev.filter(s => s !== seatId) : [...prev, seatId]
    );
  };

  const handleClearSelection = () => {
    setSelectedSeats([]);
  };

  const handleProceedToPayment = () => {
    navigate('/payment', { state: { movieId, showtimeId, selectedSeats } });
  };

  return (
    <div className="seating-page">
      <h1>Select Your Seats</h1>
      <div className="seats-grid">
        {seats.map((seat, index) => (
          <div
            key={index}
            className={`seat ${seat.booked_by ? 'booked' : ''} ${selectedSeats.includes(`${seat.row}:${seat.col}`) ? 'selected' : ''}`}
            onClick={() => !seat.booked_by && handleSelectSeat(seat.row, seat.col)}
          >
            {seat.row}-{seat.col}
          </div>
        ))}
      </div>
      <div className="selection-info">
        <p>Selected Seats: {selectedSeats.length}</p>
        <button onClick={handleClearSelection}>Clear Selection</button>
        <button onClick={handleProceedToPayment}>Proceed to Payment</button>
      </div>
    </div>
  );
};

export default SeatingPage;
