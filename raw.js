/* ── sw.js ── Place this at the ROOT of your GitHub Pages repo ── */
const CACHE = "qayrawan-v1";

self.addEventListener("install",  e => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(clients.claim()));

/* Background push notifications (sent via FCM or any push service) */
self.addEventListener("push", e => {
  const data = e.data?.json() || {};
  e.waitUntil(
    self.registration.showNotification(data.title || "إشعار جديد", {
      body:    data.body    || "",
      icon:    data.icon    || "/placeholder.png",
      badge:   "/placeholder.png",
      vibrate: [200, 100, 200],
      tag:     data.tag     || "default",
      renotify: true,
      data:    { url: data.url || "/" }
    })
  );
});

self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type:"window", includeUncontrolled:true }).then(list => {
      for (const c of list) if ("focus" in c) return c.focus();
      return clients.openWindow("/");
    })
  );
});

/* Message from page → show notification immediately (tab backgrounded) */
self.addEventListener("message", e => {
  if (e.data?.type === "SHOW_NOTIFICATION") {
    const { title, body, icon, tag } = e.data;
    self.registration.showNotification(title, {
      body, icon: icon || "/placeholder.png",
      badge: "/placeholder.png",
      vibrate: [200, 100, 200],
      tag: tag || "default", renotify: true
    });
  }
});
