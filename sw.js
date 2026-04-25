const CACHE_NAME = "qayrawan-v1";

self.addEventListener("install", e => {
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(clients.claim());
});

/* Page sends this message to show a notification immediately */
self.addEventListener("message", e => {
  if (e.data?.type === "SHOW_NOTIFICATION") {
    self.registration.showNotification(e.data.title || "نظام القيروان", {
      body:    e.data.body    || "",
      icon:    e.data.icon    || "/placeholder.png",
      badge:   "/placeholder.png",
      vibrate: [200, 100, 200],
      tag:     e.data.tag     || "qayrawan",
      renotify: true,
      data:    { url: "/" }
    });
  }
});

self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(list => {
      for (const c of list) if ("focus" in c) return c.focus();
      return clients.openWindow("/");
    })
  );
});
