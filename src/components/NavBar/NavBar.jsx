import { HomeIcon, ForkIcon, CalendarIcon, PlantIcon, ChatIcon } from '../icons';
import styles from './NavBar.module.css';

const items = [
  { id: "home", label: "Inicio", Icon: HomeIcon },
  { id: "eat", label: "Buen Comer", Icon: ForkIcon },
  { id: "events", label: "Qué Hacer", Icon: CalendarIcon },
  { id: "field", label: "El Campo", Icon: PlantIcon },
  { id: "family", label: "Familia", Icon: ChatIcon, badge: 3 },
];

export default function NavBar({ active, onChange }) {
  return (
    <nav className={styles.nav} aria-label="Navegación principal">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onChange(item.id)}
          className={styles.item}
          data-active={active === item.id}
          aria-label={item.label}
          aria-current={active === item.id ? "page" : undefined}
        >
          <div className={styles.iconWrap}>
            <item.Icon />
          </div>
          <span className={styles.label}>{item.label}</span>
          {item.badge > 0 && (
            <span className={styles.badge} aria-label={`${item.badge} sin leer`}>
              {item.badge}
            </span>
          )}
        </button>
      ))}
    </nav>
  );
}
