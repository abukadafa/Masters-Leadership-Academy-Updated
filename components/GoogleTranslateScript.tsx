"use client";

import { useEffect } from "react";
import { useLanguage } from "./LanguageProvider";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

export default function GoogleTranslateScript() {
  const { locale } = useLanguage();

  useEffect(() => {
    // If not English, ensure Google Translate widget is loaded to translate full site pages
    if (locale === "en") return;

    if (!document.getElementById("google-translate-script")) {
      window.googleTranslateElementInit = () => {
        if (window.google?.translate?.TranslateElement) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages: "en,fr,ar",
              autoDisplay: false,
            },
            "google_translate_element"
          );
        }
      };

      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [locale]);

  return <div id="google_translate_element" className="hidden" aria-hidden="true" />;
}
