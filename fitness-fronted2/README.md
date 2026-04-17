# FitPulse Frontend

A modern, premium React frontend for the FitPulse fitness tracking application.

## Project Structure

```
fitness-frontend/
├── public/
│   └── index.html                  # Root HTML shell
├── src/
│   ├── index.js                    # React entry point
│   ├── App.js                      # Root component — routing & auth state
│   │
│   ├── utils/
│   │   ├── api.js                  # API base URL, authFetch, session helpers
│   │   └── helpers.js              # Date formatter, activity type icons/list
│   │
│   ├── styles/
│   │   ├── global.css              # CSS variables, reset, mesh bg, animations
│   │   ├── components.css          # Navbar, buttons, forms, modal, toast
│   │   └── pages.css               # Landing, auth, dashboard, cards
│   │
│   ├── components/
│   │   ├── Navbar.js               # Top navigation bar
│   │   ├── Toast.js                # Toast notification stack
│   │   ├── ActivityCard.js         # Single activity card with metrics
│   │   ├── RecommendationCard.js   # AI insight card
│   │   ├── LogActivityModal.js     # Modal form to log a new activity
│   │   └── RecommendationModal.js  # Modal to fetch & show AI coaching
│   │
│   └── pages/
│       ├── Landing.js              # Public hero / features page
│       ├── Login.js                # Login form
│       ├── Register.js             # Register form (auto-login on success)
│       └── Dashboard.js            # Authenticated dashboard with tabs
│
└── package.json
```

## API Endpoints Used

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Login, returns JWT |
| GET  | `/api/activities` | Fetch user activities (JWT required) |
| POST | `/api/activities` | Log a new activity (JWT required) |
| GET  | `/api/recommendations/user/{userId}` | All recommendations for user |
| POST | `/api/recommendations/generate/{userId}/{activityId}` | Generate AI recommendation |

## Prerequisites

- Node.js 18+
- The Spring Boot backend running on **http://localhost:8080**

## Getting Started

### 1. Install dependencies
```bash
cd fitness-frontend
npm install
```

### 2. Start the development server
```bash
npm start
```
Opens at **http://localhost:3000** — requests to `/api/*` are proxied to `http://localhost:8080` automatically (see `"proxy"` in `package.json`).

### 3. Build for production
```bash
npm run build
```
Output is in the `build/` folder — serve it with any static host or drop it into Spring Boot's `src/main/resources/static/`.

## Design System

| Token | Value |
|-------|-------|
| `--bg` | `#070710` deep-space black |
| `--cyan` | `#00f5d4` primary action / success |
| `--coral` | `#ff6b6b` calories / error / accent |
| `--violet` | `#8b5cf6` AI / secondary accent |
| `--muted` | `#7070a0` subtle text |
| Font (display) | Syne 800 |
| Font (body) | Plus Jakarta Sans |

## Changing the Backend URL

Edit `src/utils/api.js`:
```js
export const API_BASE = 'http://your-backend-host:8080';
```
