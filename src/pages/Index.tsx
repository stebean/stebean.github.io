import { LangProvider } from "@/context/LangContext";
import Portfolio from "@/components/Portfolio";
import "@/portfolio.css";

export default function Index() {
  return <LangProvider><Portfolio /></LangProvider>;
}
