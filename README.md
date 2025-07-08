# Vivah Bandhan Matrimony Platform

Vivah Bandhan is a modern, AI-powered matrimony web application built with React, Vite, and Node.js. It combines traditional values with advanced technology to help users find their perfect match.

## Features
- User registration and login with modals
- Social login (Google, Facebook; LinkedIn ready)
- Email verification and password reset
- Profile completion flow after registration/social login
- AI-powered matchmaking (LangChain integration ready)
- Profile management
- Search and filter profiles
- Messaging system
- Admin dashboard
- Responsive, modern UI with Tailwind CSS
- Accessibility and performance tested (Cypress, Jest, Lighthouse CI)

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB (local or Atlas)

### Installation
```sh
npm install
cd backend && npm install
```

### Environment Variables
Create a `.env` file in the `backend/` folder with:
```
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FB_CLIENT_ID=your-facebook-app-id
FB_CLIENT_SECRET=your-facebook-app-secret
MONGO_URI=your-mongodb-uri
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your-jwt-secret
```

### Running the App
- **Backend:**
  ```sh
  cd backend
  npm run dev
  ```
- **Frontend:**
  ```sh
  npm run dev
  ```

### Running Tests
- **Cypress (E2E):**
  ```sh
  npx cypress open
  ```
- **Jest (Unit/Integration):**
  ```sh
  npm test
  ```
- **Lighthouse CI:**
  ```sh
  npx lhci autorun
  ```

## Project Structure
- `src/` — React frontend
- `backend/` — Node.js/Express backend (API, AI integration)
- `cypress/` — E2E tests

## Social Login Setup
- Set up Google and Facebook OAuth apps and update `.env` with your credentials.
- For local dev, set callback URLs to:
  - `http://localhost:5000/api/auth/google/callback`
  - `http://localhost:5000/api/auth/facebook/callback`

## AI Matchmaking (LangChain)
- Backend ready for LangChain integration for smart recommendations.
- See `backend/ai/matchmaking.ts` for example usage.

## Customization
- Update branding, colors, and features in the `src/` directory.
- Add more AI features as needed.

## License
MIT
