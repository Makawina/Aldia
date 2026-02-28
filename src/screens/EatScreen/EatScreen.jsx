import { useState, useMemo } from 'react';
import { restaurants } from '../../data/restaurants';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import FilterBar from '../../components/FilterBar/FilterBar';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';
import { PlusIcon, SearchIcon } from '../../components/icons';
import styles from './EatScreen.module.css';

const categories = [
  { id: "todos", label: "Todos" },
  { id: "favs", label: "❤️ Favoritos" },
  { id: "manchega", label: "🏺 Manchega" },
  { id: "asador", label: "🔥 Asadores" },
  { id: "tapas", label: "🫒 Tapas" },
];

export default function EatScreen() {
  const [filter, setFilter] = useState("todos");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let list = restaurants;
    if (filter === "favs") list = list.filter(r => r.fav);
    else if (filter !== "todos") list = list.filter(r => r.cat === filter);

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.type.toLowerCase().includes(q) ||
        r.zone.toLowerCase().includes(q)
      );
    }
    return list;
  }, [filter, search]);

  return (
    <div>
      <SectionTitle sub="Albacete y alrededores">Buen Comer</SectionTitle>

      <div className={styles.searchWrap}>
        <SearchIcon size={18} color="var(--color-text-light)" />
        <input
          type="text"
          placeholder="Buscar restaurante..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
          aria-label="Buscar restaurante"
        />
      </div>

      <FilterBar items={categories} active={filter} onChange={setFilter} />

      <div className={styles.list}>
        {filtered.map((r) => <RestaurantCard key={r.id} r={r} />)}
      </div>

      {filtered.length === 0 && (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🍽️</div>
          <div className={styles.emptyTitle}>Sin restaurantes en esta categoría</div>
          <div className={styles.emptyDesc}>Añade uno pulsando el botón de abajo</div>
        </div>
      )}

      <button className={styles.addBtn} aria-label="Añadir restaurante">
        <PlusIcon color="var(--color-olive)" />
        <span className={styles.addLabel}>Añadir restaurante</span>
      </button>
    </div>
  );
}
