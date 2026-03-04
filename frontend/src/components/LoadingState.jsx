import styles from '../styles/LoadingState.module.css';

const STEPS = [
  { icon: '◈', label: 'Fetching movie data from OMDb' },
  { icon: '◉', label: 'Analyzing audience sentiment' },
  { icon: '✦', label: 'Generating AI insights' },
];

export default function LoadingState() {
  return (
    <div className={styles.wrapper} role="status" aria-label="Loading movie insights">
      <div className={styles.filmReel} aria-hidden="true">
        <div className={styles.reelOuter}>
          <div className={styles.reelInner} />
          {[...Array(8)].map((_, i) => (
            <div key={i} className={styles.reelHole} style={{ '--i': i }} />
          ))}
        </div>
      </div>
      <h3 className={styles.title}>Analyzing Film</h3>
      <div className={styles.steps}>
        {STEPS.map((step, idx) => (
          <div key={idx} className={styles.step} style={{ '--delay': `${idx * 0.4}s` }}>
            <span className={styles.stepIcon}>{step.icon}</span>
            <span className={styles.stepLabel}>{step.label}</span>
            <span className={styles.stepDots}>
              <span /><span /><span />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
