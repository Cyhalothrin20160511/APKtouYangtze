import { useParams } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useGenericText } from "../context/GenericTextProvider";
import { Helmet } from "react-helmet-async";

const ArticlePage = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  const [article, setArticle] = useState(null);
  const { genericText } = useGenericText();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
 
  useEffect(() => {
    fetch(`${API_BASE_URL}/articles/${id}?lang=${language}`)
      .then((response) => response.json())
      .then((data) => {
        setArticle(data);
      })
      .catch((error) => {
        console.error("Error fetching article:", error);
        setArticle(null);
      });
  }, [API_BASE_URL, id, language]);

  // Conditional rendering ensures that the article is rendered only after the data is loaded, avoiding direct access to null attributes.
  if (article === null) {
    return <div></div>;
  }

  return (
    <>
        <Helmet>
            <title>{article.title}</title>
        </Helmet>
        <Navbar/>
        <div className="position-relative overflow-hidden p-3 text-center">
            <div className="col-md-7 p-lg-5 mx-auto">
                <h1 className="display-4 font-weight-normal">{article.title}</h1>
                <img
                    className="bd-placeholder-img my-4"
                    src={article.image_url}
                    alt={article.title}
                    style={{
                        maxWidth: "60%",
                        height: "auto",
                        display: "block",
                        margin: "0 auto"
                    }}
                />
                <p className="text-body-secondary" style={{
                            whiteSpace: "pre-wrap",
                            maxWidth: "80%",
                            margin: "1rem auto",
                            wordBreak: "break-word",
                        }}>
                    {genericText.image_source} {article.image_url}
                </p>
                {article.desc.split("\n\n").map((paragraph, index) => (
                    <p
                        key={index}
                        className="lead font-weight-normal"
                        style={{
                            whiteSpace: "pre-wrap",
                            textIndent: "2em",
                            maxWidth: "80%",
                            margin: "0 auto",
                            textAlign: "justify",
                            wordBreak: "break-word",
                            lineHeight: "1.8",
                            marginBottom: "1.5em"
                        }}
                    >
                        {paragraph}
                    </p>
                ))}
                <p className="text-body-secondary" style={{
                            whiteSpace: "pre-wrap",
                            maxWidth: "80%",
                            margin: "1rem auto",
                            wordBreak: "break-word",
                        }}>
                    {genericText.text_source}
                    <br/>
                    <a href={`https://www.ihchina.cn/project_details/${id.match(/article_(\d+)/)?.[1]}`} >{`https://www.ihchina.cn/project_details/${id.match(/article_(\d+)/)?.[1]}`}</a>
                </p>
            </div>
            <footer className="text-body-secondary">
                <div className="container">
                <p className="float-end mb-5">
                    <Link to="/" className="btn btn-outline-secondary">
                        {genericText.back_home}
                    </Link>
                </p>
                </div>
            </footer>
        </div>
    </>
  );
};

export default ArticlePage;
