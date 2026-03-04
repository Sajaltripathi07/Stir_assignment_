import styles from '../styles/SentimentMeter.module.css';

export default function SentimentMeter({ score, classification }) {
  const pct = Math.min(100, Math.max(0, score || 50));

  const colorMap = {
    positive: 'var(--positive)',
    mixed: 'var(--mixed)',
    negative: 'var(--negative)',
  };

  const color = colorMap[classification] || colorMap.mixed;

  return (
    <div className={styles.wrapper}>
      <div className={styles.labels}>
        <span className={styles.label}>Audience Score</span>
        <span className={styles.score} style={{ color }}>{pct}%</span>
      </div>
      <div className={styles.track} aria-label={`Sentiment score: ${pct}%`} role="meter" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div
          className={styles.fill}
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <div className={styles.ticks}>
        <span>Negative</span>
        <span>Mixed</span>
        <span>Positive</span>
      </div>
    </div>
  );
}
