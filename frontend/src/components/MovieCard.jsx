import Image from 'next/image';
import SentimentBadge from './SentimentBadge';
import SentimentMeter from './SentimentMeter';
import CastList from './CastList';
import InsightPanel from './InsightPanel';
import styles from '../styles/MovieCard.module.css';

export default function MovieCard({ movie, insights }) {
  const genreList = movie.genre ? movie.genre.split(', ') : [];
  const ratingBadge = movie.imdbRating && movie.imdbRating !== 'N/A' ? movie.imdbRating : null;

  return (
    <div className={styles.card} aria-label={`Movie details for ${movie.title}`}>
      <div className={styles.heroSection}>
        <div className={styles.posterWrapper}>
          {movie.poster ? (
            <Image
              src={movie.poster}
              alt={`${movie.title} poster`}
              fill
              className={styles.poster}
              sizes="(max-width: 640px) 140px, 200px"
              priority
            />
          ) : (
            <div className={styles.posterFallback}>
              <span>◈</span>
              <span>No Poster</span>
            </div>
          )}
          <div className={styles.posterSheen} aria-hidden="true" />
        </div>

        <div className={styles.movieMeta}>
          <div className={styles.metaTop}>
            {genreList.map((g) => (
              <span key={g} className={styles.genreTag}>{g}</span>
            ))}
          </div>

          <h2 className={styles.movieTitle}>{movie.title}</h2>

          <div className={styles.metaRow}>
            <span className={styles.metaItem}>
              <span className={styles.metaIcon}>◷</span>
              {movie.year}
            </span>
            {movie.runtime && movie.runtime !== 'N/A' && (
              <span className={styles.metaItem}>
                <span className={styles.metaIcon}>▶</span>
                {movie.runtime}
              </span>
            )}
            {movie.rated && movie.rated !== 'N/A' && (
              <span className={styles.ratedBadge}>{movie.rated}</span>
            )}
          </div>

          {ratingBadge && (
            <div className={styles.imdbRating}>
              <span className={styles.imdbStar}>★</span>
              <span className={styles.imdbScore}>{ratingBadge}</span>
              <span className={styles.imdbMax}>/10</span>
              {movie.imdbVotes && movie.imdbVotes !== 'N/A' && (
                <span className={styles.imdbVotes}>{movie.imdbVotes} votes</span>
              )}
            </div>
          )}

          <SentimentBadge classification={insights.sentimentClassification} />

          {movie.director && movie.director !== 'N/A' && (
            <div className={styles.directorRow}>
              <span className={styles.directorLabel}>Directed by</span>
              <span className={styles.directorName}>{movie.director}</span>
            </div>
          )}
        </div>
      </div>

      <div className={styles.body}>
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>◉</span>
            Plot Summary
          </h3>
          <p className={styles.plot}>{movie.plot}</p>
        </section>

        <CastList actors={movie.actors} />

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>✦</span>
            AI Audience Sentiment
          </h3>
          <SentimentMeter score={insights.sentimentScore} classification={insights.sentimentClassification} />
          <p className={styles.sentimentSummary}>{insights.sentimentSummary}</p>

          {insights.audienceHighlights && insights.audienceHighlights.length > 0 && (
            <div className={styles.highlights}>
              {insights.audienceHighlights.map((h, i) => (
                <div key={i} className={styles.highlight}>
                  <span className={styles.highlightBullet}>◈</span>
                  <span>{h}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        <InsightPanel insights={insights} />

        {movie.awards && movie.awards !== 'N/A' && (
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>◆</span>
              Awards
            </h3>
            <p className={styles.awards}>{movie.awards}</p>
          </section>
        )}

        <div className={styles.metaGrid}>
          {movie.language && movie.language !== 'N/A' && (
            <div className={styles.metaGridItem}>
              <span className={styles.metaGridLabel}>Language</span>
              <span className={styles.metaGridValue}>{movie.language}</span>
            </div>
          )}
          {movie.country && movie.country !== 'N/A' && (
            <div className={styles.metaGridItem}>
              <span className={styles.metaGridLabel}>Country</span>
              <span className={styles.metaGridValue}>{movie.country}</span>
            </div>
          )}
          {movie.boxOffice && movie.boxOffice !== 'N/A' && (
            <div className={styles.metaGridItem}>
              <span className={styles.metaGridLabel}>Box Office</span>
              <span className={styles.metaGridValue}>{movie.boxOffice}</span>
            </div>
          )}
          {movie.released && movie.released !== 'N/A' && (
            <div className={styles.metaGridItem}>
              <span className={styles.metaGridLabel}>Released</span>
              <span className={styles.metaGridValue}>{movie.released}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
