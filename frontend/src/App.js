import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Lyric from "./routes/Lyric";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lyric/:id" element={<Lyric />} />
      </Routes>
    </Router>
  );
}

export default App;
