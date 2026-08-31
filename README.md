# Student Management CRUD Application

A full-stack MERN application for managing student records, featuring JWT authentication and MongoDB migrations.

## Tech Stack

- **Frontend**: React, Vite, Redux Toolkit, React Router, Tailwind CSS
- **Backend**: Node.js, Express.js, Mongoose, migrate-mongo, jsonwebtoken(JWT), bcrypt
- **Database**: MongoDB

---

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd "CRUD Assignement"
```

---

### 2. Backend Setup

```bash
cd backend
```

#### Install dependencies

```bash
npm install
```

#### Configure environment variables

Copy the example env file and fill in your values:

```bash
cp example.env .env
```

Open `.env` and update the values:

```env
DB_URL=mongodb://localhost:27017/student_management   # Your MongoDB connection string
PORT=8000                                              # Port the server runs on
JWT_SECRET_KEY=secretkey                               # Change this to a strong secret
```

#### Run database migrations

```bash
npx migrate-mongo up
```

#### Start the backend server

```bash
npm start
```

The backend will be running at `http://localhost:8000`.

---

### 3. Frontend Setup

Open a **new terminal** and navigate to the frontend folder:

```bash
cd frontend
```

#### Install dependencies

```bash
npm install
```

#### Configure environment variables

Copy the example env file:

```bash
cp .env.example .env
```

Open `.env` and set the backend API URL:

```env
VITE_API_URL=http://localhost:8000
```

> **Note:** If your backend runs on a different port or host, update this value accordingly.

#### Start the frontend dev server

```bash
npm run dev
```

The frontend will be running at `http://localhost:5173` (default Vite port).

---

## Running Both Together

You need **two separate terminal windows** — one for the backend and one for the frontend.

 Terminal 1 (Backend)  `cd backend && npm start` | 
 Terminal 2 (Frontend) `cd frontend && npm run dev`

---