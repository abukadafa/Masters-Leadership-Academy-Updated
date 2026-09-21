"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="text-[12px] font-mono uppercase tracking-[0.05em] text-[#9AACA6] hover:text-cream-text cursor-pointer"
    >
      Sign Out →
    </button>
  );
}
