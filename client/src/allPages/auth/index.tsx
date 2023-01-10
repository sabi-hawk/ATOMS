import React, { useState } from "react";
import Login from "./forms/login";
import Signup from "./forms/signup";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Authentication() {
  const [loginForm, setLoginForm] = useState(true);
  return (
    <div>
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

export default Authentication;
