import { useState, useMemo } from 'react';
import { events } from '../../data/events';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import FilterBar from '../../components/FilterBar/FilterBar';
import EventRow from '../../components/EventRow/EventRow';
import UrgencyBadge from '../../components/UrgencyBadge/UrgencyBadge';
import styles from './EventsScreen.module.css';

const tags = [
  { id: "todos", label: "Todos" },
  { id: "Antigüedades", label: "🏺 Antigüedades" },
  { id: "Gastronomía", label: "🍷 Gastronomía" },
  { id: "Campo", label: "🌾 Campo" },
  { id: "Cultura", label: "🎨 Cultura" },
];

export default function EventsScreen() {
  const [activeTag, setActiveTag] = useState("todos");

  const filtered = useMemo(() => {
    if (activeTag === "todos") return events;
    return events.filter(e => e.tag === activeTag);
  }, [activeTag]);

  // Group by urgency
  const grouped = useMemo(() => {
    const groups = {};
    filtered.forEach(e => {
      if (!groups[e.urgency]) groups[e.urgency] = [];
      groups[e.urgency].push(e);
    });
    return groups;
  }, [filtered]);

  return (
    <div>
      <SectionTitle>Qué Hacer</SectionTitle>

      <FilterBar items={tags} active={activeTag} onChange={setActiveTag} />

      {Object.entries(grouped).map(([urgency, evts]) => (
        <section key={urgency} className={styles.urgencyGroup}>
          <div className={styles.urgencyHeader}>
            <UrgencyBadge urgency={urgency} />
            <div className={styles.urgencyLine} />
          </div>
          <div className={styles.eventList}>
            {evts.map((e, i) => <EventRow key={i} e={e} />)}
          </div>
        </section>
      ))}

      {filtered.length === 0 && (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>📅</div>
          <div className={styles.emptyTitle}>No hay eventos de esta categoría</div>
          <div className={styles.emptyDesc}>Prueba con otro filtro o vuelve más tarde</div>
        </div>
      )}
    </div>
  );
}
