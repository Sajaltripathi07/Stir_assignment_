import styles from '../styles/SentimentBadge.module.css';

const CONFIG = {
  positive: { label: 'Positive', icon: '▲', className: 'positive' },
  mixed: { label: 'Mixed', icon: '◆', className: 'mixed' },
  negative: { label: 'Negative', icon: '▼', className: 'negative' },
};

export default function SentimentBadge({ classification }) {
  const config = CONFIG[classification] || CONFIG.mixed;

  return (
    <div className={`${styles.badge} ${styles[config.className]}`} aria-label={`Sentiment: ${config.label}`}>
      <span className={styles.icon} aria-hidden="true">{config.icon}</span>
      <span className={styles.label}>{config.label} Reception</span>
    </div>
  );
}
