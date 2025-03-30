import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "./context/LanguageProvider";
import { GenericTextProvider } from "./context/GenericTextProvider";
import { ArticlesProvider } from "./context/ArticlesProvider";
import HomePage from "./pages/HomePage";
import ArticlePage from "./pages/ArticlePage";

function App() {
    return (
      <Router>
        <LanguageProvider>
          <HelmetProvider>
            <GenericTextProvider>
              <ArticlesProvider>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/:id" element={<ArticlePage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
              </ArticlesProvider>
            </GenericTextProvider>
          </HelmetProvider>
        </LanguageProvider>
      </Router>
    );
}

export default App;
