import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home.jsx";
import Contacts from "./Contacts.jsx";

function App() {
  return (
    <div className="screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
