import type { Metadata, Viewport } from "next";
import { Inter, Fraunces, IBM_Plex_Mono } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ChatWidget from "@/components/ChatWidget";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import OrganizationJsonLd from "@/components/OrganizationJsonLd";
import { LOCALE_COOKIE, DEFAULT_LOCALE, getLocaleInfo, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Leadership Training, Conferences & Technical Services`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  manifest: "/manifest.json",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Leadership Training, Conferences & Technical Services`,
    description: SITE_DESCRIPTION,
    url: "/",
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Leadership Training, Conferences & Technical Services`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#12292B",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = await cookies();
  const locale = (store.get(LOCALE_COOKIE)?.value as Locale) || DEFAULT_LOCALE;
  const localeInfo = getLocaleInfo(locale);
  const dict = getDictionary(locale);

  return (
    <html
      lang={localeInfo.code}
      dir={localeInfo.dir}
      className={`${inter.variable} ${fraunces.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink-text font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-copper focus:text-[#1B0F05] focus:px-4 focus:py-2 focus:rounded-[2px] focus:text-sm focus:font-semibold"
        >
          Skip to main content
        </a>
        <OrganizationJsonLd />
        <Header dict={dict} locale={locale} />
        <main id="main-content" className="flex-grow">
          {children}
        </main>
        <Footer dict={dict} locale={locale} />
        <WhatsAppButton />
        <ChatWidget />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}

