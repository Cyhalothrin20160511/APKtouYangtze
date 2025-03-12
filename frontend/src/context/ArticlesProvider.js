import { createContext, useContext, useState, useEffect } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { useSearchParams } from "react-router-dom";

const ArticlesContext = createContext();

export const ArticlesProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const { language } = useLanguage();
  const [searchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    fetch(`${API_BASE_URL}/articles?lang=${language}&page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        setArticles(data.articles);
        setHasNextPage(data.hasNextPage);
      })
      .catch((error) => console.error("Error fetching articles:", error));
  }, [API_BASE_URL, language, page]);

  return (
    <ArticlesContext.Provider value={{ articles, hasNextPage, page }}>
      {children}
    </ArticlesContext.Provider>
  );
};

export const useArticles = () => {
  return useContext(ArticlesContext);
};
