import styles from './PriceChip.module.css';

export default function PriceChip({ item, compact = false }) {
  const c = compact.toString();
  return (
    <div className={styles.row} data-compact={c}>
      <span className={styles.name} data-compact={c}>{item.name}</span>
      <div className={styles.values}>
        <span className={styles.price} data-compact={c}>{item.price}</span>
        <span className={`${styles.change} ${item.up ? styles.up : styles.down}`} data-compact={c}>
          {item.change}
        </span>
      </div>
    </div>
  );
}
