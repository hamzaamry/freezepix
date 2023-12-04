import React from 'react'
import Header from '../Header/Header'
import Routes from '../../routes/Routers'
import { useLocation } from "react-router-dom";

const Layout = () => {

    const location = useLocation();

    const routesWithoutNavbar = ["/Signup", "/Signin"];

    // Check if the current route is in the list
    const hideNavbar = routesWithoutNavbar.includes(location.pathname);


  return (
    <div>
         {!hideNavbar && <Header />}
        <div>
            <Routes />
        </div>
    </div>
  )
}

export default Layout