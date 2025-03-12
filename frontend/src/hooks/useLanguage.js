import { useContext } from "react";
import { LanguageContext } from "../context/LanguageProvider";

export const useLanguage = () => {
  const { language, setLanguage } = useContext(LanguageContext);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return { language, changeLanguage };
};
