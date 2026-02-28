import { useState, useEffect, useMemo } from "react";

// ── Config ──

const APP_NAME = "Al Día";
const STORAGE_KEY = "aldia-screen";

const c = {
  bg: "#F4EFE6", card: "#FFFFFF", olive: "#536B4A", oliveLight: "#6E8A62",
  olivePale: "#E6EDDF", oliveMuted: "#A3B598", earth: "#8B7355",
  earthLight: "#A6916E", earthPale: "#F0E6D6", text: "#1E1E1E",
  textMid: "#4A4A4A", textMuted: "#6B6B6B", textLight: "#8A8A8A",
  white: "#FFFFFF", border: "#DDD7CA", accent: "#B8860B", red: "#C0392B",
  green: "#2E7D32", greenLight: "#E8F5E9", redLight: "#FFEBEE",
};

const font = "'DM Sans', sans-serif";
const fontT = "'Playfair Display', Georgia, serif";

// ── Data ──

const restaurants = [
  { id: 1, name: "Restaurante Nuestro Bar", type: "Cocina manchega", rating: 4.7, price: "€€", zone: "Centro", fav: true, note: "Pedir el cordero manchego", cat: "manchega", color: "#8B4513" },
  { id: 2, name: "Asador El Callejón", type: "Carnes y asados", rating: 4.5, price: "€€€", zone: "Villacerrada", fav: false, note: "", cat: "asador", color: "#C0392B" },
  { id: 3, name: "Taberna La Mancha", type: "Tapas tradicionales", rating: 4.6, price: "€", zone: "Paseo de la Libertad", fav: true, note: "Reservar con Antonio", cat: "tapas", color: "#B8860B" },
  { id: 4, name: "Restaurante Álvarez", type: "Alta cocina manchega", rating: 4.8, price: "€€€", zone: "Centro", fav: false, note: "", cat: "manchega", color: "#8B4513" },
];

const catIcons = { manchega: "🏺", asador: "🔥", tapas: "🫒", marisco: "🦐", vinos: "🍷" };

const events = [
  { title: "Mercadillo de Antigüedades", date: "Sáb 8 Mar", tag: "Antigüedades", color: c.earth, place: "Recinto Ferial, Albacete", urgency: "Esta semana" },
  { title: "Charla: Futuro del Viñedo en CLM", date: "Mar 11 Mar", tag: "Campo", color: c.olive, place: "Cámara de Comercio, Albacete", urgency: "Esta semana" },
  { title: "Cata de Vinos de La Mancha", date: "Vie 14 Mar", tag: "Gastronomía", color: "#8B2252", place: "Bodega Iniesta", urgency: "Próximamente" },
  { title: "EXPOVICAMAN Ganadera", date: "12-15 Mar", tag: "Campo", color: c.olive, place: "IFAB, Albacete", urgency: "Próximamente" },
  { title: "Expo Pintura Manchega", date: "Hasta 20 Mar", tag: "Cultura", color: c.accent, place: "Museo Municipal, Albacete", urgency: "En curso" },
];

const fieldNews = [
  { title: "El cereal sube un 4% en la Lonja de Albacete", time: "Hace 2h", source: "Agronews", hot: true },
  { title: "Nuevas ayudas PAC 2026 para viñedos en CLM", time: "Hace 5h", source: "MAPA", hot: false },
  { title: "Previsión: lluvias en Castilla-La Mancha el jueves", time: "Hoy", source: "AEMET", hot: false },
  { title: "Vendimia 2025: balance positivo en Cuenca", time: "Ayer", source: "AgroInfoCLM", hot: false },
];

const marketPrices = [
  { name: "Trigo", price: "232 €/t", change: "+1.2%", up: true },
  { name: "Cebada", price: "198 €/t", change: "-0.5%", up: false },
  { name: "Uva Airén", price: "0.38 €/kg", change: "+2.1%", up: true },
  { name: "Aceite oliva", price: "5.80 €/kg", change: "+0.3%", up: true },
];

const familyThreads = [
  { id: "elena", name: "Elena", avatar: "👧🏻", lastMsg: "¡Abuelo, he sacado un 9 en mates! 🎉", time: "14:32", unread: 2 },
  { id: "laura", name: "Laura", avatar: "👧🏼", lastMsg: "Te echo de menooos abueloo 💕", time: "12:15", unread: 1 },
  { id: "lau", name: "Lau", avatar: "👩🏻", lastMsg: "Papá, ¿comemos juntos el domingo?", time: "Ayer", unread: 0 },
  { id: "familia", name: "Familia", avatar: "👨‍👩‍👧‍👧", lastMsg: "Lau: He subido fotos del domingo", time: "Ayer", unread: 0 },
];

const initialChatMessages = [
  { id: 1, from: "elena", text: "Abuelo!!", time: "14:30" },
  { id: 2, from: "elena", text: "¡He sacado un 9 en mates! 🎉", time: "14:32" },
  { id: 3, from: "abuelo", text: "Muy bien, bichilla! Eso hay que celebrarlo", time: "14:35", reaction: "❤️" },
  { id: 4, from: "elena", text: "¿Me llevas a merendar?", time: "14:36" },
];

const services = [
  { name: "Farmacia de guardia", detail: "Farmacia López — C/ Mayor 12", icon: "💊", phone: "926 47 XX XX" },
  { name: "Centro de salud", detail: "C/ Cervantes 8, Iniesta", icon: "🏥", phone: "926 47 XX XX" },
  { name: "Ayuntamiento", detail: "Plaza de España 1, Iniesta", icon: "🏛️", phone: "926 47 XX XX" },
];

const weather = { location: "Iniesta", temp: 14, condition: "Parcialmente nublado", humidity: 45, wind: 12, icon: "⛅" };

const forecast = [
  { day: "Hoy", temp: "14°", icon: "⛅" }, { day: "Dom", temp: "15°", icon: "☀️" },
  { day: "Lun", temp: "13°", icon: "🌤️" }, { day: "Mar", temp: "11°", icon: "🌧️" },
  { day: "Mié", temp: "10°", icon: "🌧️" }, { day: "Jue", temp: "10°", icon: "🌧️" },
  { day: "Vie", temp: "14°", icon: "⛅" }, { day: "Sáb", temp: "16°", icon: "☀️" },
  { day: "Dom", temp: "15°", icon: "☀️" },
];

const familyAlbum = [
  { emoji: "🎄", label: "Navidad '25" }, { emoji: "🎂", label: "Cumple Elena" },
  { emoji: "🌻", label: "El campo" }, { emoji: "🎣", label: "Pesca" },
  { emoji: "👨‍👩‍👧‍👧", label: "Familia" }, { emoji: "🏖️", label: "Verano '25" },
];

// ── Icons ──

const Chevron = ({ left, size = 18 }) => (
  <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth={left ? 2.5 : 2} viewBox="0 0 24 24">
    <path d={left ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Star = () => (
  <svg width={14} height={14} fill="#B8860B" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
  </svg>
);

const Heart = () => (
  <svg width={18} height={18} fill={c.red} stroke={c.red} strokeWidth="2" viewBox="0 0 24 24">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

const Phone = () => (
  <svg width={16} height={16} fill="none" stroke={c.olive} strokeWidth="2" viewBox="0 0 24 24">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Search = () => (
  <svg width={18} height={18} fill="none" stroke={c.textLight} strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const navIcons = {
  home: <svg width={24} height={24} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round"/><polyline points="9 22 9 12 15 12 15 22" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  eat: <svg width={24} height={24} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M3 2v7c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2V2M7 2v20M17 2v5c0 1.1.9 2 2 2s2-.9 2-2V2M17 9v13" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  events: <svg width={24} height={24} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  field: <svg width={24} height={24} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M2 22L12 12M12 12c1-1 2-4 2-7M12 12c-1-1-4-2-7-2M22 2L12 12M12 12c-1 1-2 4-2 7M12 12c1 1 4 2 7 2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  family: <svg width={24} height={24} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round"/></svg>,
};

// ── CSS Animations (injected once) ──

const styleTag = document.createElement("style");
styleTag.textContent = `
  @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes bubbleIn { from { opacity: 0; transform: translateY(8px) scale(.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
  @keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:.4 } }
  @keyframes badgePop { 0% { transform:scale(0) } 70% { transform:scale(1.15) } 100% { transform:scale(1) } }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: ${font}; background: ${c.bg}; -webkit-font-smoothing: antialiased; }
  button { font-family: inherit; cursor: pointer; }
  input { font-family: inherit; }
`;
if (!document.querySelector("[data-aldia-styles]")) {
  styleTag.setAttribute("data-aldia-styles", "");
  document.head.appendChild(styleTag);
}

// ── Helpers ──

function getFormattedDate() {
  const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  const now = new Date();
  return `${days[now.getDay()]}, ${now.getDate()} de ${months[now.getMonth()]}`;
}

// ── Shared Components ──

function ManchaLandscape() {
  return (
    <svg width="100%" height="52" viewBox="0 0 400 52" fill="none" preserveAspectRatio="xMidYMid slice" style={{ opacity: 0.12 }} aria-hidden="true">
      <path d="M0 42 Q50 28 100 36 Q150 44 200 32 Q250 20 300 34 Q350 46 400 30 L400 52 L0 52Z" fill={c.olive} />
      <path d="M0 48 Q80 38 160 44 Q240 50 320 40 Q360 36 400 42 L400 52 L0 52Z" fill={c.earth} />
      <g transform="translate(320, 18)">
        <rect x="-1.5" y="0" width="3" height="16" fill={c.olive} rx="1" />
        {[[-10, -4], [10, -4], [-4, -10], [4, 10]].map(([x, y], i) => (
          <line key={i} x1="0" y1="2" x2={x} y2={y} stroke={c.olive} strokeWidth="1.2" strokeLinecap="round" />
        ))}
      </g>
      {[40, 80, 120, 160, 200].map((x, i) => (
        <g key={i} transform={`translate(${x}, ${38 + (i % 2) * 3})`}>
          <circle cx="0" cy="0" r="2.5" fill={c.olive} />
          <circle cx="10" cy="-1" r="2" fill={c.olive} />
          <circle cx="20" cy="0.5" r="2.5" fill={c.olive} />
        </g>
      ))}
    </svg>
  );
}

function Header() {
  return (
    <header style={{ position: "relative", marginBottom: 6 }}>
      <div style={{ position: "absolute", bottom: 0, left: -18, right: -18, overflow: "hidden", borderRadius: "0 0 16px 16px" }}>
        <ManchaLandscape />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 0 56px", position: "relative", zIndex: 1 }}>
        <div>
          <h1 style={{ fontSize: 30, fontWeight: 700, color: c.text, fontFamily: fontT, margin: 0, letterSpacing: -0.5 }}>{APP_NAME}</h1>
          <div style={{ fontSize: 14, color: c.textMid, fontFamily: font, fontWeight: 500, marginTop: 2 }}>{getFormattedDate()}</div>
        </div>
      </div>
    </header>
  );
}

function NavBar({ active, onChange }) {
  const items = [
    { id: "home", label: "Inicio", badge: 0 },
    { id: "eat", label: "Buen Comer", badge: 0 },
    { id: "events", label: "Qué Hacer", badge: 0 },
    { id: "field", label: "El Campo", badge: 0 },
    { id: "family", label: "Familia", badge: 3 },
  ];
  return (
    <nav style={{ display: "flex", justifyContent: "space-around", padding: "6px 0 18px", background: c.white, borderTop: `1px solid ${c.border}`, position: "sticky", bottom: 0, zIndex: 10 }} aria-label="Navegación principal">
      {items.map((item) => (
        <button key={item.id} onClick={() => onChange(item.id)} aria-label={item.label} aria-current={active === item.id ? "page" : undefined}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, background: "none", border: "none", color: active === item.id ? c.olive : c.textLight, transition: "all .2s", position: "relative", minWidth: 60, padding: "4px 0" }}>
          <div style={{ padding: "7px 16px", borderRadius: 22, background: active === item.id ? c.olivePale : "transparent", transition: "background .2s", display: "flex", alignItems: "center" }}>
            {navIcons[item.id]}
          </div>
          <span style={{ fontSize: 11.5, fontWeight: active === item.id ? 700 : 400, fontFamily: font, letterSpacing: 0.2 }}>{item.label}</span>
          {item.badge > 0 && (
            <div style={{ position: "absolute", top: 0, right: 2, minWidth: 20, height: 20, borderRadius: 10, background: c.red, color: c.white, fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", border: `2px solid ${c.white}`, animation: "badgePop .3s ease" }}>
              {item.badge}
            </div>
          )}
        </button>
      ))}
    </nav>
  );
}

function SectionTitle({ children, count, sub, onAction }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14, marginTop: 12 }}>
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: c.text, fontFamily: fontT, margin: 0 }}>{children}</h2>
        {sub && <span style={{ fontSize: 13, color: c.textMuted, fontFamily: font }}>{sub}</span>}
      </div>
      {count && (
        <button onClick={onAction} style={{ fontSize: 13, color: c.olive, fontFamily: font, fontWeight: 600, background: "none", border: "none", padding: "4px 0" }}>
          Ver todos →
        </button>
      )}
    </div>
  );
}

function FilterBar({ items, active, onChange }) {
  return (
    <div style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 18, scrollbarWidth: "none", paddingBottom: 2 }}>
      {items.map((item) => (
        <button key={item.id} onClick={() => onChange(item.id)}
          style={{ padding: "10px 20px", borderRadius: 24, background: active === item.id ? c.olive : c.white, border: `1.5px solid ${active === item.id ? c.olive : c.border}`, fontSize: 14, fontFamily: font, color: active === item.id ? c.white : c.textMid, fontWeight: active === item.id ? 600 : 400, flexShrink: 0, transition: "all .2s" }}>
          {item.label}
        </button>
      ))}
    </div>
  );
}

function UrgencyBadge({ urgency }) {
  const cfg = {
    "Mañana": { bg: "#FFF3E0", color: "#E65100", dot: "#E65100" },
    "Esta semana": { bg: c.olivePale, color: c.olive, dot: c.olive },
    "Próximamente": { bg: c.earthPale, color: c.earth, dot: c.earth },
    "En curso": { bg: "#E3F2FD", color: "#1565C0", dot: "#1565C0" },
  };
  const s = cfg[urgency] || cfg["Próximamente"];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 20, background: s.bg, fontSize: 12, fontWeight: 600, color: s.color, fontFamily: font }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.dot }} />
      {urgency}
    </span>
  );
}

function PriceChip({ item, compact }) {
  const sz = compact ? 13 : 15;
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: compact ? "8px 0" : "14px 0", fontFamily: font }}>
      <span style={{ fontSize: sz, color: c.text, fontWeight: 500 }}>{item.name}</span>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <span style={{ fontSize: sz, fontWeight: 600, color: c.text }}>{item.price}</span>
        <span style={{ fontSize: compact ? 11 : 13, fontWeight: 700, padding: compact ? "2px 7px" : "3px 10px", borderRadius: 8, background: item.up ? c.greenLight : c.redLight, color: item.up ? c.green : c.red }}>
          {item.change}
        </span>
      </div>
    </div>
  );
}

function RestaurantCard({ r }) {
  return (
    <article style={{ background: c.white, borderRadius: 14, padding: 16, display: "flex", gap: 14, alignItems: "center", boxShadow: "0 1px 4px rgba(0,0,0,.04)", border: `1px solid ${c.border}`, transition: "transform .15s, box-shadow .15s" }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,.08)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,.04)"; }}>
      <div style={{ width: 56, height: 56, borderRadius: 14, background: `${r.color}12`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0, border: `1px solid ${r.color}20` }}>
        {catIcons[r.cat] || "🍽️"}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: 16, color: c.text, fontFamily: font }}>{r.name}</div>
        <div style={{ fontSize: 14, color: c.textMid, fontFamily: font }}>{r.type} · {r.price}</div>
        <div style={{ fontSize: 13, color: c.textLight, fontFamily: font, marginTop: 1 }}>{r.zone}, Albacete</div>
        {r.note && (
          <div style={{ fontSize: 12, color: c.olive, fontFamily: font, fontStyle: "italic", marginTop: 5, background: c.olivePale, padding: "4px 10px", borderRadius: 8, display: "inline-block" }}>
            📝 {r.note}
          </div>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 3, background: c.olivePale, padding: "5px 11px", borderRadius: 20, fontSize: 14, fontWeight: 700, color: c.olive, fontFamily: font }}>
          <Star /> {r.rating}
        </div>
        {r.fav && <Heart />}
      </div>
    </article>
  );
}

function EventRow({ e }) {
  return (
    <article style={{ background: c.white, borderRadius: 14, padding: "14px 16px", display: "flex", gap: 14, alignItems: "center", border: `1px solid ${c.border}`, boxShadow: "0 1px 3px rgba(0,0,0,.03)", cursor: "pointer", transition: "transform .15s" }}
      onMouseEnter={e2 => { e2.currentTarget.style.transform = "translateY(-1px)"; }}
      onMouseLeave={e2 => { e2.currentTarget.style.transform = ""; }}>
      <div style={{ width: 50, height: 50, borderRadius: 12, background: `${e.color}12`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: `1px solid ${e.color}20` }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: e.color, fontFamily: font, textTransform: "uppercase", letterSpacing: 0.3 }}>{e.tag.slice(0, 5)}</span>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: 15, color: c.text, fontFamily: font, lineHeight: 1.3, marginBottom: 4 }}>{e.title}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: 13, color: c.textMid, fontFamily: font }}>📅 {e.date}</span>
          <UrgencyBadge urgency={e.urgency} />
        </div>
      </div>
      <Chevron />
    </article>
  );
}

// ── Screens ──

function HomeScreen({ onNavigate }) {
  return (
    <div>
      {/* Daily Briefing */}
      <section style={{ background: `linear-gradient(145deg, ${c.olive}, ${c.oliveLight})`, borderRadius: 18, padding: 22, color: c.white, marginBottom: 12, boxShadow: "0 4px 16px rgba(83,107,74,.25)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
          <div>
            <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1, opacity: 0.7, fontFamily: font, fontWeight: 600, marginBottom: 6 }}>{weather.location}</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              <span style={{ fontSize: 44, fontWeight: 700, fontFamily: fontT, lineHeight: 1 }}>{weather.temp}°</span>
              <div>
                <div style={{ fontSize: 14, fontFamily: font, opacity: 0.9 }}>{weather.condition}</div>
                <div style={{ fontSize: 12, fontFamily: font, opacity: 0.6, marginTop: 2 }}>💧 {weather.humidity}% · 💨 {weather.wind} km/h</div>
              </div>
            </div>
          </div>
          <div style={{ fontSize: 50, lineHeight: 1, marginTop: -4 }}>{weather.icon}</div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,.18)", paddingTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
          <NotifRow onClick={() => onNavigate("family")} left={<><span style={{ fontSize: 22 }}>👧🏻</span><span style={{ fontSize: 22, marginLeft: -6 }}>👧🏼</span></>} text="Elena y Laura te han escrito" right={<div style={{ background: "rgba(255,255,255,.25)", borderRadius: 14, padding: "3px 12px", fontSize: 14, fontWeight: 700, fontFamily: font }}>3</div>} />
          <NotifRow onClick={() => onNavigate("events")} left={<span style={{ fontSize: 22 }}>🏺</span>} text="Mercadillo de Antigüedades" sub="Sábado 8 · Recinto Ferial" />
          <NotifRow onClick={() => onNavigate("field")} left={<span style={{ fontSize: 22 }}>🌾</span>} text="Cereal sube un 4% en la Lonja" sub="Agronews · Hace 2h" />
        </div>
      </section>

      {/* Mini forecast */}
      <div style={{ display: "flex", justifyContent: "space-between", background: c.white, borderRadius: 14, padding: "14px 16px", marginBottom: 24, border: `1px solid ${c.border}` }}>
        {forecast.slice(0, 5).map((d, i) => (
          <div key={i} style={{ textAlign: "center", fontFamily: font }}>
            <div style={{ fontSize: 12, color: i === 0 ? c.olive : c.textLight, marginBottom: 5, fontWeight: i === 0 ? 700 : 400 }}>{d.day}</div>
            <div style={{ fontSize: 22, marginBottom: 3 }}>{d.icon}</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: c.text }}>{d.temp}</div>
          </div>
        ))}
      </div>

      {/* Market prices */}
      <SectionTitle count sub="Lonja de Albacete" onAction={() => onNavigate("field")}>Precios del mercado</SectionTitle>
      <CardList items={marketPrices} renderItem={(item) => <PriceChip item={item} compact />} />

      {/* Restaurants preview */}
      <SectionTitle count sub="Albacete" onAction={() => onNavigate("eat")}>Buen Comer</SectionTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 26 }}>
        {restaurants.filter(r => r.fav).map(r => <RestaurantCard key={r.id} r={r} />)}
      </div>

      {/* Events preview */}
      <SectionTitle count onAction={() => onNavigate("events")}>Qué Hacer</SectionTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
        {events.slice(0, 3).map((e, i) => <EventRow key={i} e={e} />)}
      </div>
    </div>
  );
}

function NotifRow({ onClick, left, text, sub, right }) {
  return (
    <div onClick={onClick} role="button" tabIndex={0} style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,.13)", borderRadius: 12, padding: "12px 14px", cursor: "pointer", transition: "background .15s" }}
      onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.2)"; }}
      onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.13)"; }}>
      <div style={{ display: "flex" }}>{left}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 15, fontFamily: font, fontWeight: 500 }}>{text}</div>
        {sub && <div style={{ fontSize: 12, opacity: 0.7, fontFamily: font, marginTop: 1 }}>{sub}</div>}
      </div>
      {right || <span style={{ opacity: 0.6 }}><Chevron /></span>}
    </div>
  );
}

function CardList({ items, renderItem }) {
  return (
    <div style={{ background: c.white, borderRadius: 14, padding: "2px 16px", border: `1px solid ${c.border}`, marginBottom: 24 }}>
      {items.map((item, i) => (
        <div key={i} style={{ borderBottom: i < items.length - 1 ? `1px solid ${c.border}` : "none" }}>
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
}

function EatScreen() {
  const [filter, setFilter] = useState("todos");
  const [search, setSearch] = useState("");

  const cats = [
    { id: "todos", label: "Todos" }, { id: "favs", label: "❤️ Favoritos" },
    { id: "manchega", label: "🏺 Manchega" }, { id: "asador", label: "🔥 Asadores" },
    { id: "tapas", label: "🫒 Tapas" },
  ];

  const filtered = useMemo(() => {
    let list = restaurants;
    if (filter === "favs") list = list.filter(r => r.fav);
    else if (filter !== "todos") list = list.filter(r => r.cat === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(r => r.name.toLowerCase().includes(q) || r.type.toLowerCase().includes(q) || r.zone.toLowerCase().includes(q));
    }
    return list;
  }, [filter, search]);

  return (
    <div>
      <SectionTitle sub="Albacete y alrededores">Buen Comer</SectionTitle>

      {/* Search */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, background: c.white, borderRadius: 14, padding: "10px 14px", border: `1.5px solid ${c.border}`, marginBottom: 14 }}>
        <Search />
        <input type="text" placeholder="Buscar restaurante..." value={search} onChange={e => setSearch(e.target.value)} aria-label="Buscar restaurante"
          style={{ flex: 1, border: "none", outline: "none", fontSize: 15, fontFamily: font, color: c.text, background: "transparent" }} />
      </div>

      <FilterBar items={cats} active={filter} onChange={setFilter} />

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
        {filtered.map(r => <RestaurantCard key={r.id} r={r} />)}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px 20px", color: c.textMuted, fontFamily: font }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🍽️</div>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Sin restaurantes en esta categoría</div>
          <div style={{ fontSize: 14 }}>Añade uno pulsando el botón de abajo</div>
        </div>
      )}

      <button style={{ width: "100%", background: c.olivePale, borderRadius: 14, padding: 20, border: `2px dashed ${c.oliveMuted}`, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 8 }}>
        <svg width={22} height={22} fill="none" stroke={c.olive} strokeWidth="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
        <span style={{ fontWeight: 600, fontSize: 16, color: c.olive, fontFamily: font }}>Añadir restaurante</span>
      </button>
    </div>
  );
}

function EventsScreen() {
  const [activeTag, setActiveTag] = useState("todos");
  const tags = [
    { id: "todos", label: "Todos" }, { id: "Antigüedades", label: "🏺 Antigüedades" },
    { id: "Gastronomía", label: "🍷 Gastronomía" }, { id: "Campo", label: "🌾 Campo" },
    { id: "Cultura", label: "🎨 Cultura" },
  ];

  const filtered = useMemo(() => activeTag === "todos" ? events : events.filter(e => e.tag === activeTag), [activeTag]);

  const grouped = useMemo(() => {
    const g = {};
    filtered.forEach(e => { if (!g[e.urgency]) g[e.urgency] = []; g[e.urgency].push(e); });
    return g;
  }, [filtered]);

  return (
    <div>
      <SectionTitle>Qué Hacer</SectionTitle>
      <FilterBar items={tags} active={activeTag} onChange={setActiveTag} />

      {Object.entries(grouped).map(([urgency, evts]) => (
        <section key={urgency} style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <UrgencyBadge urgency={urgency} />
            <div style={{ flex: 1, height: 1, background: c.border }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {evts.map((e, i) => <EventRow key={i} e={e} />)}
          </div>
        </section>
      ))}

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px 20px", color: c.textMuted, fontFamily: font }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📅</div>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>No hay eventos de esta categoría</div>
          <div style={{ fontSize: 14 }}>Prueba con otro filtro o vuelve más tarde</div>
        </div>
      )}
    </div>
  );
}

function FieldScreen() {
  return (
    <div>
      <SectionTitle sub="Iniesta, Cuenca">El tiempo</SectionTitle>
      <section style={{ background: `linear-gradient(145deg, ${c.olive}, ${c.oliveLight})`, borderRadius: 16, padding: 22, color: c.white, marginBottom: 24, boxShadow: "0 4px 16px rgba(83,107,74,.25)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <div>
            <div style={{ fontSize: 44, fontWeight: 700, fontFamily: fontT, lineHeight: 1 }}>{weather.temp}°C</div>
            <div style={{ fontSize: 15, opacity: 0.85, fontFamily: font, marginTop: 6 }}>{weather.condition}</div>
          </div>
          <div style={{ fontSize: 56 }}>{weather.icon}</div>
        </div>
        <div style={{ display: "flex", gap: 24, fontSize: 14, fontFamily: font, opacity: 0.8, marginBottom: 18 }}>
          <span>💧 Humedad: {weather.humidity}%</span>
          <span>💨 Viento: {weather.wind} km/h</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,.18)", paddingTop: 16 }}>
          {forecast.slice(2, 9).map((d, i) => (
            <div key={i} style={{ textAlign: "center", fontFamily: font }}>
              <div style={{ opacity: 0.6, marginBottom: 5, fontSize: 12 }}>{d.day}</div>
              <div style={{ fontSize: 22, marginBottom: 3 }}>{d.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{d.temp}</div>
            </div>
          ))}
        </div>
      </section>

      <SectionTitle sub="Lonja de Albacete">Precios del mercado</SectionTitle>
      <CardList items={marketPrices} renderItem={(item) => <PriceChip item={item} />} />

      <SectionTitle count>Noticias agrícolas</SectionTitle>
      <div style={{ background: c.white, borderRadius: 14, padding: "4px 16px", border: `1px solid ${c.border}`, marginBottom: 24 }}>
        {fieldNews.map((n, i) => (
          <div key={i} style={{ padding: "14px 0", borderBottom: i < fieldNews.length - 1 ? `1px solid ${c.border}` : "none", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
            {n.hot && <span style={{ width: 8, height: 8, borderRadius: "50%", background: c.red, flexShrink: 0, animation: "pulse 2s infinite" }} />}
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500, fontSize: 15, color: c.text, fontFamily: font, lineHeight: 1.4, marginBottom: 3 }}>{n.title}</div>
              <div style={{ fontSize: 13, color: c.textLight, fontFamily: font }}>{n.source} · {n.time}</div>
            </div>
            <Chevron />
          </div>
        ))}
      </div>

      <SectionTitle sub="Iniesta">Servicios útiles</SectionTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
        {services.map((s, i) => (
          <div key={i} style={{ background: c.white, borderRadius: 14, padding: "14px 16px", display: "flex", gap: 14, alignItems: "center", border: `1px solid ${c.border}` }}>
            <span style={{ fontSize: 26 }}>{s.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 15, color: c.text, fontFamily: font }}>{s.name}</div>
              <div style={{ fontSize: 13, color: c.textMid, fontFamily: font }}>{s.detail}</div>
            </div>
            <button style={{ padding: "8px 14px", borderRadius: 12, background: c.olivePale, border: "none", display: "flex", alignItems: "center", gap: 6 }} aria-label={`Llamar a ${s.name}`}>
              <Phone />
              <span style={{ fontSize: 13, fontWeight: 600, color: c.olive, fontFamily: font }}>Llamar</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function FamilyScreen() {
  const [activeThread, setActiveThread] = useState(null);

  if (activeThread) return <ChatThread thread={activeThread} onBack={() => setActiveThread(null)} />;

  return (
    <div>
      <SectionTitle>Mensajes</SectionTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 28 }}>
        {familyThreads.map(t => (
          <div key={t.id} onClick={() => setActiveThread(t)} role="button" tabIndex={0}
            aria-label={`Chat con ${t.name}${t.unread > 0 ? `, ${t.unread} sin leer` : ""}`}
            style={{ background: c.white, borderRadius: 14, padding: "14px 16px", display: "flex", gap: 14, alignItems: "center", border: t.unread > 0 ? `1.5px solid ${c.olive}` : `1px solid ${c.border}`, boxShadow: t.unread > 0 ? "0 2px 8px rgba(83,107,74,.1)" : "0 1px 3px rgba(0,0,0,.03)", cursor: "pointer", transition: "transform .1s" }}>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: t.unread > 0 ? c.olivePale : "#F5F0E8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0 }}>{t.avatar}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <span style={{ fontWeight: t.unread > 0 ? 700 : 500, fontSize: 16, color: c.text, fontFamily: font }}>{t.name}</span>
                <span style={{ fontSize: 13, color: t.unread > 0 ? c.olive : c.textLight, fontFamily: font, fontWeight: t.unread > 0 ? 600 : 400 }}>{t.time}</span>
              </div>
              <div style={{ fontSize: 14, color: t.unread > 0 ? c.textMid : c.textMuted, fontFamily: font, fontWeight: t.unread > 0 ? 500 : 400, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.lastMsg}</div>
            </div>
            {t.unread > 0 && (
              <div style={{ minWidth: 24, height: 24, borderRadius: 12, background: c.olive, color: c.white, fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font, flexShrink: 0 }}>{t.unread}</div>
            )}
          </div>
        ))}
      </div>

      <SectionTitle count>Álbum familiar</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
        {familyAlbum.map((item, i) => (
          <button key={i} style={{ aspectRatio: "1", borderRadius: 14, background: i % 2 === 0 ? c.earthPale : c.olivePale, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, border: `1px solid ${c.border}`, cursor: "pointer", transition: "transform .15s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.03)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; }}>
            <span style={{ fontSize: 36 }}>{item.emoji}</span>
            <span style={{ fontSize: 12, color: c.textMid, fontFamily: font, fontWeight: 500 }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ChatThread({ thread, onBack }) {
  const [messages, setMessages] = useState(initialChatMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, {
      id: prev.length + 1, from: "abuelo", text: input.trim(),
      time: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
    }]);
    setInput("");
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, paddingBottom: 14, borderBottom: `1px solid ${c.border}` }}>
        <button onClick={onBack} style={{ background: "none", border: "none", padding: "8px 4px", color: c.olive, display: "flex", alignItems: "center" }} aria-label="Volver">
          <Chevron left size={22} />
        </button>
        <div style={{ width: 44, height: 44, borderRadius: "50%", background: c.olivePale, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{thread.avatar}</div>
        <span style={{ fontWeight: 700, fontSize: 18, color: c.text, fontFamily: font }}>{thread.name}</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 20 }} role="log">
        {messages.map(msg => {
          const isMe = msg.from === "abuelo";
          return (
            <div key={msg.id} style={{ display: "flex", justifyContent: isMe ? "flex-end" : "flex-start", position: "relative" }}>
              <div style={{ maxWidth: "80%", background: isMe ? c.olive : c.white, color: isMe ? c.white : c.text, borderRadius: isMe ? "18px 18px 4px 18px" : "18px 18px 18px 4px", padding: "12px 16px", fontSize: 15, fontFamily: font, lineHeight: 1.4, border: isMe ? "none" : `1px solid ${c.border}`, position: "relative", animation: "bubbleIn .25s ease" }}>
                {msg.text}
                <div style={{ fontSize: 11, opacity: 0.6, marginTop: 4, textAlign: "right" }}>{msg.time}</div>
                {msg.reaction && (
                  <div style={{ position: "absolute", bottom: -10, [isMe ? "left" : "right"]: 8, background: c.white, borderRadius: 12, padding: "2px 6px", fontSize: 14, boxShadow: "0 1px 4px rgba(0,0,0,.1)", border: `1px solid ${c.border}` }}>
                    {msg.reaction}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ height: 10 }} />

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <span style={{ fontSize: 13, color: c.textLight, fontFamily: font, alignSelf: "center", marginRight: 4 }}>Reacción rápida:</span>
        {["👍", "❤️", "😂", "👏"].map((r, i) => (
          <button key={i} style={{ width: 44, height: 44, borderRadius: 12, background: c.white, border: `1px solid ${c.border}`, fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center", transition: "transform .15s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; }}>
            {r}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, background: c.white, borderRadius: 16, padding: "10px 14px", border: `1.5px solid ${c.border}` }}>
        <input type="text" placeholder="Escribe un mensaje..." value={input} onChange={e => setInput(e.target.value)} aria-label="Escribir mensaje"
          onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
          style={{ flex: 1, border: "none", outline: "none", fontSize: 16, fontFamily: font, color: c.text, background: "transparent" }} />
        <button onClick={handleSend} style={{ background: c.olive, color: c.white, border: "none", borderRadius: 12, padding: "12px 22px", fontSize: 15, fontWeight: 600, fontFamily: font, transition: "transform .15s" }}>
          Enviar
        </button>
      </div>
    </div>
  );
}

// ── Main App ──

export default function App() {
  const [screen, setScreen] = useState(() => {
    try { const s = localStorage.getItem(STORAGE_KEY); return s && ["home","eat","events","field","family"].includes(s) ? s : "home"; }
    catch { return "home"; }
  });

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, screen); } catch {}
  }, [screen]);

  const screens = { home: HomeScreen, eat: EatScreen, events: EventsScreen, field: FieldScreen, family: FamilyScreen };
  const Screen = screens[screen] || HomeScreen;

  return (
    <div style={{ maxWidth: 420, margin: "0 auto", minHeight: "100vh", background: c.bg, fontFamily: font, display: "flex", flexDirection: "column", position: "relative" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet" />
      <main style={{ flex: 1, padding: "0 18px", overflowY: "auto" }}>
        <Header />
        <div key={screen} style={{ animation: "fadeSlideIn .25s ease both" }}>
          <Screen onNavigate={setScreen} />
        </div>
        <div style={{ height: 20 }} />
      </main>
      <NavBar active={screen} onChange={setScreen} />
    </div>
  );
}
