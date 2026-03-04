import axios from 'axios';

const OMDB_BASE_URL = 'https://www.omdbapi.com';

async function fetchFromOmdb(params) {
  const apiKey = process.env.OMDB_API_KEY;

  if (!apiKey) {
    throw new Error('OMDB_API_KEY is not configured.');
  }

  const response = await axios.get(OMDB_BASE_URL, {
    params: {
      ...params,
      apikey: apiKey,
      plot: 'full',
    },
    timeout: 8000,
  });

  const data = response.data;

  if (data.Response === 'False') {
    const err = new Error(data.Error || 'Movie not found.');
    err.status = 404;
    throw err;
  }

  return {
    imdbId: data.imdbID,
    title: data.Title,
    year: data.Year,
    rated: data.Rated,
    released: data.Released,
    runtime: data.Runtime,
    genre: data.Genre,
    director: data.Director,
    writer: data.Writer,
    actors: data.Actors,
    plot: data.Plot,
    language: data.Language,
    country: data.Country,
    awards: data.Awards,
    poster: data.Poster !== 'N/A' ? data.Poster : null,
    ratings: data.Ratings || [],
    imdbRating: data.imdbRating,
    imdbVotes: data.imdbVotes,
    boxOffice: data.BoxOffice,
    type: data.Type,
  };
}

export async function fetchMovieDetails(imdbId) {
  return fetchFromOmdb({ i: imdbId });
}

export async function fetchMovieByTitle(title) {
  return fetchFromOmdb({ t: title });
}
