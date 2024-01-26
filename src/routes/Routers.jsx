import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Home from '../pages/Home';
import Signin from '../pages/Signin/Signin'
import Admin from '../pages/Admin/Admin';
import ProfilAdmin from '../pages/Admin/ProfilAdmin';
import AddAdmin from '../pages/Admin/AddAdmin';
import Customers from '../pages/Management/Customers'
import Livraison from '../pages/Management/Livraison';
import MarketingUser from '../pages/MarketingUser';
import Coupon from '../pages/Management/Coupon';
import TailleImage from '../pages/Management/TailleImage';
import Tax from '../pages/Management/Tax';
import OrderDetails from '../pages/Management/OrderDetails';
import Countries from '../pages/Management/Countries';

const Routers = () => {
  return (
    <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Signin" element={<Signin />} />

        <Route path="/Admin" element={<Admin />} />
        <Route path="/ProfilAdmin" element={<ProfilAdmin />} />
        <Route path="/AddAdmin" element={<AddAdmin />} />

        <Route path="/Customers" element={<Customers />} />
        <Route path="/Livraison" element={<Livraison />} />
        <Route path="/MarketingUser" element={<MarketingUser />} />
        <Route path="/Tax" element={<Tax />} />
        <Route path="/Coupon" element={<Coupon />} />

        <Route path="/TailleImage" element={<TailleImage />} />
        <Route path="/orderDetails/:orderId" element={<OrderDetails />} />
        <Route path="/Countries" element={<Countries />} />
        
    </Routes>
  )
}

export default Routers