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

---

## Try these IMDb IDs

| Film | IMDb ID |
|---|---|
| The Matrix | `tt0133093` |
| The Dark Knight | `tt0468569` |
| The Shawshank Redemption | `tt0111161` |
| Inception | `tt1375666` |
| Parasite | `tt6751668` |
