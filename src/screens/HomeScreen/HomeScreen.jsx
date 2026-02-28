import { currentWeather, forecast } from '../../data/weather';
import { marketPrices } from '../../data/marketPrices';
import { restaurants } from '../../data/restaurants';
import { events } from '../../data/events';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import PriceChip from '../../components/PriceChip/PriceChip';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';
import EventRow from '../../components/EventRow/EventRow';
import { ChevronRight } from '../../components/icons';
import styles from './HomeScreen.module.css';

export default function HomeScreen({ onNavigate }) {
  const favRestaurants = restaurants.filter(r => r.fav);

  return (
    <div>
      {/* Daily Briefing */}
      <section className={styles.briefing}>
        <div className={styles.weatherTop}>
          <div>
            <div className={styles.locationLabel}>{currentWeather.location}</div>
            <div className={styles.tempRow}>
              <span className={styles.tempBig}>{currentWeather.temp}°</span>
              <div>
                <div className={styles.weatherDesc}>{currentWeather.condition}</div>
                <div className={styles.weatherExtra}>
                  💧 {currentWeather.humidity}% · 💨 {currentWeather.wind} km/h
                </div>
              </div>
            </div>
          </div>
          <div className={styles.weatherIcon}>{currentWeather.icon}</div>
        </div>

        <div className={styles.notifSection}>
          {/* Family alert */}
          <div className={styles.notifRow} onClick={() => onNavigate("family")} role="button" tabIndex={0}>
            <div className={styles.notifAvatars}>
              <span>👧🏻</span>
              <span>👧🏼</span>
            </div>
            <span className={styles.notifText}>Elena y Laura te han escrito</span>
            <div className={styles.notifBadge}>3</div>
          </div>

          {/* Today's event */}
          <div className={styles.notifRow} onClick={() => onNavigate("events")} role="button" tabIndex={0}>
            <span className={styles.notifIcon}>🏺</span>
            <div className={styles.notifBody}>
              <div className={styles.notifTitle}>Mercadillo de Antigüedades</div>
              <div className={styles.notifSub}>Sábado 8 · Recinto Ferial</div>
            </div>
            <span className={styles.chevron}><ChevronRight /></span>
          </div>

          {/* Top news */}
          <div className={styles.notifRow} onClick={() => onNavigate("field")} role="button" tabIndex={0}>
            <span className={styles.notifIcon}>🌾</span>
            <div className={styles.notifBody}>
              <div className={styles.notifTitle}>Cereal sube un 4% en la Lonja</div>
              <div className={styles.notifSub}>Agronews · Hace 2h</div>
            </div>
            <span className={styles.chevron}><ChevronRight /></span>
          </div>
        </div>
      </section>

      {/* Mini forecast */}
      <div className={styles.forecast}>
        {forecast.slice(0, 5).map((d, i) => (
          <div key={i} className={styles.forecastDay}>
            <div className={`${styles.forecastLabel} ${i === 0 ? styles.forecastLabelToday : ''}`}>
              {d.day}
            </div>
            <div className={styles.forecastIcon}>{d.icon}</div>
            <div className={styles.forecastTemp}>{d.temp}</div>
          </div>
        ))}
      </div>

      {/* Market prices mini */}
      <SectionTitle count sub="Lonja de Albacete" onAction={() => onNavigate("field")}>
        Precios del mercado
      </SectionTitle>
      <div className={styles.cardList}>
        {marketPrices.map((item, i) => (
          <div key={i} className={i < marketPrices.length - 1 ? styles.cardListDivider : undefined}>
            <PriceChip item={item} compact />
          </div>
        ))}
      </div>

      {/* Buen Comer preview */}
      <SectionTitle count sub="Albacete" onAction={() => onNavigate("eat")}>
        Buen Comer
      </SectionTitle>
      <div className={styles.stackList}>
        {favRestaurants.map((r) => (
          <RestaurantCard key={r.id} r={r} />
        ))}
      </div>

      {/* Events preview */}
      <SectionTitle count onAction={() => onNavigate("events")}>Qué Hacer</SectionTitle>
      <div className={styles.stackList}>
        {events.slice(0, 3).map((e, i) => (
          <EventRow key={i} e={e} />
        ))}
      </div>
    </div>
  );
}
