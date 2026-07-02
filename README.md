# Homigo — Rental Management Platform

A full-stack web application that helps PG owners manage their properties — rooms, tenants, rent, and complaints — through a clean admin dashboard. Tenants get their own portal to track rent and raise complaints.

🔗 **Live Demo:** [homigo.vercel.app](https://homigo-sage.vercel.app/)
---

## What it does

**Admin:**
- Add and manage rooms with live occupancy tracking
- Add tenants and send them invite links to set their own passwords
- Track rent records and mark payments
- View and resolve tenant complaints
- Analytics dashboard with rent collection trends and occupancy stats

**Tenant:**
- View assigned room and rent history
- Raise and track complaints
- Update profile and change password

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, Tailwind CSS, Vite |
| Backend | Node.js, Express.js |
| Database | MySQL (TiDB Cloud) |
| Auth | JWT (HTTP-only cookies) |
| Validation | Zod |
| Email | NodeMailer (dev), Brevo API (prod) |
| Security | Helmet.js, express-rate-limit |

---

## How it works

- **Multi-tenant SaaS** — each PG owner's data is isolated by `pg_id`
- **Role-based auth** — admins and tenants have separate login flows and dashboards
- **Invite-based onboarding** — when admin adds a tenant, a time-limited invite link is sent to their email to set their own password
- **Dynamic occupancy** — room availability is calculated in real-time via SQL `COUNT()` joins, no redundant columns
- **Token-based flows** — both invite and forgot password use `crypto.randomBytes()` tokens stored in DB with expiry, cleared after use
- **Dual email provider** — NodeMailer with Gmail for local development, Brevo HTTP API for production (Render blocks SMTP ports on free tier)

---

## Local Setup

### Prerequisites

- Node.js v18+
- MySQL database (local or TiDB Cloud)
- Gmail account with App Password enabled

### Clone the repo

```bash
git clone https://github.com/your-username/PG-Management-System.git
cd PG-Management-System
```

### Backend setup

```bash
cd pg-backend
npm install
```

Create a `.env` file (refer `.env.example`):

```env
PORT=5000
DB_HOST=your_db_host
DB_PORT=4000
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=pg_management
JWT_SECRET=your_jwt_secret
FRONTEND_ORIGIN=http://localhost:5173
NODE_ENV=development
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_app_password
BREVO_API_KEY=your_brevo_api_key
BREVO_SENDER_EMAIL=your_verified_sender_email
```

Import the schema:

```bash
# Run sql/schema.sql in your MySQL client to create all tables
```

Start the server:

```bash
npm start
```

### Frontend setup

```bash
cd frontend
npm install
npm run dev
```

---

## Project Structure

```
PG-Management-System/
├── pg-backend/
│   ├── middleware/
│   │   ├── AppError.js
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   ├── rateLimiter.js
│   │   ├── tenantAuth.js
│   │   └── validate.js
│   ├── routes/
│   │   ├── adminAnalytics.js
│   │   ├── auth.js
│   │   ├── complaints.js
│   │   ├── rent.js
│   │   ├── rooms.js
│   │   ├── tenantAuth.js
│   │   ├── tenantCommonRoute.js
│   │   ├── tenantComplaint.js
│   │   ├── tenants.js
│   │   └── testEmail.js
│   ├── schemas/
│   │   ├── authSchemas.js
│   │   ├── rentSchemas.js
│   │   ├── roomSchemas.js
│   │   └── tenantSchemas.js
│   ├── utils/
│   │   ├── adminOtp.js
│   │   ├── email.js
│   │   ├── otp.js
│   │   └── password.js
│   ├── sql/
│   │   └── schema.sql
│   ├── db.js
│   └── server.js
│
└── frontend/
    └── src/
        ├── components/
        │   ├── layout/       # Sidebar, TenantSidebar, Topbar
        │   └── ui/           # Card, HomeButton, Input, Modal, Select
        ├── contexts/
        │   └── AuthContext.jsx
        ├── hooks/
        │   ├── useAuth.js
        │   └── useFetch.js
        ├── pages/
        │   ├── admin/        # Dashboard, Rooms, Tenants, Rent, Complaints, Analytics
        │   └── tenant/       # TenantDashboard, MyRent, Complaints, Profile
        ├── routes/
        │   └── AppRoutes.jsx
        └── services/         # analyticsService, roomService, tenantService, rentService...
```

---

## Known Limitations

- Render free tier spins down after 15 minutes of inactivity — first request after idle may be slow
- No pagination on tenant and room lists yet
- Email sender domain not verified — currently using Brevo's default sender