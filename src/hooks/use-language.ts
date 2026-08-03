import { useState, useCallback } from "react";
import { Lang, translations, Translations } from "@/i18n/translations";

/** Detects browser/OS language and returns "es" or "en". */
function detectBrowserLang(): Lang {
  const lang = (navigator.language ?? navigator.languages?.[0] ?? "en")
    .toLowerCase()
    .slice(0, 2);
  return lang === "es" ? "es" : "en";
}

function getInitialLang(): Lang {
  const stored = localStorage.getItem("lang") as Lang | null;
  if (stored === "es" || stored === "en") return stored;
  return detectBrowserLang();
}

export function useLanguage() {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  }, []);

  const toggle = useCallback(() => {
    setLang(lang === "es" ? "en" : "es");
  }, [lang, setLang]);

  const t: Translations = translations[lang];

  return { lang, setLang, toggle, t };
}
