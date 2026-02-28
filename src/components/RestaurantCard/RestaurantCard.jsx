import { catIcons } from '../../data/restaurants';
import { StarIcon, HeartIcon } from '../icons';
import styles from './RestaurantCard.module.css';

export default function RestaurantCard({ r }) {
  return (
    <article className={styles.card}>
      <div
        className={styles.icon}
        style={{
          background: `${r.color}12`,
          border: `1px solid ${r.color}20`,
        }}
      >
        {catIcons[r.cat] || "🍽️"}
      </div>
      <div className={styles.body}>
        <div className={styles.name}>{r.name}</div>
        <div className={styles.type}>{r.type} · {r.price}</div>
        <div className={styles.zone}>{r.zone}, Albacete</div>
        {r.note && <div className={styles.note}>📝 {r.note}</div>}
      </div>
      <div className={styles.meta}>
        <div className={styles.rating}>
          <StarIcon />
          {r.rating}
        </div>
        {r.fav && <HeartIcon size={18} filled color="var(--color-red)" />}
      </div>
    </article>
  );
}
