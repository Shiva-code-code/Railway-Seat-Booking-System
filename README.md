# Railway Seat Booking System

This is a complete Railway Seat Booking System built using **Node.js**, **Express**, **PostgreSQL**, and a **React + Next.js** frontend. Users can register, log in, book 1–7 seats, and reset all bookings. It uses JWT for secure user authentication.

## Table of Contents
1. Features
2. Prerequisites
3. Setup Instructions
4. Running the Application
5. API Endpoints
6. Frontend Features
7. Assumptions

---

## ✅ Features

- Secure user registration and login (with JWT)
- Seat booking UI with max 7 seat selection
- Real-time seat availability
- Responsive layout optimized for desktop & mobile
- Reset all seats for demo/admin use

---

## ⚙️ Prerequisites

Ensure the following are installed:

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm (comes with Node)

---

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/shiva-code-code/railway-seat-booking.git
cd railway-seat-booking
```

### 2. Install server dependencies

```bash
npm install
```

### 3. Setup PostgreSQL

Create the DB and tables:

```bash
createdb railway_db
psql -U your_user -d railway_db -f models/models.sql
```

### 4. Create a .env file in the root directory

```env
DB_USER=your_user
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=railway_db
JWT_SECRET=secret123
ADMIN_API_KEY=admin123
```

---

## 🚀 Running the Application

### 1. Start the backend

```bash
node app.js
```

### 2. Run the frontend

```bash
cd railway-frontend
npm install
npm run dev
```

---

## 📡 API Endpoints

| Method | Endpoint        | Description              | Auth Required |
|--------|------------------|--------------------------|----------------|
| POST   | /auth/register   | Register new user        | No             |
| POST   | /auth/login      | Login and get JWT token  | No             |
| GET    | /book/seats      | Fetch all seat data      | Yes (JWT)      |
| POST   | /book/book-seat  | Book up to 7 seats       | Yes (JWT)      |
| POST   | /book/reset      | Reset all seats          | Yes (JWT)      |

---

## 🖥️ Frontend Features

- Built with Next.js, React, and Tailwind CSS
- Responsive layout for desktop and mobile
- Color-coded buttons:
  - Green = Available
  - Yellow = Selected
  - Red = Booked
- Real-time seat updates after booking

---

## ✅ Assumptions

- JWT expires in 1 day
- Max of 7 seats per booking
- Reset option is admin use only
- Static 7xN seat grid

---

## 📅 Last Updated

2025-04-10
