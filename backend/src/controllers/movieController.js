import { fetchMovieDetails, fetchMovieByTitle } from '../services/omdbService.js';
import { generateMovieInsights } from '../services/aiService.js';

export async function getMovieInsightsById(req, res, next) {
  const { imdbId } = req.params;

  try {
    const movieData = await fetchMovieDetails(imdbId);
    const insights = await generateMovieInsights(movieData);

    res.json({ movie: movieData, insights });
  } catch (err) {
    next(err);
  }
}

export async function getMovieInsightsByTitle(req, res, next) {
  const { title } = req.params;

  try {
    const movieData = await fetchMovieByTitle(decodeURIComponent(title));
    const insights = await generateMovieInsights(movieData);

    res.json({ movie: movieData, insights });
  } catch (err) {
    next(err);
  }
}
