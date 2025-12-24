import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Footer.css";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="footer">
      <button onClick={() => navigate("/toupload")}>Upload Document</button>
      <button onClick={() => navigate("/document")}>My Uploads</button>
    </div>
  );
};
export default Footer;
