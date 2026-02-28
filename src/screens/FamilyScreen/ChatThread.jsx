import { useState } from 'react';
import { chatMessages as initialMessages } from '../../data/family';
import { ChevronLeft } from '../../components/icons';
import styles from './FamilyScreen.module.css';

const quickReactions = ["👍", "❤️", "😂", "👏"];

export default function ChatThread({ thread, onBack }) {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = {
      id: messages.length + 1,
      from: "abuelo",
      text: input.trim(),
      time: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
      type: "text",
    };
    setMessages([...messages, newMsg]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div>
      {/* Thread header */}
      <div className={styles.chatHeader}>
        <button onClick={onBack} className={styles.backBtn} aria-label="Volver a mensajes">
          <ChevronLeft />
        </button>
        <div className={styles.chatAvatar}>{thread.avatar}</div>
        <span className={styles.chatName}>{thread.name}</span>
      </div>

      {/* Messages */}
      <div className={styles.messages} role="log" aria-label="Mensajes">
        {messages.map((msg) => {
          const isMe = msg.from === "abuelo";
          return (
            <div key={msg.id} className={styles.msgRow} data-mine={isMe}>
              <div className={`${styles.bubble} ${isMe ? styles.bubbleMine : styles.bubbleOther}`}>
                {msg.text}
                <div className={styles.msgTime}>{msg.time}</div>
                {msg.reaction && (
                  <div className={`${styles.reaction} ${isMe ? styles.reactionMine : styles.reactionOther}`}>
                    {msg.reaction}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ height: 10 }} />

      {/* Quick reactions */}
      <div className={styles.quickReactions}>
        <span className={styles.quickLabel}>Reacción rápida:</span>
        {quickReactions.map((r, i) => (
          <button key={i} className={styles.reactionBtn} aria-label={`Reaccionar con ${r}`}>
            {r}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className={styles.inputRow}>
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className={styles.chatInput}
          aria-label="Escribir mensaje"
        />
        <button onClick={handleSend} className={styles.sendBtn}>
          Enviar
        </button>
      </div>
    </div>
  );
}
