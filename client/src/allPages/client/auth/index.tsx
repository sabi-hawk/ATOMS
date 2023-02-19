import React, { useState } from "react";
import Login from "../../auth/forms/login";
// import Login from "..//forms/login";
import Signup from "./forms/signup";

function ClientAuthentication() {
    const [loginForm, setLoginForm] = useState(true);
  return (
    <div className="form-container">
      {loginForm ? (
        <>
          <Login />
          <p>
            Don't have an account{" "}
            <button onClick={() => setLoginForm(false)}> Sign Up</button>
          </p>
        </>
      ) : (
        <>
          <Signup />
          <p>
            Already have an account{" "}
            <button onClick={() => setLoginForm(true)}>Login</button>
          </p>
        </>
      )}
    </div>
  );
}

export default ClientAuthentication;
