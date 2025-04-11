import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import API from '../utils/api';
import Seat from '../components/Seat';
import { SeatType } from '../types/seat';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [seats, setSeats] = useState<SeatType[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [seatCount, setSeatCount] = useState<number>(1);
  const [bookedSeats, setBookedSeats] = useState<number[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  const fetchSeats = useCallback(async () => {
    try {
      const res = await API.get('/book/seats', {
        headers: { Authorization: token || '' },
      });
      setSeats(res.data as SeatType[]);

    } catch {
      toast.error('Failed to fetch seats');
    }
  }, [token]);

  const handleSelect = (seatNum: number) => {
    if (selected.includes(seatNum)) {
      setSelected(selected.filter((s) => s !== seatNum));
    } else if (selected.length < seatCount) {
      setSelected([...selected, seatNum]);
    } else {
      toast.warning(`You can select only ${seatCount} seats`);
    }
  };

  const handleBook = async () => {
    try {
      const res = await API.post<{ message: string; seats: number[] }>(
        '/book/book-seat',
        { numSeats: seatCount },
        { headers: { Authorization: token || '' } }
      );
      toast.success('Seat successfully booked');
      setBookedSeats(res.data.seats);
      setSelected([]);
      fetchSeats();
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      const msg = err?.response?.data?.message || 'Booking failed';
      toast.error(msg);
    }
  };

  const handleReset = async () => {
    try {
      const res = await API.post<{ message: string }>(
        '/book/reset',
        {},
        { headers: { Authorization: token || '' } }
      );
      toast.success(res.data.message);
      setBookedSeats([]);
      setSelected([]);
      fetchSeats();
    } catch {
      toast.error('Reset failed');
    }
  };

  useEffect(() => {
    const localToken = localStorage.getItem('token');
    setToken(localToken);
    if (!localToken) {
      router.push('/login');
    } else {
      fetchSeats();
    }
  }, [fetchSeats, router]);

  return (
    <div className="min-h-screen p-4 bg-gray-100 flex flex-col lg:flex-row items-center lg:items-start lg:justify-center">
      <div className="max-w-fit p-4 bg-white rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">Ticket Booking</h1>
        <div className="grid grid-cols-7 gap-2 mb-6">
          {seats.map((seat) => (
            <Seat
              key={seat.seat_number}
              seatNumber={seat.seat_number}
              isBooked={seat.is_booked}
              isSelected={selected.includes(seat.seat_number)}
              onClick={() => handleSelect(seat.seat_number)}
            />
          ))}
        </div>
        <div className="flex justify-between gap-4 mt-4">
          <span className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded-xl shadow">
            Booked Seats = {seats.filter((s) => s.is_booked).length}
          </span>
          <span className="bg-green-600 text-white font-semibold px-4 py-2 rounded-xl shadow">
            Available Seats = {seats.filter((s) => !s.is_booked).length}
          </span>
        </div>
      </div>

      <div className="mt-10 lg:mt-28 lg:ml-20 w-full max-w-md flex flex-col items-center gap-4">
        <div className="w-full">
          <label className="block font-medium mb-2">Book Seats</label>
          {bookedSeats.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {bookedSeats.map((seat) => (
                <div
                  key={seat}
                  className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded-xl shadow"
                >
                  {seat}
                </div>
              ))}
            </div>
          )}
          <input
            type="number"
            className={`border w-full px-4 py-2 rounded-xl mb-2 text-lg shadow transition-all duration-200`}
            value={seatCount}
            onChange={(e) =>
              setSeatCount(Math.min(7, Math.max(1, +e.target.value)))
            }
            min={1}
            max={7}
          />
          <button
            onClick={handleBook}
            className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-xl font-semibold shadow"
          >
            Book
          </button>
        </div>
        <button
          onClick={handleReset}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl font-semibold shadow"
        >
          Reset Booking
        </button>
      </div>
    </div>
  );
}
