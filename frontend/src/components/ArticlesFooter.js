import { Link } from "react-router-dom";
import { useGenericText } from "../context/GenericTextProvider";
import CreateArticleForm from "../components/CreateArticleForm";
import { useState, useEffect } from "react";

const ArticlesFooter = ({ page, hasNextPage }) => {
  const { genericText } = useGenericText();

  const [successMessage, setSuccessMessage] = useState("");

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);
  
  const handleArticleSubmit = (newArticle) => {
    fetch(`${API_BASE_URL}/propose-articles`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newArticle),
    })
      .then((response) => response.json())
      .then((data) => {
        setSuccessMessage(genericText.success_message);
        setTimeout(() => setSuccessMessage(""), 5000);
      })
      .catch((error) => {
        console.error("Error submiting article:", error);
      });
  };

  return (
    <footer className="text-body-secondary py-5">
      <div className="container text-center">
        {page > 1 && (
          <Link to={`?page=${page - 1}`} className="btn btn-sm btn-outline-secondary">
            {genericText.previous_page}
          </Link>
        )}
        <span> {genericText.page_1}</span>
        <span> {page} </span>
        <span>{genericText.page_2} </span>
        {hasNextPage && (
          <Link to={`?page=${page + 1}`} className="btn btn-sm btn-outline-secondary">
            {genericText.next_page}
          </Link>
        )}
      </div>
      <div className="container text-center mt-5">
        {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
        <span>{genericText.already_translated_article} </span>
        <CreateArticleForm
          onSubmit={handleArticleSubmit}
        />
      </div>
    </footer>
  );
};

export default ArticlesFooter;
