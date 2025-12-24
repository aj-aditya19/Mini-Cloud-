import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../src/api";
import "../styles/Login.css";
const Login = ({ setUser }) => {
  const [login_data, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handlelogin = async (e) => {
    e.preventDefault();
    // const res = await api.login(login_data);
    // const data = await res.json();
    const data = true;
    console.log(data);
    if (data) {
      setUser(login_data);
      navigate("/toupload");
    } else {
      navigate("*");
    }
  };

  const to_register = () => {
    navigate("/registerpage");
  };
  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handlelogin}>
        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) => {
            setLoginData({ ...login_data, email: e.target.value });
          }}
        ></input>
        <input
          placeholder="Password"
          type="Password"
          required
          onChange={(e) => {
            setLoginData({ ...login_data, password: e.target.value });
          }}
        ></input>
        <button type="submit">Login</button>
      </form>
      <p onClick={to_register}>New User ? Register</p>
    </div>
  );
};

export default Login;
