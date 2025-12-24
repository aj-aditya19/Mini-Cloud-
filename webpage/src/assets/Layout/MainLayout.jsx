import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import "../styles/MainLayout.css";
const MainLayout = ({ user }) => {
  return (
    <>
      <Navbar user={user} />
      <div className="main-content">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
