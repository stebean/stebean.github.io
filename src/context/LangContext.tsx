import { createContext, useContext, ReactNode } from "react";
import { useLanguage } from "@/hooks/use-language";
import { Lang, Translations } from "@/i18n/translations";

interface LangContextValue {
  lang: Lang;
  toggle: () => void;
  t: Translations;
}

const LangContext = createContext<LangContextValue | null>(null);

export const useLang = () => {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
};

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const value = useLanguage();
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
};
