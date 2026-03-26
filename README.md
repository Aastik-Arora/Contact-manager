# MERN Contact Manager

Simple full-stack demo showing CRUD contacts using:
- MongoDB + Mongoose
- Express REST API
- React (Vite) frontend

## Prerequisites
- Node.js (v18+ recommended)
- MongoDB running locally (or update `MONGODB_URI`)

## Setup

### Backend
1. Open a terminal in `contact-manager/backend`
2. Create `.env` (copy from `.env.example`), e.g.:
   - `MONGODB_URI=mongodb://127.0.0.1:27017/contact_manager`
3. Install dependencies (already done if you followed the scaffold):
   - `npm install`
4. Start backend:
   - `npm run dev`

Backend runs at: `http://localhost:5000`

### Frontend
1. Open a terminal in `contact-manager/frontend`
2. Install dependencies:
   - `npm install`
3. Start frontend:
   - `npm run dev`

Frontend runs at: `http://localhost:5173`

## Features
- Create contact (`POST /api/contacts`)
- Read contacts (`GET /api/contacts`)
- Update contact (`PUT /api/contacts/:id`)
- Delete contact (`DELETE /api/contacts/:id`)

