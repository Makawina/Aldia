import styles from './SectionTitle.module.css';

export default function SectionTitle({ children, count, sub, onAction }) {
  return (
    <div className={styles.wrapper}>
      <div>
        <h2 className={styles.title}>{children}</h2>
        {sub && <span className={styles.sub}>{sub}</span>}
      </div>
      {count && (
        <button onClick={onAction} className={styles.action}>
          Ver todos &rarr;
        </button>
      )}
    </div>
  );
}
