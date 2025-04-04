import React from "react";
import { useGenericText } from "../context/GenericTextProvider";
import { useLanguage } from "../hooks/useLanguage";
import logo from "../assets/images/icon.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { genericText } = useGenericText();
  const { language, changeLanguage } = useLanguage();

  return (
      <nav data-bs-theme="dark">
        <div className="collapse text-bg-dark" id="navbarHeader">
          <div className="container">
            <div className="row">
              <div className="col-sm-8 col-md-7 py-4">
                <h4>{genericText.about_encyclopedia}</h4>
                <p className="text-body-secondary">{genericText.about_encyclopedia_desc}</p>
                <h4>{genericText.about_webmaster}</h4>
                <p className="text-body-secondary">{genericText.read_more_on} <a href="https://schuletoushu.com/about-me" className="text-body-secondary" target="_blank">https://schuletoushu.com/about-me</a></p>
                <h4>{genericText.github_url}</h4>
                <p className="text-body-secondary"><a href="https://github.com/Cyhalothrin20160511/APKtouYangtze" className="text-body-secondary" target="_blank">https://github.com/Cyhalothrin20160511/APKtouYangtze</a></p>
              </div>
            </div>
          </div>
        </div>
        <div className="navbar navbar-dark bg-dark shadow-sm">
          <div className="container">
            <Link to="/" className="navbar-brand d-flex align-items-center" style={{ wordWrap: "break-word", overflowWrap: "break-word", whiteSpace: "normal", wordBreak: "break-all" }}>
              <img src={logo} alt="Logo" width="40" height="40" style={{ marginRight: "10px" }} />
              <strong>{genericText.title}</strong>
            </Link>
            <div className="btn-group mx-auto m-3">
              <button
                className={`btn btn-sm btn-outline-secondary ${language === "en" ? "active" : ""}`}
                onClick={() => changeLanguage("en")}
              >
                English
              </button>
              <button
                className={`btn btn-sm btn-outline-secondary ${language === "gr" ? "active" : ""}`}
                onClick={() => changeLanguage("gr")}
              >
                Ελληνικά
              </button>
              <button
                className={`btn btn-sm btn-outline-secondary ${language === "sc" ? "active" : ""}`}
                onClick={() => changeLanguage("sc")}
              >
                简体中文
              </button>
              <button
                className={`btn btn-sm btn-outline-secondary ${language === "ja" ? "active" : ""}`}
                onClick={() => changeLanguage("ja")}
              >
                日本語
              </button>
              <button
                className={`btn btn-sm btn-outline-secondary ${language === "ru" ? "active" : ""}`}
                onClick={() => changeLanguage("ru")}
              >
                Русский
              </button>
            </div>
            <button className="navbar-toggler mx-auto m-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
      </nav>
  );
};

export default Navbar;
