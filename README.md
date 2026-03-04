# CineAI — AI Movie Insight Builder

> Enter any IMDb ID and get deep audience sentiment, cast analysis, and AI-generated insights powered by Claude.

---

## Features

- **Movie details** — Title, poster, year, rating, runtime, genre, director, cast
- **Plot summary** — Full plot fetched from OMDb
- **AI Sentiment Analysis** — Claude analyzes the film's metadata and ratings to produce a nuanced audience sentiment summary
- **Sentiment Classification** — Positive / Mixed / Negative with a visual score meter
- **AI Insight Cards** — Critical reception, rewatchability, target audience
- **Responsive design** — Works on desktop, tablet, and mobile
- **Input validation** — IMDb ID format validation with helpful error messages
- **Rate limiting** — API is protected against abuse
- **Graceful error handling** — User-friendly errors for invalid IDs, network failures, missing posters

---

## Tech Stack

### Frontend — `Next.js 14` (React)

- **Next.js** was chosen for its file-based routing, built-in image optimization (important for movie posters), and seamless environment variable handling for Vercel deployment.
- **CSS Modules** for scoped, maintainable styles without a heavy CSS-in-JS runtime.
- **No extra UI libraries** — keeping the bundle lean and the code owned end-to-end.

### Backend — `Node.js` + `Express`

- **Express** is minimal, well-understood, and fast to set up — appropriate for a focused API with a handful of routes.
- **Helmet** for security headers, **cors** for controlled cross-origin access, **express-rate-limit** for abuse prevention.
- **OMDb API** for movie metadata (poster, cast, ratings, plot). Free tier supports the use case.
- **Anthropic Claude API** (`claude-sonnet-4-20250514`) for AI sentiment summarization. Claude produces structured JSON from movie metadata, making parsing reliable.

### Assumptions

1. The OMDb API is used for movie data since IMDb does not offer a public API. The OMDb data is sufficiently rich for the required features.
2. Audience reviews are not directly scraped from IMDb (against their ToS). Instead, Claude infers sentiment from IMDb ratings, vote counts, awards, and genre metadata — producing insights consistent with what real audience data would yield.
3. The Anthropic API key is kept on the backend only, never exposed to the client.
4. Free-tier OMDb returns up to 4 cast members in the `Actors` field — this is displayed as the cast list.

---

## Project Structure

```
ai-movie-insight/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── movieController.js
│   │   ├── middleware/
│   │   │   └── validation.js
│   │   ├── routes/
│   │   │   └── movies.js
│   │   ├── services/
│   │   │   ├── aiService.js
│   │   │   └── omdbService.js
│   │   └── index.js
│   ├── tests/
│   │   └── validation.test.js
│   ├── .env.example
│   ├── jest.config.json
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── CastList.jsx
    │   │   ├── ErrorState.jsx
    │   │   ├── InsightPanel.jsx
    │   │   ├── LoadingState.jsx
    │   │   ├── MovieCard.jsx
    │   │   ├── SearchBar.jsx
    │   │   ├── SentimentBadge.jsx
    │   │   └── SentimentMeter.jsx
    │   ├── lib/
    │   │   ├── api.js
    │   │   └── validation.js
    │   ├── pages/
    │   │   ├── _app.jsx
    │   │   ├── _document.jsx
    │   │   └── index.jsx
    │   └── styles/
    │       ├── globals.css
    │       └── *.module.css
    ├── tests/
    │   └── validation.test.js
    ├── .env.example
    ├── jest.config.json
    ├── next.config.mjs
    └── package.json
```

---

## Setup Instructions

### Prerequisites

- Node.js >= 18
- An [OMDb API key](https://www.omdbapi.com/apikey.aspx) (free tier works)
- An [Anthropic API key](https://console.anthropic.com/)

---

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd ai-movie-insight
```

---

### 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:

```
PORT=4000
FRONTEND_URL=http://localhost:3000
OMDB_API_KEY=your_omdb_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

Start the backend:

```bash
npm run dev       # development (with nodemon)
npm start         # production
```

Backend runs at `http://localhost:4000`

---

### 3. Frontend setup

```bash
cd ../frontend
npm install
cp .env.example .env.local
```

Edit `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

Start the frontend:

```bash
npm run dev       # development
npm run build && npm start   # production
```

Frontend runs at `http://localhost:3000`

---

### 4. Run tests

**Backend:**
```bash
cd backend
npm test
```

**Frontend:**
```bash
cd frontend
npm test
```

---

## API Reference

### `GET /api/movies/:imdbId`

Returns movie details and AI insights.

**Example:**
```
GET /api/movies/tt0133093
```

**Response:**
```json
{
  "movie": {
    "imdbId": "tt0133093",
    "title": "The Matrix",
    "year": "1999",
    "imdbRating": "8.7",
    "actors": "Keanu Reeves, Laurence Fishburne, ...",
    "plot": "...",
    "poster": "https://...",
    ...
  },
  "insights": {
    "sentimentSummary": "...",
    "sentimentClassification": "positive",
    "sentimentScore": 92,
    "audienceHighlights": ["...", "..."],
    "criticalReception": "...",
    "rewatch": "...",
    "targetAudience": "..."
  }
}
```

**Error responses:**
- `400` — Invalid IMDb ID format
- `404` — Movie not found
- `429` — Rate limit exceeded
- `500` — Server error

---

## Deployment

### Frontend → Vercel

1. Push the `frontend/` folder to GitHub
2. Import on [vercel.com](https://vercel.com)
3. Set environment variable: `NEXT_PUBLIC_API_URL=https://your-backend-url`

### Backend → Railway / Render / Heroku

1. Push the `backend/` folder to GitHub
2. Create a new service and connect the repo
3. Set environment variables: `OMDB_API_KEY`, `ANTHROPIC_API_KEY`, `FRONTEND_URL`

---

## Try these IMDb IDs

| Film | IMDb ID |
|---|---|
| The Matrix | `tt0133093` |
| The Dark Knight | `tt0468569` |
| The Shawshank Redemption | `tt0111161` |
| Inception | `tt1375666` |
| Parasite | `tt6751668` |
