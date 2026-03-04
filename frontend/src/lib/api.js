const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

function isImdbId(input) {
  return /^tt\d{7,8}$/i.test(input.trim());
}

export async function fetchMovieInsights(query) {
  const endpoint = isImdbId(query)
    ? `${API_BASE}/api/movies/id/${encodeURIComponent(query.trim())}`
    : `${API_BASE}/api/movies/search/${encodeURIComponent(query.trim())}`;

  const response = await fetch(endpoint);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to fetch movie data.');
  }

  return data;
}
