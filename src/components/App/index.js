// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import UserSearch from "../UserSearch";
import UserProfile from "../UserProfile";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserSearch />} />
        <Route path="/user/:username" element={<UserProfile />} />
      </Routes>
    </Router>
  );
};

export default App;
