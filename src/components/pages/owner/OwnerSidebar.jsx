import React from 'react'
import { Link, NavLink } from "react-router-dom";
import Logo from "../../../assets/siteLogoBlue.png"

const OwnerSidebar = ({ children }) => {

    const menuItem = [
      {
        path: "/Dashboard",
        name: "Dashboard",
        icon: "",
      },
      {
        path: "/Employees",
        name: "Xodimlar",
        icon: "",
      },
      {
        path: "/Attendance",
        name: "Yo'qlama",
        icon: "",
      },
      {
        path: "/Salary",
        name: "Oylik maosh",
        icon: "",
      },
      {
        path: "/SoldProducts",
        name: "Sotilgan Tovar",
        icon: "",
      },
      {
        path: "/InputProduct",
        name: "Qabul qilingan tovar",
        icon: "",
      },
      {
        path: "/Order",
        name: "Buyurtmalar",
        icon: "",
      },
      {
        path: "/StoreRoom",
        name: "Sklad",
        icon: "",
      },
      {
        path: "/FinishedProducts",
        name: "Finished Product",
        icon: "",
      },
      {
        path: "/ProductPrice",
        name: "Tan narxlar",
        icon: "",
      },
    ];

  return (
    <>
      <div className="container">
        <div className="sidebar">
          <div className="top_section">
            <Link to={"/Dashboard"} className="logo"><img className="siteLogo" src={Logo} alt="site-logo" /></Link>

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
    </>
  )
}

export default OwnerSidebar