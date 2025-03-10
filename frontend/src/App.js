import React from "react";
import { LanguageProvider } from "./context/LanguageContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
    return (
        <LanguageProvider>
          <Navbar />
          <Home />
        </LanguageProvider>
    );
}

export default App;
