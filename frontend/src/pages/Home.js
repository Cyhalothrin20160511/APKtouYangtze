import React, { useEffect, useState, useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    fetch(`http://localhost:8091/api/articles?page=${page}&lang=${language}`)
      .then((response) => response.json())
      .then((data) => setArticles(data))
      .catch((error) => console.error("Error fetching articles:", error));
  }, [page, language]);

  return (
    <main>
      <div className="album py-5 bg-body-tertiary">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {articles.map((article) => (
              <div className="col" key={article.article_id}>
                <div className="card shadow-sm">
                  <img className="bd-placeholder-img card-img-top" src={article.image_url} alt={article.title} />
                  <div className="card-body">
                    <strong  style={{ fontSize: "1.5em"}}>{article.title}</strong>
                    <p>{article.short_desc}</p>
                    <a className="btn btn-outline-secondary" href={`/about/${article.article_id}?lang=${language}`}>
                      View More
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </main>
  );
};

export default Home;
