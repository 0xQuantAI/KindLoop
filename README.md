# KindLoop

A simple volunteer coordination web application. Organizations post volunteer needs, and volunteers sign up to help.

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, Axios, React Router
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Auth:** JWT-based email login

## Quick Start

### Prerequisites

- Node.js 18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Backend

```bash
cd backend
npm install
cp .env.example .env   # Edit .env if needed
npm run seed:admin     # Create admin: admin@kindloop.local / admin123
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

## Default Admin

- **Email:** admin@kindloop.local
- **Password:** admin123

## User Flows

### Volunteers
1. Sign up at /volunteer/signup
2. Browse opportunities at /opportunities
3. Click "I Can Help" to join
4. View dashboard at /volunteer/dashboard

### Organizations
1. Sign up at /org/signup
2. Wait for admin approval
3. Post volunteer needs from dashboard
4. View volunteers who signed up

### Admin
1. Log in at /login (choose Admin)
2. Go to Admin Dashboard
3. Approve organizations, manage requests, mark completed

## API Routes

- `POST /api/volunteers/register` — Volunteer signup
- `POST /api/volunteers/login`
- `GET /api/volunteers/me`
- `POST /api/org/register` — Organization signup
- `POST /api/org/login`
- `GET /api/needs` — List open opportunities
- `GET /api/needs/:id` — Opportunity details
- `POST /api/needs` — Create need (org)
- `GET /api/needs/org/my` — Org's needs
- `POST /api/needs/:id/volunteer` — Volunteer for opportunity
- `POST /api/admin/login`
- `GET /api/admin/volunteers`
- `GET /api/admin/organizations`
- `GET /api/admin/needs`
- `PUT /api/admin/organizations/:id/approve`
- `DELETE /api/admin/needs/:id`
- `PUT /api/admin/needs/:id/complete`
