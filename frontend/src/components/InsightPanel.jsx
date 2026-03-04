import styles from '../styles/InsightPanel.module.css';

export default function InsightPanel({ insights }) {
  const cards = [
    {
      icon: '◉',
      label: 'Critical Reception',
      value: insights.criticalReception,
    },
    {
      icon: '↺',
      label: 'Rewatchability',
      value: insights.rewatch,
    },
    {
      icon: '◎',
      label: 'Best For',
      value: insights.targetAudience,
    },
  ].filter((c) => c.value && c.value !== 'N/A');

  if (cards.length === 0) return null;

  return (
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>
        <span className={styles.sectionIcon}>◆</span>
        AI Insights
      </h3>
      <div className={styles.grid}>
        {cards.map((card) => (
          <div key={card.label} className={styles.card}>
            <div className={styles.cardIcon}>{card.icon}</div>
            <div className={styles.cardLabel}>{card.label}</div>
            <div className={styles.cardValue}>{card.value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
