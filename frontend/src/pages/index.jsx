import Head from 'next/head';
import { useState, useCallback } from 'react';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import { fetchMovieInsights } from '../lib/api';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = useCallback(async (imdbId) => {
    setLoading(true);
    setError(null);
    setMovieData(null);
    setSearched(true);

    try {
      const data = await fetchMovieInsights(imdbId);
      setMovieData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <Head>
        <title>CineAI — Movie Insight Builder</title>
      </Head>

      <div className={styles.page}>
        <div className={styles.filmGrain} aria-hidden="true" />
        <div className={styles.gridOverlay} aria-hidden="true" />

        <header className={styles.header}>
          <div className={styles.logoWrapper}>
            <span className={styles.logoIcon}>◈</span>
            <span className={styles.logoText}>CineAI</span>
          </div>
          <p className={styles.tagline}>AI-Powered Movie Intelligence</p>
        </header>

        <main className={styles.main}>
          {!searched && (
            <div className={styles.hero}>
              <div className={styles.heroEyebrow}>Powered by Claude AI</div>
              <h1 className={styles.heroTitle}>
                Decode Every<br />
                <em>Film's Soul</em>
              </h1>
              <p className={styles.heroSubtitle}>
                Enter any movie title or IMDb ID to unlock deep audience sentiment, cast analysis,
                and AI-generated insights for any movie ever made.
              </p>
              <div className={styles.exampleIds}>
                <span className={styles.exampleLabel}>Try:</span>
                {['The Matrix', 'The Dark Knight', 'The Shawshank Redemption'].map((title) => (
                  <button
                    key={title}
                    className={styles.exampleChip}
                    onClick={() => handleSearch(title)}
                  >
                    {title}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className={searched ? styles.searchBarCompact : styles.searchBarHero}>
            <SearchBar onSearch={handleSearch} loading={loading} />
          </div>

          <div className={styles.results}>
            {loading && <LoadingState />}
            {error && <ErrorState message={error} onRetry={() => setError(null)} />}
            {movieData && !loading && (
              <MovieCard movie={movieData.movie} insights={movieData.insights} />
            )}
          </div>
        </main>

        <footer className={styles.footer}>
          <span>Built with Next.js · Node.js · Claude AI · OMDb</span>
        </footer>
      </div>
    </>
  );
}
