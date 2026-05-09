# Vivah Bandhan

Vivah Bandhan is a full-stack matrimony web application built with React, Vite, Tailwind CSS, Express, and MongoDB. It includes user authentication, profile flows, profile search, Google location autocomplete, social login hooks, and a separate business owner admin console.

## Features

- User registration and login
- Global login and create-account modals
- JWT authentication with persistent sessions
- Google and Facebook OAuth routes
- Complete-profile flow for new users
- Profile search and filtering
- Google Places location input for location search
- User dashboard, profile, matches, messages, pricing, and success stories pages
- Separate admin login at `/admin/login`
- Admin dashboard at `/admin` with user, sales, subscription, moderation, and engagement reports
- Admin signout from the admin sidebar
- Express API with MongoDB persistence
- Swagger UI available at `/api-docs`

## Tech Stack

Frontend:

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- Recharts
- Lucide icons

Backend:

- Node.js
- Express
- MongoDB with Mongoose
- JSON Web Tokens
- Passport Google OAuth
- Passport Facebook OAuth
- Nodemailer and Twilio integration placeholders

## Project Structure

```text
project/
  src/                 React frontend
  backend/             Express API server
  backend/routes/      API route handlers
  backend/controllers/ Backend controller logic
  backend/models/      Mongoose models
  backend/middleware/  Auth middleware
  public/              Static frontend assets
```

## Prerequisites

- Node.js 18 or newer
- npm
- MongoDB local instance or MongoDB Atlas database

## Installation

Install frontend dependencies:

```bash
npm install
```

Install backend dependencies:

```bash
cd backend
npm install
```

## Environment Setup

Create a frontend `.env` file in the project root:

```env
VITE_GOOGLE_MAPS_API_KEY=your-google-maps-browser-api-key
```

Create a backend `.env` file in `backend/`:

```env
PORT=5000
FRONTEND_URL=http://localhost:5173
MONGO_URI=mongodb://127.0.0.1:27017/vivah-bandhan
JWT_SECRET=replace-with-a-long-random-secret

ADMIN_EMAILS=ajithpoovanna40@gmail.com
ADMIN_PASSWORD=Admin@12345

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

FB_CLIENT_ID=
FB_CLIENT_SECRET=
FACEBOOK_CALLBACK_URL=http://localhost:5000/api/auth/facebook/callback

EMAIL_USER=
EMAIL_PASS=

TWILIO_SID=
TWILIO_AUTH=
TWILIO_FROM=
```

Use `backend/.env.example` and `.env.example` as templates. Do not commit real secrets.

## Running Locally

Start the backend:

```bash
cd backend
npm run dev
```

Start the frontend in another terminal:

```bash
npm run dev
```

Local URLs:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`
- API docs: `http://localhost:5000/api-docs`

The Vite dev server proxies `/api` requests to `http://localhost:5000`.

## Admin Login

Open:

```text
http://localhost:5173/admin/login
```

Default local admin credentials:

```text
Email: ajithpoovanna40@gmail.com
Password: Admin@12345
```

The admin email must exist in `ADMIN_EMAILS`, and the password is read from `ADMIN_PASSWORD` in `backend/.env`. Restart the backend after changing either value.

For production, change the default password and use a strong `JWT_SECRET`.

## Social Login Setup

Google OAuth callback:

```text
http://localhost:5000/api/auth/google/callback
```

Facebook OAuth callback:

```text
http://localhost:5000/api/auth/facebook/callback
```

Add the matching client IDs and secrets to `backend/.env`. If OAuth credentials are empty, the normal email/password login still works.

## Google Location Search

Set this in the root `.env`:

```env
VITE_GOOGLE_MAPS_API_KEY=your-google-maps-browser-api-key
```

Enable the Google Maps JavaScript API and Places API for that key. If the key is missing, the location field falls back to a normal text input.

## Useful Scripts

Frontend:

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

Backend:

```bash
cd backend
npm run dev
npm start
npm run check
```

`npm --prefix backend run check` validates backend JavaScript syntax for the main server and key routes.

## Common Issues

Port `5000` already in use:

- Another backend process is running.
- Stop the existing process or change `PORT` in `backend/.env`.

Admin login says invalid business owner password:

- Confirm `ADMIN_PASSWORD` in `backend/.env`.
- Restart the backend after changing `.env`.
- Use `/admin/login`, not the normal user login modal.

Admin email is not configured:

- Add the email to `ADMIN_EMAILS` in `backend/.env`.
- Multiple admin emails can be comma-separated.
- Restart the backend.

Registration returns a database error:

- Confirm `MONGO_URI` is valid.
- Make sure MongoDB is running.
- Restart the backend after changing database settings.

## Production Notes

- Replace all default secrets and passwords.
- Use a managed MongoDB database.
- Set `FRONTEND_URL` to the deployed frontend URL.
- Configure OAuth callback URLs for the production domain.
- Serve the frontend build through a production host or CDN.
- Run the backend behind HTTPS and a process manager.

## License

MIT
