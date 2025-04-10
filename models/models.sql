CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE seats (
  id SERIAL PRIMARY KEY,
  seat_number INT UNIQUE NOT NULL,
  row_number INT NOT NULL,
  is_booked BOOLEAN DEFAULT FALSE,
  booked_by INT REFERENCES users(id)
);

CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  seat_ids INT[] NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

DO $$
DECLARE
  seat_num INT := 1;
  row_num INT := 1;
BEGIN
  WHILE seat_num <= 80 LOOP
    INSERT INTO seats (seat_number, row_number)
    VALUES (seat_num, row_num);

    seat_num := seat_num + 1;

    IF (seat_num - 1) % 7 = 0 AND seat_num <= 77 THEN
      row_num := row_num + 1;
    ELSIF seat_num > 77 THEN
      row_num := 12;
    END IF;
  END LOOP;
END $$;

ALTER TABLE bookings
ADD COLUMN seat_numbers INTEGER[];
