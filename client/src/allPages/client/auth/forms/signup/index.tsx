import React, { useState } from "react";
import { registerProvider } from "../../../../../api/auth";
import { createConversation } from "../../../../../api/conversation";
import "../index.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [signupData, setSignupData] = useState({
    name: {
      first: "",
      last: "",
    },
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const handleSignup = async (event: any) => {
    event.preventDefault();
    try {
      const { confirmPassword, ...registrationData } = signupData;
      const { data } = await registerProvider({
        ...registrationData,
        isClient: true,
      });

      // create it's chat
      // const path = window.location.pathname;
      // @ts-ignore
      // const providerId = path.match(/provider\/(\d+)\/chat/)[1];
      // const matchResult = path.match(/provider\/(\d+)/)?.input;
      // const providerId = matchResult ? matchResult[1] : "";
      const path = window.location.pathname;
      const parts = path.split("/");
      const providerId = parts[2];
      // const {conversationData} = await createConversation()
      //
      console.log("Check", providerId);
      const { data: conversationData } = await createConversation(
        data.user._id,
        providerId,
        data.token
      );
      //
      toast.success("Successfully Registered!", { autoClose: 3000 });
      navigate("/auth");
      console.log("creating conversation", conversationData);
      console.log("URL params", providerId);
      console.log("Client Sign Up response", data);
    } catch (error) {
      toast.error("Error Signing Up, Try Again!", { autoClose: 3000 });
      console.log("Error | Client | Sign-Up", error);
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
      <form className="auth-form px-4 py-5 px-md-5  bg-glass" onSubmit={handleSignup}>
      <h3 className="mb-4 display-5 fw-bold ls-tight"> Signup <br /> Information</h3>
        <div className="form-row">
          <div className="form-outline mb-2 w-100">
          <input
            className="bg-transparent form-control py-2"
            type="text"
            placeholder="First Name"
            value={signupData.name.first}
            onChange={(e) =>
              setSignupData({
                ...signupData,
                name: { ...signupData.name, first: e.target.value },
              })
            }
          />
          </div>
        </div>
        <div className="form-row">
        <div className="form-outline mb-2 w-100">
          <input
            type="text"
            className="bg-transparent form-control py-2"
            placeholder="Last Name"
            value={signupData.name.last}
            onChange={(e) =>
              setSignupData({
                ...signupData,
                name: { ...signupData.name, last: e.target.value },
              })
            }
          />
          </div>
        </div>

        <div className="form-row">
        <div className="form-outline mb-2 w-100">
          <input
            type="email"
            className="bg-transparent form-control py-2"
            placeholder="Enter Email"
            value={signupData.email}
            onChange={(e) =>
              setSignupData({ ...signupData, email: e.target.value })
            }
          />
          </div>
        </div>
        <div className="form-row">
        <div className="form-outline mb-2 w-100">
          <input
            type="password"
            className="bg-transparent form-control py-2"
            placeholder="Enter Password"
            value={signupData.password}
            onChange={(e) =>
              setSignupData({ ...signupData, password: e.target.value })
            }
          />
          </div>
        </div>
        <div className="form-row">
        <div className="form-outline mb-2 w-100">
          <input
            type="password"
            className="bg-transparent form-control py-2"
            placeholder="Confirm Password"
            value={signupData.confirmPassword}
            onChange={(e) =>
              setSignupData({ ...signupData, confirmPassword: e.target.value })
            }
          />
          </div>
        </div>

        <button type="submit" className="btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;