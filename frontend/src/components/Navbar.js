import React, { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import logo from "../assets/images/icon.png";

const Navbar = () => {
  const [navbarData, setNavbarData] = useState([]);
  const { language, setLanguage } = useContext(LanguageContext);

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  useEffect(() => {
    fetch(`http://localhost:8091/api/navbar?lang=${language}`)
      .then((response) => response.json())
      .then((data) => setNavbarData(data))
      .catch((error) => console.error("Error fetching navbar data:", error));
  }, [language]);

  return (
    <nav data-bs-theme="dark">
      <div className="collapse text-bg-dark" id="navbarHeader">
        <div className="container">
          <div className="row">
            <div className="col-sm-8 col-md-7 py-4">
              <h4>{navbarData.navbar_about}</h4>
              <p className="text-body-secondary">{navbarData.navbar_about_desc}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="navbar navbar-dark bg-dark shadow-sm">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" style={{ wordWrap: "break-word", overflowWrap: "break-word", whiteSpace: "normal", wordBreak: "break-all" }}>
            <img src={logo} alt="Logo" width="40" height="40" style={{ marginRight: "10px" }} />
            <strong>{navbarData.navbar_title}</strong>
          </a>
          <div className="btn-group m-3">
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
