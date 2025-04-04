import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "./context/LanguageProvider";
import { GenericTextProvider } from "./context/GenericTextProvider";
import HomePage from "./pages/HomePage";
import ArticlesPage from "./pages/ArticlesPage";
import ContentPage from "./pages/ContentPage";
import SongjiangArticlesPage from "./pages/SongjiangArticlesPage";
import SongjiangContentPage from "./pages/SongjiangContentPage";

function App() {
    return (
      <Router>
        <LanguageProvider>
          <HelmetProvider>
            <GenericTextProvider>
                <Routes>
                  <Route path="/" element={<Navigate to="/home" replace />} />
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/china/articles" element={<ArticlesPage />} />
                  <Route path="/china/:id" element={<ContentPage />} />
                  <Route path="/songjiang/articles" element={<SongjiangArticlesPage />} />
                  <Route path="/songjiang/:id" element={<SongjiangContentPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </GenericTextProvider>
          </HelmetProvider>
        </LanguageProvider>
      </Router>
    );
}

export default App;
