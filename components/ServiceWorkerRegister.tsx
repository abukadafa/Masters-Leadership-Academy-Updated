"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Registration can fail (e.g. unsupported browser, http:// in dev) — non-fatal,
      // the site works fully without it, just without offline/installable support.
    });
  }, []);

  return null;
}
