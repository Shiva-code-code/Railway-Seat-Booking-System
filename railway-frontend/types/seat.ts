export interface SeatType {
    id: number;
    seat_number: number;
    row_number: number;
    is_booked: boolean;
    booked_by: number | null;
  }
  