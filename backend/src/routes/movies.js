import { Router } from 'express';
import { getMovieInsightsById, getMovieInsightsByTitle } from '../controllers/movieController.js';
import { validateImdbId } from '../middleware/validation.js';

const router = Router();

// Search by IMDb ID: /api/movies/id/tt0133093
router.get('/id/:imdbId', validateImdbId, getMovieInsightsById);

// Search by title: /api/movies/search/The%20Matrix
router.get('/search/:title', getMovieInsightsByTitle);

export default router;
