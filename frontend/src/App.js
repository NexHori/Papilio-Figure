import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import FigureGrid from "./components/FigureGrid";
import FigureDetail from "./components/FigureDetail";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import "./App.css";

function App() {
  const [figurines, setFigurines] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  // Fetch figurines
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/figurines/")
      .then((response) => response.json())
      .then((data) => {
        if (typeof data === "string") {
          data = JSON.parse(data);
        }
        if (Array.isArray(data)) {
          setFigurines(data.map((item) => ({ id: item.pk, ...item.fields })));
        }
      })
      .catch(() => {});
  }, []);

  // Check if user is authenticated and retrieve username from localStorage
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedUsername = localStorage.getItem("username");

    if (token) {
      setIsAuthenticated(true);
      setUsername(storedUsername);
    }
  }, []);

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    setIsAuthenticated(false);
    setUsername("");
  };

  // Update authentication state after successful login
  const setAuthenticationState = (authToken, username) => {
    localStorage.setItem("authToken", authToken);
    localStorage.setItem("username", username);
    setIsAuthenticated(true);
    setUsername(username);
  };

  return (
    <Router>
      <Header
        isAuthenticated={isAuthenticated}
        username={username}
        onLogout={handleLogout}
      />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h2>Currently Trending</h2>
                <FigureGrid figurines={figurines} />
              </>
            }
          />
          <Route path="/figurine/:id" element={<FigureDetail />} />
          <Route
            path="/login"
            element={<LoginPage setAuthenticationState={setAuthenticationState} />}
          />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
