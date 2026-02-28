import { useState, useEffect } from 'react';
import './theme.css';
import NavBar from './components/NavBar/NavBar';
import Header from './components/Header/Header';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import EatScreen from './screens/EatScreen/EatScreen';
import EventsScreen from './screens/EventsScreen/EventsScreen';
import FieldScreen from './screens/FieldScreen/FieldScreen';
import FamilyScreen from './screens/FamilyScreen/FamilyScreen';
import styles from './App.module.css';

const STORAGE_KEY = 'aldia-screen';

const screens = {
  home: HomeScreen,
  eat: EatScreen,
  events: EventsScreen,
  field: FieldScreen,
  family: FamilyScreen,
};

export default function App() {
  const [screen, setScreen] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved && screens[saved] ? saved : 'home';
    } catch {
      return 'home';
    }
  });

  // Persist active screen
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, screen);
    } catch { /* ignore */ }
  }, [screen]);

  const Screen = screens[screen] || HomeScreen;

  return (
    <div className={styles.shell}>
      <main className={styles.content}>
        <Header />
        <div key={screen} className={styles.screen}>
          <Screen onNavigate={setScreen} />
        </div>
        <div className={styles.spacer} />
      </main>
      <NavBar active={screen} onChange={setScreen} />
    </div>
  );
}
