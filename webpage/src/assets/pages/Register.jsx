import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../src/api";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await api.register(registerData);
    const data = await res.json();
    console.log(data);
    if (data.success) {
      navigate("/toupload");
    } else {
      navigate("/error");
    }
  };
  const to_login = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Register</h2>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) =>
            setRegisterData({ ...registerData, name: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setRegisterData({ ...registerData, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setRegisterData({ ...registerData, password: e.target.value })
          }
        />

        <button type="submit">Register</button>
        <p onClick={to_login}>New User ? Register</p>
      </form>
    </div>
  );
};

export default Register;
