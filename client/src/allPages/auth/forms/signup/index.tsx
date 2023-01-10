import React, { useState } from "react";

function Signup() {
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    id: "",
    password: "",
    confirmPassword: "",
    country: "",
  });
  const handleSignup = () => {};
  return (
    <div>
      <form onSubmit={handleSignup}>
      <input
          type="text"
          placeholder="First Name"
          value={signupData.id}
          onChange={(e) => setSignupData({ ...signupData, firstName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={signupData.id}
          onChange={(e) => setSignupData({ ...signupData, lastName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Company Name"
          value={signupData.id}
          onChange={(e) => setSignupData({ ...signupData, companyName: e.target.value })}
        />
        <input
          type="email"
          placeholder="Enter Email"
          value={signupData.id}
          onChange={(e) => setSignupData({ ...signupData, id: e.target.value })}
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={signupData.id}
          onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={signupData.id}
          onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
        />
        <input
          type="text"
          placeholder="Enter Country"
          value={signupData.id}
          onChange={(e) => setSignupData({ ...signupData, country: e.target.value })}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
