import UrgencyBadge from '../UrgencyBadge/UrgencyBadge';
import { ChevronRight } from '../icons';
import styles from './EventRow.module.css';

export default function EventRow({ e }) {
  return (
    <article className={styles.row} role="button" tabIndex={0}>
      <div
        className={styles.tag}
        style={{
          background: `${e.color}12`,
          border: `1px solid ${e.color}20`,
        }}
      >
        <span className={styles.tagLabel} style={{ color: e.color }}>
          {e.tag.slice(0, 5)}
        </span>
      </div>
      <div className={styles.body}>
        <div className={styles.title}>{e.title}</div>
        <div className={styles.details}>
          <span className={styles.date}>{e.date}</span>
          <UrgencyBadge urgency={e.urgency} />
        </div>
      </div>
      <span className={styles.chevron}>
        <ChevronRight />
      </span>
    </article>
  );
}
