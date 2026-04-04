window.QayrawanUtils = {
  clone(value) { return JSON.parse(JSON.stringify(value)); },
  escapeHtml(text) {
    return String(text)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  },
  makeId(prefix = "id") { return `${prefix}_${Math.random().toString(36).slice(2, 9)}_${Date.now().toString(36)}`; },
  formatTime(ts) {
    try {
      return new Date(ts).toLocaleString(undefined, { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "short" });
    } catch { return ""; }
  },
  readJSON(key, fallback) {
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; } catch { return fallback; }
  },
  writeJSON(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
};
