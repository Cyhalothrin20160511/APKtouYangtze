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

  const [EditMode, setEditMode] = useState(false);
  const [proposedChanges, setProposedChanges] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
 
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

  const handleEditSubmit = () => {
    const updatedData = { id, content: proposedChanges };
    fetch(`${API_BASE_URL}/propose-changes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        setSuccessMessage(genericText.propose_changes_success);
        setEditMode(false);
        setTimeout(() => setSuccessMessage(""), 5000);
      })
      .catch((error) => {
        console.error("Error submitting edit:", error);
      });
  };

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
                {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
                <div className="container d-flex justify-content-end align-items-center mb-3">
                    <button
                        onClick={() => setEditMode(true)}
                        className="btn btn-outline-secondary m-2"
                        data-bs-toggle="modal"
                        data-bs-target="#editModal"
                    >
                        {genericText.propose_changes}
                    </button>
                    <Link to="/" className="btn btn-outline-secondary m-2">
                        {genericText.back_home}
                    </Link>
                </div>
            </footer>
        </div>
        <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered"> 
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="editModalLabel">{genericText.propose_changes}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <textarea
                    value={proposedChanges}
                    onChange={(e) => setProposedChanges(e.target.value)}
                    className="form-control"
                    style={{ minHeight: "300px", resize: "vertical" }}
                    placeholder={genericText.propose_changes_example}
                    />
                </div>
                <div className="modal-footer d-flex justify-content-between">
                    <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">{genericText.cancel}</button>
                    <button type="button" className="btn btn-success" onClick={handleEditSubmit} data-bs-dismiss="modal">{genericText.submit}</button>
                </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default ArticlePage;
