import React, { Suspense } from "react";
import LoginForm from "@/components/admin/LoginForm";

export const metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-ink px-6 py-16">
      <div className="w-full max-w-[400px] bg-ink-2 border border-rule p-8 rounded-[3px]">
        <span className="font-mono text-[11px] text-copper-light uppercase tracking-[0.1em] block mb-2">
          Admin Access
        </span>
        <h1 className="font-serif text-[24px] text-cream-text mb-6">Sign in</h1>
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
