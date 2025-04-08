"use client";

import { createContext, useState, useEffect } from "react";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  // Control whether the component has mounted
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Only run on the client-side (after component mounts)
    const storedLang = localStorage.getItem("language");
    if (storedLang) {
      setLanguage(storedLang);
    }
    // Ensure that the client has mounted before performing further operations
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Only update localStorage when the language changes and client has mounted
    if (isMounted) {
      localStorage.setItem("language", language);
    }
  }, [language, isMounted]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
