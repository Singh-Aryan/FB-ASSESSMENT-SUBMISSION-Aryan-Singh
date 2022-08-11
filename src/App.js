import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dash from "./pages/dash";
import Home from "./pages/signuppage/home";
import Connect from "./pages/connect/connect";

const AppWrapper = () =>  {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/connect" element={<Connect />} />
      <Route path="/dashboard" element={<Dash />} />
    </Routes>
  );
}

const App = () => {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
};

export default App;
