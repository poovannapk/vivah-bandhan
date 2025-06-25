# Vivah Bandhan Matrimony Platform

Vivah Bandhan is a modern, AI-powered matrimony web application built with React, Vite, and Node.js. It combines traditional values with advanced technology to help users find their perfect match.

## Features
- User registration and login with modals
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

### Installation
```sh
npm install
```

### Running the App
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

## AI Matchmaking (LangChain)
- Backend ready for LangChain integration for smart recommendations.
- See `backend/ai/matchmaking.ts` for example usage.

## Customization
- Update branding, colors, and features in the `src/` directory.
- Add more AI features as needed.

## License
MIT
