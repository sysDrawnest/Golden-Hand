# Golden Hands Driving School — Full-Stack App

A pixel-perfect full-stack conversion of the Golden Hands Driving School website.

- **Frontend:** Vite + React 18, Tailwind CSS v3, React Router v6
- **Backend:** Node.js + Express, MongoDB Atlas, JWT Auth, Razorpay, Nodemailer

---

## 📁 Folder Structure

```
Golden Hand/
├── frontend-react/   ← React app (Vite)
├── backend/          ← Express API
└── frontend/         ← Original HTML (reference only)
```

---

## 🚀 Quick Start

### 1. Backend Setup

```bash
cd backend
npm install
cp .env .env.local   # Fill in your real values
npm run dev          # Starts on http://localhost:5000
```

### 2. Create Admin User

```bash
cd backend
npm run seed-admin
# Default: admin@goldenhands.com / Admin@1234
```

### 3. Frontend Setup

```bash
cd frontend-react
npm install
# Edit .env — set VITE_API_URL=http://localhost:5000/api
npm run dev          # Starts on http://localhost:5173
```

---

## ⚙️ Environment Variables

### `backend/.env`
```env
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret
JWT_EXPIRE=7d
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=...
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your@gmail.com
EMAIL_PASS=your_gmail_app_password
CLIENT_URL=http://localhost:5173
ADMIN_EMAIL=admin@goldenhands.com
ADMIN_PASS=Admin@1234
```

### `frontend-react/.env`
```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=rzp_test_...
```

---

## 🌐 API Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/api/auth/register` | — | Register user |
| POST | `/api/auth/login` | — | Login user |
| GET | `/api/auth/me` | User | Get current user |
| POST | `/api/bookings` | User | Create booking |
| GET | `/api/bookings/my` | User | User's bookings |
| GET | `/api/bookings` | Admin | All bookings |
| POST | `/api/contact` | — | Submit contact form |
| POST | `/api/payment/create-order` | User | Create Razorpay order |
| POST | `/api/payment/verify` | User | Verify payment |
| GET | `/api/admin/stats` | Admin | Dashboard stats |
| GET | `/api/admin/bookings` | Admin | All bookings |
| GET | `/api/admin/users` | Admin | All users |
| GET | `/api/admin/messages` | Admin | All contact messages |

---

## 🚢 Deployment

### Frontend → Vercel
```bash
cd frontend-react && npm run build
# Deploy /dist to Vercel — vercel.json handles SPA routing
```

### Backend → Render / Railway
- Set all env variables in the Render dashboard
- Entry: `npm start` (runs `node server.js`)

---

## 📧 Gmail Setup (Nodemailer)

1. Go to Google Account → Security → App Passwords
2. Generate a password for "Mail"
3. Use that in `EMAIL_PASS` (NOT your real Gmail password)
