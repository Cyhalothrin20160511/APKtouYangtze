import { createContext, useContext, useState, useEffect } from "react";
import { useLanguage } from "../hooks/useLanguage";

const GenericContext = createContext();

export const GenericTextProvider = ({ children }) => {
  const [genericText, setGenericText] = useState([]);
  const { language } = useLanguage();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    fetch(`${API_BASE_URL}/generic?lang=${language}`)
      .then((response) => response.json())
      .then((data) => setGenericText(data))
      .catch((error) => console.error("Error fetching generic text:", error));
  }, [API_BASE_URL, language]);

  return (
    <GenericContext.Provider value={{ genericText }}>
      {children}
    </GenericContext.Provider>
  );
};

export const useGenericText = () => {
  return useContext(GenericContext);
};
