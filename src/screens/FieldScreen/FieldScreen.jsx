import { currentWeather, forecast } from '../../data/weather';
import { marketPrices } from '../../data/marketPrices';
import { fieldNews } from '../../data/fieldNews';
import { services } from '../../data/services';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import PriceChip from '../../components/PriceChip/PriceChip';
import { ChevronRight, PhoneIcon } from '../../components/icons';
import styles from './FieldScreen.module.css';

export default function FieldScreen() {
  return (
    <div>
      {/* Weather full */}
      <SectionTitle sub="Iniesta, Cuenca">El tiempo</SectionTitle>
      <section className={styles.weatherCard}>
        <div className={styles.weatherMain}>
          <div>
            <div className={styles.weatherTemp}>{currentWeather.temp}°C</div>
            <div className={styles.weatherCondition}>{currentWeather.condition}</div>
          </div>
          <div className={styles.weatherBigIcon}>{currentWeather.icon}</div>
        </div>
        <div className={styles.weatherDetails}>
          <span>💧 Humedad: {currentWeather.humidity}%</span>
          <span>💨 Viento: {currentWeather.wind} km/h</span>
        </div>
        <div className={styles.forecastStrip}>
          {forecast.slice(2, 9).map((d, i) => (
            <div key={i} className={styles.forecastDay}>
              <div className={styles.forecastDayLabel}>{d.day}</div>
              <div className={styles.forecastDayIcon}>{d.icon}</div>
              <div className={styles.forecastDayTemp}>{d.temp}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Market prices */}
      <SectionTitle sub="Lonja de Albacete">Precios del mercado</SectionTitle>
      <div className={styles.cardList}>
        {marketPrices.map((item, i) => (
          <div key={i} className={styles.cardListItem}>
            <PriceChip item={item} />
          </div>
        ))}
      </div>

      {/* News */}
      <SectionTitle count>Noticias agrícolas</SectionTitle>
      <div className={styles.cardList}>
        {fieldNews.map((n, i) => (
          <div key={i} className={styles.cardListItem}>
            <div className={styles.newsItem} role="button" tabIndex={0}>
              {n.hot && <span className={styles.hotDot} />}
              <div className={styles.newsBody}>
                <div className={styles.newsTitle}>{n.title}</div>
                <div className={styles.newsMeta}>{n.source} · {n.time}</div>
              </div>
              <ChevronRight color="var(--color-text-light)" />
            </div>
          </div>
        ))}
      </div>

      {/* Services */}
      <SectionTitle sub="Iniesta">Servicios útiles</SectionTitle>
      <div className={styles.serviceList}>
        {services.map((s, i) => (
          <div key={i} className={styles.serviceRow}>
            <span className={styles.serviceIcon}>{s.icon}</span>
            <div className={styles.serviceBody}>
              <div className={styles.serviceName}>{s.name}</div>
              <div className={styles.serviceDetail}>{s.detail}</div>
            </div>
            <button className={styles.callBtn} aria-label={`Llamar a ${s.name}`}>
              <PhoneIcon />
              <span className={styles.callLabel}>Llamar</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
