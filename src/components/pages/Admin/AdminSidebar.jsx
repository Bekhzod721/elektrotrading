import React from "react";
import './AdminSidebar.css'
import { Link, NavLink } from "react-router-dom";
import Logo from "../../../assets/siteLogoBlue.png"

const AdminSidebar = ({ children }) => {
  const menuItem = [
    {
      path: "/",
      name: "Dashboard",
      icon: "",
    },
    {
      path: "/AddEmployees",
      name: "Xodimlar",
      icon: "",
    },
    {
      path: "/AddAttendance",
      name: "Yo'qlama",
      icon: "",
    },
    {
      path: "/AddSalary",
      name: "Oylik maosh",
      icon: "",
    },
    {
      path: "/AddSoldProducts",
      name: "Sotilgan Tovar",
      icon: "",
    },
    {
      path: "/AddInputProduct",
      name: "Qabul qilingan tovar",
      icon: "",
    },
    {
      path: "/AddOrder",
      name: "Buyurtmalar",
      icon: "",
    },
    {
      path: "/AddStoreRoom",
      name: "Sklad",
      icon: "",
    },
    {
      path: "/AddFinishedProducts",
      name: "Finished Product",
      icon: "",
    },
    {
      path: "/AddProductPrice",
      name: "Tan narxlar",
      icon: "",
    },
    {
      path: "/CreateUser",
      name: "Create User",
      icon: "",
    },
  ];
  return (
    <div >
      <div className="container">
        <div className="sidebar">
          <div className="top_section">
            <Link to={"/"} className="logo"><img className="siteLogo" src={Logo} alt="site-logo" /></Link>

            {menuItem.map((item, index) => (
              <NavLink to={item.path} key={index} className="links">
                  <div className="sidebarLink">
                     <div className="icon">{item.icon}</div>
                      <div className="link__text">{item.name}</div>
                  </div>
              </NavLink>
            ))}
          </div>
        </div>

        <main className="MainSidebar">{children}</main>
      </div>
    </div>
  );
};

export default AdminSidebar;
