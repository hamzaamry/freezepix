import React, { useState } from 'react';
import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar';
import Routes from '../../routes/Routers';
import { useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();
  const [isSidebar, setIsSidebar] = useState(true);

  const routesWithoutNavbar = ['/Signup', '/Signin'];

  // Check if the current route is in the list
  const hideNavbar = routesWithoutNavbar.includes(location.pathname);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!hideNavbar && <Header />}
      <div style={{ display: 'flex', flex: 1 }}>
        <SideBar isSidebar={isSidebar} />
        <div style={{ flex: 1, padding: '20px' }}>
          <Routes />
        </div>
      </div>
    </div>
  );
};

export default Layout;
