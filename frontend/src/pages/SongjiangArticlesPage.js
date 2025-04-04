import React from "react";
import Navbar from "../components/Navbar";
import { useGenericText } from "../context/GenericTextProvider";
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { useLanguage } from "../hooks/useLanguage";

const SongjiangArticlesPage = () => {
  const { genericText } = useGenericText();
  const [articles, setArticles] = useState([]);
  const { language } = useLanguage();
  
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  
  useEffect(() => {
    fetch(`${API_BASE_URL}/songjiang?lang=${language}`)
      .then((response) => response.json())
      .then((data) => {
        setArticles(data.articles);
      })
      .catch((error) => console.error("Error fetching articles:", error));
  }, [API_BASE_URL, language]);

  return (
    <>
      <Helmet>
        <title>{genericText.title}</title>
      </Helmet>
      <Navbar />
      <main>
        <div className="album py-5 bg-body-tertiary">
          <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 gx-3 gy-5">
              {articles.map((article) => (
                <div className="col" key={article.article_id}>
                  <div className="card shadow-sm">
                    <img className="bd-placeholder-img card-img-top" src={article.image_url} alt={article.title} />
                    <div className="card-body">
                      <strong  style={{ fontSize: "1.5em"}}>{article.title}</strong>
                      <p
                        className="card-text m-1"
                        style={{
                            textIndent: "2em"
                        }}>
                          {article.short_desc}
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                          <small className="text-body-secondary"></small>
                          <a type="button" className="btn btn-outline-secondary" href={`/songjiang/${article.article_id}`}>{genericText.read_more}</a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SongjiangArticlesPage;
