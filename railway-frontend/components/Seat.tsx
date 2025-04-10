import React from 'react';

interface SeatProps {
  seatNumber: number;
  isBooked: boolean;
  isSelected: boolean;
  onClick: () => void;
}

const Seat: React.FC<SeatProps> = ({ seatNumber, isBooked, isSelected, onClick }) => {
  const getColor = () => {
    if (isBooked) return 'bg-red-600';
    if (isSelected) return 'bg-yellow-400';
    return 'bg-green-600';
  };

  return (
    <button
      onClick={onClick}
      disabled={isBooked}
      className={`w-10 h-10 m-1 text-white font-bold rounded ${getColor()}`}
    >
      {seatNumber}
    </button>
  );
};

export default Seat;
