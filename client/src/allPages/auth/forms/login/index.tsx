import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../../../api/auth";
import { setUser } from "../../../../flux/reducers/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosError } from "axios";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await userLogin(loginData);
      dispatch(setUser(data));
      if (data?.isClient) {
        navigate("/chat");
      } else {
        navigate("/dashboard");
      }
      toast.success("Successfully LoggedIn!", {
        autoClose: 3000,
      });
      // if (!(data?.message === "Invalid Credentials")) {
      //   dispatch(setUser(data));
      //   console.log("logged in", data);
      //   if (data?.isClient) {
      //     navigate("/chat");
      //   } else {
      //     navigate("/dashboard");
      //   }
      // } else {
      //   console.log("invalid credentials");
      // }
    } catch (error: any) {
      if (error.response.data.message) {
        toast.error(error.response.data.message, {
          autoClose: 3000,
        });
      } else {
        toast.error("Something Went Wrong. Try Again!", {
          autoClose: 3000,
        });
      }
      console.log(error);
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
