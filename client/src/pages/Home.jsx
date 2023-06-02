import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => { 
  const navigate = useNavigate();

  return (
    <div>
      <div id="toggle">
        <div className="menu-sharp" onClick={() => {navigate('/login')}}>Login</div>
      </div>

      
      <div className="hero">
        <div className="header">
          <h1>Collaborative Canvas</h1>
        </div>
      </div>

      <div id="square-container" />

    </div>
  );
};

export default Home;

