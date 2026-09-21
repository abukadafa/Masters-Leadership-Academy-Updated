"use client";

import React, { useState } from "react";

function urlBase64ToUint8Array(base64Url: string): Uint8Array {
  const padding = "=".repeat((4 - (base64Url.length % 4)) % 4);
  const base64 = (base64Url + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  return Uint8Array.from([...raw].map((c) => c.charCodeAt(0)));
}

/**
 * Lets a visitor opt in to browser push notifications. Renders nothing unless
 * NEXT_PUBLIC_VAPID_PUBLIC_KEY is set (see scripts/generate-vapid-keys.ts) — same principle
 * as the WhatsApp button: no control is shown for a capability that isn't actually wired up.
 * Subscribing here stores the subscription (lib/models.ts pushSubscriptions); it does not
 * mean notifications will actually be sent yet — that job is still to be built.
 */
export default function NotificationOptIn() {
  const [status, setStatus] = useState<"idle" | "subscribing" | "subscribed" | "error" | "denied">("idle");
  const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

  if (!vapidKey) return null;

  const handleSubscribe = async () => {
    setStatus("subscribing");
    try {
      if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
        setStatus("error");
        return;
      }
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setStatus("denied");
        return;
      }
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidKey) as BufferSource,
      });
      await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subscription.toJSON()),
      });
      setStatus("subscribed");
    } catch {
      setStatus("error");
    }
  };

  if (status === "subscribed") {
    return <p className="text-[13px] text-copper-light">You&apos;re subscribed to programme &amp; event notifications.</p>;
  }

  return (
    <div>
      <button onClick={handleSubscribe} disabled={status === "subscribing"} className="btn btn-outline-dark cursor-pointer disabled:opacity-60">
        {status === "subscribing" ? "Enabling..." : "Enable Notifications"}
      </button>
      {status === "denied" && (
        <p className="text-[12px] text-[#B9C6C2] mt-2">Notifications were blocked. Enable them in your browser settings to opt in.</p>
      )}
      {status === "error" && (
        <p className="text-[12px] text-[#B9C6C2] mt-2">Notifications aren&apos;t supported on this browser.</p>
      )}
    </div>
  );
}
