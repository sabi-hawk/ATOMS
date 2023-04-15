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
    } catch (error) {
      console.log("Error | Sign-Up", error);
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
        className="auth-form  px-4 py-5 px-md-5  bg-glass"
        onSubmit={handleSignup}
        style={{
          borderRadius: '0.35rem',
        }}
      >
        <h3 className="mb-4 display-5 fw-bold ls-tight"> Signup <br /> Information</h3>
        <div className="d-grid signup-inner">
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
                className="bg-transparent form-control py-2"
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
          </div>
          <div className="form-row">
            <div className="form-outline mb-2 w-100">
              <input
                className="bg-transparent form-control py-2"
                type="text"
                placeholder="Company Name"
                value={signupData.organization}
                onChange={(e) =>
                  setSignupData({ ...signupData, organization: e.target.value })
                }
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-outline mb-2 w-100">
              <input
                className="bg-transparent form-control py-2"
                type="email"
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
                className="bg-transparent form-control py-2"
                type="password"
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
                className="bg-transparent form-control py-2"
                type="password"
                placeholder="Confirm Password"
                value={signupData.confirmPassword}
                onChange={(e) =>
                  setSignupData({
                    ...signupData,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-outline mb-2 w-100">
              <input
                className="bg-transparent form-control py-2"
                type="text"
                placeholder="Enter Country"
                value={signupData.country}
                onChange={(e) =>
                  setSignupData({ ...signupData, country: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary py-2 w-50 mx-auto">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
