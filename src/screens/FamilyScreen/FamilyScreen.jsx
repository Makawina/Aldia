import { useState } from 'react';
import { familyThreads, familyAlbum } from '../../data/family';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import ChatThread from './ChatThread';
import styles from './FamilyScreen.module.css';

export default function FamilyScreen() {
  const [activeThread, setActiveThread] = useState(null);

  if (activeThread) {
    return <ChatThread thread={activeThread} onBack={() => setActiveThread(null)} />;
  }

  return (
    <div>
      <SectionTitle>Mensajes</SectionTitle>
      <div className={styles.threadList}>
        {familyThreads.map((t) => (
          <div
            key={t.id}
            onClick={() => setActiveThread(t)}
            className={styles.thread}
            data-unread={t.unread > 0}
            role="button"
            tabIndex={0}
            aria-label={`Chat con ${t.name}${t.unread > 0 ? `, ${t.unread} sin leer` : ''}`}
          >
            <div className={styles.avatar}>{t.avatar}</div>
            <div className={styles.threadBody}>
              <div className={styles.threadTop}>
                <span className={styles.threadName}>{t.name}</span>
                <span className={styles.threadTime}>{t.time}</span>
              </div>
              <div className={styles.lastMsg}>{t.lastMsg}</div>
            </div>
            {t.unread > 0 && (
              <div className={styles.unreadBadge}>{t.unread}</div>
            )}
          </div>
        ))}
      </div>

      {/* Album */}
      <SectionTitle count>Álbum familiar</SectionTitle>
      <div className={styles.albumGrid}>
        {familyAlbum.map((item, i) => (
          <button key={i} className={styles.albumItem} aria-label={item.label}>
            <span className={styles.albumEmoji}>{item.emoji}</span>
            <span className={styles.albumLabel}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
