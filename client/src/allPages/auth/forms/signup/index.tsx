import React, { useState } from "react";
import { registerProvider } from "../../../../api/auth";
import "../index.css";

function Signup() {
  const [signupData, setSignupData] = useState({
    name: {
      first: "",
      last: "",
    },
    organization: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
  });
  const handleSignup = async (event: any) => {
    event.preventDefault();
    try {
      const { confirmPassword, ...registrationData } = signupData;
      const { data } = await registerProvider(registrationData);
      console.log("Sign Up response", data);
    } catch (error) {
      console.log("Error | Sign-Up", error);
    }
  };
  return (
    <form className="auth-form" onSubmit={handleSignup}>
      <div className="form-row">
        <label>First Name</label>
        <input
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
      <div className="form-row">
        <label>Last Name</label>
        <input
          type="text"
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
      <div className="form-row">
        <label>Organization</label>
        <input
          type="text"
          placeholder="Company Name"
          value={signupData.organization}
          onChange={(e) =>
            setSignupData({ ...signupData, organization: e.target.value })
          }
        />
      </div>
      <div className="form-row">
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter Email"
          value={signupData.email}
          onChange={(e) =>
            setSignupData({ ...signupData, email: e.target.value })
          }
        />
      </div>
      <div className="form-row">
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter Password"
          value={signupData.password}
          onChange={(e) =>
            setSignupData({ ...signupData, password: e.target.value })
          }
        />
      </div>
      <div className="form-row">
        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm Password"
          value={signupData.confirmPassword}
          onChange={(e) =>
            setSignupData({ ...signupData, confirmPassword: e.target.value })
          }
        />
      </div>
      <div className="form-row">
        <label>Country</label>
        <input
          type="text"
          placeholder="Enter Country"
          value={signupData.country}
          onChange={(e) =>
            setSignupData({ ...signupData, country: e.target.value })
          }
        />
      </div>
      <button type="submit" className="btn-primary">
        Sign Up
      </button>
    </form>
  );
}

export default Signup;
