import styles from './UrgencyBadge.module.css';

const config = {
  "Mañana": { bg: "#FFF3E0", color: "#E65100", dot: "#E65100" },
  "Esta semana": { bg: "var(--color-olive-pale)", color: "var(--color-olive)", dot: "var(--color-olive)" },
  "Próximamente": { bg: "var(--color-earth-pale)", color: "var(--color-earth)", dot: "var(--color-earth)" },
  "En curso": { bg: "#E3F2FD", color: "#1565C0", dot: "#1565C0" },
};

export default function UrgencyBadge({ urgency }) {
  const c = config[urgency] || config["Próximamente"];
  return (
    <span className={styles.badge} style={{ background: c.bg, color: c.color }}>
      <span className={styles.dot} style={{ background: c.dot }} />
      {urgency}
    </span>
  );
}
