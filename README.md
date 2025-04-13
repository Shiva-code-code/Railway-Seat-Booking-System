# 🚆 Railway Seat Booking System

A full-stack train seat reservation system built using **Next.js**, **Node.js**, **Express**, and **PostgreSQL**. Users can register, log in, and book seats based on smart allocation logic with real-time seat updates.

---

## 🧠 Problem Statement

- The train has **80 seats** in a single coach:
  - **11 rows**: 10 rows with 7 seats, and the last row with 3 seats.
- A user can book **1 to 7 seats at once**.
- Preference is given to **same-row booking**; if not possible, **nearby seats** are chosen.
- Each user must **log in** to book.
- **No double booking** allowed until reset or cancelation.
- Bookings persist for individual users.

---

## 🚀 Tech Stack

| Layer        | Tech Used                  |
|--------------|----------------------------|
| Frontend     | Next.js, Tailwind CSS      |
| Backend      | Node.js, Express.js        |
| Database     | PostgreSQL                 |
| Authentication | JWT                      |
| Hosting      | Vercel (Frontend), AWS EC2 (Backend) |
| Dev Tools    | Ngrok, Postman, Git        |

---

## ✨ Features

- 👤 User Sign Up & Login with JWT
- 📌 Book up to 7 seats with priority logic
- ⛔ Prevents double booking
- 🔁 Reset all seats (admin option)
- 🎯 Responsive UI with clean UX
- ⚠️ Real-time error handling and validations

---

## 📁 Folder Structure

```
/backend
  ├── config/          # Database connection and environment config
  ├── controllers/     # Handles booking and user logic
  ├── middleware/      # Auth middleware (JWT)
  ├── models/          # PostgreSQL models and queries
  ├── routes/          # Express routes for API endpoints
  ├── utils/           # Seat allocation logic and helpers
  ├── app.js           # Main server file
  ├── .env             # Environment variables (not committed)
  └── package.json     # Backend dependencies

/railway-frontend
  ├── pages/           # Next.js pages
  ├── components/      # Reusable UI components
  ├── utils/           # API functions and helpers
  ├── styles/          # Tailwind CSS and global styles
  └── package.json     # Frontend dependencies
```

---

## 🛠️ Setup Instructions

### Backend

```bash
cd backend
npm install
npm start
```

> Configure `.env` with PostgreSQL credentials.

### Frontend

```bash
cd railway-frontend
npm install
npm run dev
```

Open in browser: `http://localhost:3000`

---

## 🗃️ Database Schema

- **Users Table**: `id`, `username`, `email`, `password`
- **Seats Table**: `seat_number`, `row_number`, `is_booked`, `booked_by`
- **Bookings Table**: `id`, `user_id`, `seat_numbers`

---

## 📽️ Demo

🎥 Watch the [Demo Video](https://drive.google.com/file/d/15m_qcu5KQsYNJbKOB4rEywz21tmc7bmq/view?usp=drive_link)
🔗 Deployment pending  
---

## 🙋‍♂️ Author

**Shiva Kumar Hazari**  
📧 shivakumarhazari0@gmail.com  
🔗 [LinkedIn](https://linkedin.com/in/hazarishiva)  
🐙 [GitHub](https://github.com/Shiva-code-code)

---

## 📄 License

This project is licensed under the MIT License.
