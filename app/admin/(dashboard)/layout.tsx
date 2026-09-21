import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { ADMIN_ROLES } from "@/lib/permissions";
import LogoutButton from "@/components/admin/LogoutButton";

export const metadata = {
  robots: { index: false, follow: false },
};

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/media", label: "Media & Videos" },
  { href: "/admin/enquiries", label: "Enquiries" },
  { href: "/admin/corporate-training", label: "Corporate Training" },
  { href: "/admin/partnerships", label: "Partnerships" },
  { href: "/admin/facilitators", label: "Facilitators" },
  { href: "/admin/registrations", label: "Registrations" },
  { href: "/admin/impact", label: "Impact Counters" },
];

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  // Belt-and-suspenders: middleware.ts already redirects unauthenticated /admin/* requests,
  // but this check keeps the layout safe if ever rendered outside that path (e.g. tests).
  const user = await getCurrentUser();
  if (!user || !ADMIN_ROLES.includes(user.role)) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-paper flex">
      <aside className="w-[240px] shrink-0 bg-ink text-cream-text flex flex-col p-6 gap-1">
        <div className="mb-8">
          <span className="font-mono text-[10px] text-copper-light uppercase tracking-[0.1em] block mb-1">
            Masters Leadership Academy
          </span>
          <span className="font-serif text-[17px]">Admin</span>
        </div>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-[13px] py-2.5 px-3 rounded-[2px] hover:bg-ink-2 transition-colors"
          >
            {item.label}
          </Link>
        ))}
        <div className="mt-auto pt-6 border-t border-rule">
          <p className="text-[12px] text-[#9AACA6] mb-1">{user.name}</p>
          <p className="text-[11px] font-mono text-copper-light uppercase tracking-[0.05em] mb-4">
            {user.role.replace(/_/g, " ")}
          </p>
          <LogoutButton />
        </div>
      </aside>
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
