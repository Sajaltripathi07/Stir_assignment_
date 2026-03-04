export function validateImdbId(req, res, next) {
  const { imdbId } = req.params;
  const imdbPattern = /^tt\d{7,8}$/;

  if (!imdbId) {
    return res.status(400).json({ error: 'IMDb ID is required.' });
  }

  if (!imdbPattern.test(imdbId)) {
    return res.status(400).json({
      error: 'Invalid IMDb ID format. Expected format: tt followed by 7-8 digits (e.g., tt0133093).',
    });
  }

  next();
}
