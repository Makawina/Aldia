import ManchaLandscape from '../ManchaLandscape';
import styles from './Header.module.css';

const APP_NAME = "Al Día";

function getFormattedDate() {
  const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  const now = new Date();
  return `${days[now.getDay()]}, ${now.getDate()} de ${months[now.getMonth()]}`;
}

export default function Header() {
  return (
    <header className={styles.wrapper}>
      <div className={styles.landscape}>
        <ManchaLandscape />
      </div>
      <div className={styles.content}>
        <div>
          <h1 className={styles.title}>{APP_NAME}</h1>
          <div className={styles.date}>{getFormattedDate()}</div>
        </div>
      </div>
    </header>
  );
}
