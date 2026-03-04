import styles from '../styles/CastList.module.css';

export default function CastList({ actors }) {
  if (!actors || actors === 'N/A') return null;

  const castArray = actors.split(', ').map((name) => name.trim()).filter(Boolean);

  function getInitials(name) {
    return name
      .split(' ')
      .slice(0, 2)
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  }

  function getAvatarColor(name) {
    const colors = [
      '#e8c547', '#4ade80', '#60a5fa', '#f472b6', '#a78bfa',
      '#fb923c', '#34d399', '#f87171',
    ];
    const idx = name.charCodeAt(0) % colors.length;
    return colors[idx];
  }

  return (
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>
        <span className={styles.sectionIcon}>◈</span>
        Cast
      </h3>
      <div className={styles.castGrid}>
        {castArray.map((name) => (
          <div key={name} className={styles.castItem}>
            <div
              className={styles.avatar}
              style={{ background: `${getAvatarColor(name)}18`, borderColor: `${getAvatarColor(name)}40`, color: getAvatarColor(name) }}
              aria-hidden="true"
            >
              {getInitials(name)}
            </div>
            <span className={styles.castName}>{name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
