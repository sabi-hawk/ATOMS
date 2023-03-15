import React, { useState } from "react";
import Login from "../../auth/forms/login";
// import Login from "..//forms/login";
import Signup from "./forms/signup";

function ClientAuthentication() {
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

export default ClientAuthentication;
