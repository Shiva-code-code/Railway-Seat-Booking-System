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
| Hosting      | Deployment pending         |

---

## ✨ Features

- 👤 User Sign Up & Login with JWT
- 📌 Book up to 7 seats with priority logic
- ⛔ Prevents double booking
- 🔁 Reset all seats (admin option)
- 🎯 Responsive UI with clean UX
- ⚠️ Real-time error handling and validations

---

## 🛠️ Getting Started

### Prerequisites

- Node.js
- PostgreSQL
- Git

### Backend Setup

```bash
cd backend
npm install
npm start
```

Make sure to configure `.env` with PostgreSQL credentials.

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Navigate to: `http://localhost:3000`

---

## 🗃️ Database Schema

- **Users Table**: `id`, `username`, `email`, `password`
- **Seats Table**: `seat_number`, `row_number`, `is_booked`, `booked_by`
- **Bookings Table**: `id`, `user_id`, `seat_numbers`

---

## 📦 Project Structure

```
/backend
  ├── routes/
  ├── controllers/
  ├── config/
  └── app.js

/frontend
  ├── pages/
  ├── components/
  ├── utils/
  └── styles/
```

---

## ✅ Completed Functionality

- [x] Auth with JWT
- [x] Booking logic with fallbacks
- [x] Responsive Next.js UI
- [x] PostgreSQL connection
- [x] Seat reset mechanism
- [ ] Deployment to Vercel / AWS (coming soon)

---

## 🧪 Testing

- ✅ Manual tests via Postman
- ✅ JWT token auth headers
- ✅ Validations for edge cases

---

## 📽️ Demo

🎥 Demo video available upon request  
🔗 Deployment pending  

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙋‍♂️ Author

**Shiva Kumar Hazari**  
📧 shivakumarhazari0@gmail.com  
🔗 [LinkedIn](https://linkedin.com/in/hazarishiva)  
🐙 [GitHub](https://github.com/Shiva-code-code)
