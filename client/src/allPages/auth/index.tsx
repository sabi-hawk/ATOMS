import React, { useState } from "react";
import Login from "./forms/login";
import Signup from "./forms/signup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Authentication() {
  const [loginForm, setLoginForm] = useState(true);
  return (
    
    <div className="form-container background-radial-gradient ">
      
      {loginForm ? (
        <>
          <Login />
          <p className="form-footer-text">
            Don't have an account{" "}
            <button className="btn btn-primary" onClick={() => setLoginForm(false)}> Sign Up</button>
          </p>
        </>
      ) : (
        <>
          <Signup />
          <p className="form-footer-text">
            Already have an account{" "}
            <button className="btn btn-primary" onClick={() => setLoginForm(true)}>Login</button>
          </p>
        </>
      )}
      </div>
  );
}

export default Authentication;
