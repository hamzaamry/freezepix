import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


import { Routes, Route, Navigate } from "react-router-dom";

import Home from '../pages/Home';
import Signin from '../pages/Signin'

import Admin from '../pages/Admin/Admin';
import ProfilAdmin from '../pages/Admin/ProfilAdmin';
import AddAdmin from '../pages/Admin/AddAdmin';

import Customers from '../pages/Customers'
import Livraison from '../pages/Livraison';
import MarketingUser from '../pages/MarketingUser';
import Coupon from '../pages/Coupon';
import TailleImage from '../pages/TailleImage';

import Tax from '../pages/Tax';
import OrderDetails from '../pages/OrderDetails';

const Routers = () => {

{/*
const isAuthenticated = useSelector((state) => !!state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/Signin');
    }
  }, [isAuthenticated, navigate]);
*/}
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

        <Route path="/orderDetails" element={<OrderDetails />} />
        
    </Routes>
  )
}

export default Routers