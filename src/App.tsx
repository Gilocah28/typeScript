import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Main } from "./pages/main/Main"; 
import { Login } from "./pages/Login";
import "./App.css";
import { Nabvar } from "./components/Navbar";
import { CreatePost } from "./pages/create-post/CreatePost";

function App() {
  return (
    <div className="App">
      <Router>
        <Nabvar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/CreatePost" element={<CreatePost />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
