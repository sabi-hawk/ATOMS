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
    <div className="position-relative">
      <div
        id="radius-shape-1"
        className="position-absolute rounded-circle shadow-5-strong"
      ></div>
      <div
        id="radius-shape-2"
        className="position-absolute shadow-5-strong"
      ></div>
      <form
        className="auth-form px-4 py-5 px-md-5  bg-glass"
        onSubmit={handleLogin}
        style={{
          borderRadius: '0.35rem',
        }}
      >
        <h3 className="mb-4 display-5 fw-bold ls-tight"> Login <br /> Information</h3>
        <div className="form-row">
          <div className="form-outline mb-2 w-100">
            <input
              className="bg-transparent form-control py-2"
              type="email"
              placeholder="Enter Email"
              required
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
            />
          </div>
          {/* <label>Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            } */}
          {/* /> */}
        </div>
        <div className="form-row">
        <div className="form-outline mb-2 w-100">
            <input
              className="bg-transparent form-control py-2"
              type="password"
              placeholder="Enter Password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
          </div>
          {/* <label>Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          /> */}
        </div>
        <button className="btn btn-primary w-100" type="submit">
          Login In
        </button>
      </form>
    </div>
  );
}

export default Login;
