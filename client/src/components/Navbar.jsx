import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();


  return (
    <div>
      <nav>
        <div>
          <p>+</p>
          <p
            style={{cursor: 'pointer'}}
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </p>
        </div>
        <div>
          <p>Kolade</p>
          <p>+</p>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
