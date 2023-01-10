import React, { useState } from "react";

function Login() {
  const [loginData, setLoginData] = useState({
    id: "",
    password: "",
  });
  const handleLogin = () => {};
  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter Email"
          value={loginData.id}
          onChange={(e) => setLoginData({ ...loginData, id: e.target.value })}
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={loginData.id}
          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
        />
        <button type="submit">Login In</button>
      </form>
    </div>
  );
}

export default Login;
