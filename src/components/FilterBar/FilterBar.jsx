import styles from './FilterBar.module.css';

export default function FilterBar({ items, active, onChange }) {
  return (
    <div className={styles.bar} role="tablist">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onChange(item.id)}
          className={styles.chip}
          data-active={active === item.id}
          role="tab"
          aria-selected={active === item.id}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
