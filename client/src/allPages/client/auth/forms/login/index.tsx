import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "../../../../../api/auth";
import { setUser } from "../../../../../flux/reducers/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await userLogin(loginData);
      if (!(data?.message === "Invalid Credentials")) {
        dispatch(setUser(data));
        navigate("/chat");
      } else {
        console.log("invalid credentials");
      }
    } catch (error) {
      console.log("Error | handleLogin", error);
    }
  };
  return (
    <form className="auth-form" onSubmit={handleLogin}>
      <div className="form-row">
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter Email"
          value={loginData.email}
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
          }
        />
      </div>
      <div className="form-row">
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter Password"
          value={loginData.password}
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
        />
      </div>
      <button className="btn-primary" type="submit">
        Login In
      </button>
    </form>
  );
}

export default Login;
