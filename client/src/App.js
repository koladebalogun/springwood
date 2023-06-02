import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { auth } from "./firebaseConfig";
import Login from "./pages/Login";
import Canvas from "./pages/Canvas";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/canvas"
          element={user ? <Canvas /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
};

export default App;
