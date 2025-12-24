import React from "react";
import "../styles/MainLayout.css";
const Navbar = ({ user }) => {
  return (
    <div className="navbar">
      <div className="logo">MyApp</div>
      <div className="user">{user.email}</div>
    </div>
  );
};

export default Navbar;
