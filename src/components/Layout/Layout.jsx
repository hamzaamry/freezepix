import React, { useState } from "react";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import Routes from "../../routes/Routers";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const [isSidebar, setIsSidebar] = useState(true);

  const routesWithoutNavbar = ["/Signin"];
  const routesWithoutSidebar = ["/Signin"]; 

  // Check if the current route is in the respective list
  const hideNavbar = routesWithoutNavbar.includes(location.pathname);
  const hideSidebar = routesWithoutSidebar.includes(location.pathname);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "80vh" }}
    >
      {!hideNavbar && <Header />}
      <div style={{ display: "flex", flex: 1 }}>
        {!hideSidebar && <SideBar isSidebar={isSidebar} />}
        <div style={{ flex: 1, padding: "20px" }}>
          <Routes />
        </div>
      </div>
    </div>
  );
};

export default Layout;
