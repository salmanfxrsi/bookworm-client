# 📚 BookWorm Platform

A full-stack **Personalized Book Recommendation & Reading Tracker Application** built as part of the **Programming Hero – Web Instructor Hiring Task**.

BookWorm helps users discover books, track their reading progress, write reviews, and receive personalized recommendations, while providing admins with full control over books, users, genres, and content moderation.

---

## 🚀 Live Demo

- **Live Site:** [https://bookworm-client-eta.vercel.app/](https://your-live-link.vercel.app)

---

## 🔐 Test Credentials

### Admin Account

- **Email:** [admin@bookworm.com](mailto:admin@bookworm.com)
- **Password:** admin123

### User Account (Optional)

- **Email:** [user@bookworm.com](mailto:user@bookworm.com)
- **Password:** user123

---

## 🛠️ Tech Stack

### Frontend (Client)

- Next.js (App Router)
- React
- Tailwind CSS
- Axios

### Deployment

- Frontend: Vercel
- Backend: Render / Railway

---

## 👥 User Roles

### 👤 Normal User

- Secure registration & login
- Browse books with search & filters
- Add books to personal shelves:

  - Want to Read
  - Currently Reading (with progress tracking)
  - Read

- Write reviews and rate books
- View personalized book recommendations
- Watch embedded YouTube tutorials

### 🛡️ Admin

- Dashboard with overview stats
- Manage users (promote/demote roles)
- Add, edit, and delete books
- Manage book genres
- Moderate user reviews (approve/delete)
- Manage tutorial video links

---

## 🔐 Authentication & Authorization

- Server-side authentication using **JWT**
- Passwords hashed with **bcrypt**
- Role-based access control (Admin / User)
- All routes are protected
- Automatic redirection:

  - Admin → Admin Dashboard
  - User → My Library

---

## 📚 Core Features

### 📖 Book Management (Admin)

- Create, update, delete books
- Upload and manage book cover images
- Assign books to genres

### 🗂️ Genre Management (Admin)

- Add and edit genres
- Ensure all books belong to a genre

### ✍️ Review System

- Users submit reviews with ratings (1–5)
- Reviews remain **pending** until admin approval
- Only approved reviews are visible publicly

### 📊 Reading Tracker

- Track reading progress for current books
- Automatically update reading status

### 🤖 Personalized Recommendations

- Based on:

  - User’s read genres
  - Ratings given by the user
  - Popular books with high community ratings

- Fallback recommendations for new users

---

## ⚠️ Error Handling & UX

- Graceful error messages
- Loading states & spinners
- Fully responsive design (mobile, tablet, desktop)
- No console or deployment errors

---

## 🧪 Local Development

### 1️⃣ Clone Repository

```bash
git clone https://github.com/salmanfxrsi/bookworm-client.git
```

### 3️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 📦 GitHub Commits

- Meaningful, incremental commits
- Clear commit messages following best practices

---

## 🎯 Purpose of This Project

This project demonstrates:

- Industry-standard MERN architecture
- Clean backend folder structure
- Secure authentication & role management
- Beginner-friendly, teachable code style
- Real-world product thinking

Built with the mindset of a **Web Instructor**, focusing on clarity, scalability, and best practices.

---

## 🙏 Acknowledgment

Built as part of the **Programming Hero Web Instructor Hiring Process**.

> "Code with clarity. Teach with empathy. Build with purpose." 💙
