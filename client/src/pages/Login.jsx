import React, { useState, useRef } from "react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword, setPersistence, createUserWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const containerRef = useRef(null);
  const overlayBtnRef = useRef(null);

  const handleClick = () => {
    containerRef.current.classList.toggle("right-panel-active");
    overlayBtnRef.current.classList.remove("btnScaled");

    window.requestAnimationFrame(() => {
      overlayBtnRef.current.classList.add("btnScaled");
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
      navigate("/canvas");

      console.log(Response);
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("User not found. Please check your email and password.");
      } else if (error.code === "auth/wrong-password") {
        setError("Invalid password. Please try again.");
      } else {
        setError(error.message);
      }
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        signupEmail,
        signupPassword
      );
      console.log(user);
      navigate("/canvas");
      // User signed up successfully
    } catch (error) {
      if (error.code === "auth/weak-password") {
        setError("Password should be at least 6 characters long.");
      } else if (error.code === "auth/email-already-in-use") {
        setError(
          "The email address is already registered. Please use a different email."
        );
      } else {
        setError(error.message); // Set the error state to the default error message
      }
    }
  };

  return (
    <div className="wrapper">
      <div className="container" id="container" ref={containerRef}>
        <div className="form-container signup-container">
          <form onSubmit={handleSignUp}>
            <h1>Create Account</h1>
            <span>use your email for registration</span>

            <div className="infield">
              <input
                type="email"
                placeholder="Email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
              />
              <label />
            </div>

            <div className="infield">
              <input
                type="password"
                placeholder="Password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
              />
              <label />
            </div>

            <button type="submit">Signup</button>
            {error && <span style={{color:'red'}}>{error}</span>}
          </form>
        </div>

        <div className="form-container signin-container">
          <form onSubmit={handleLogin}>
            <h1>Sign in</h1>

            <div className="infield">
              <input
                type="email"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <label />
            </div>

            <div className="infield">
              <input
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              <label />
            </div>

            <button type="submit">Sign in</button>
            {error && <span style={{color:'red', marginTop:'10px'}}>{error}</span>}
          </form>
        </div>

        <div className="overlay-container" id="overlay-con">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button ref={overlayBtnRef} onClick={handleClick}>
                Sign In
              </button>
            </div>

            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start your art journey</p>
              <button ref={overlayBtnRef} onClick={handleClick}>
                Sign Up
              </button>
            </div>
            {/* <div id="overlayBtn"> toggle</div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

{
  /*
    convert this to accurate react.js code

    const container = document.getElementById("container")
    const overlayCon = document.getElementById("overlayCon")
    const overlayBtn = document.getElementById("overlayBtn")

    overrlayBtn.addEventListener('click', () => {
      container.classList.toggle('right-panel-active')
      overlayBtn.classList.remove('btnScaled')

      window.requestAnimationFrame(() => {
        overlayBtn.classList.add('btnScaled')
      })
    })
*/
}
