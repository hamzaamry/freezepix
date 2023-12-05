import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";

import Home from '../pages/Home';
import Signin from '../pages/Signin'
import Admin from '../pages/Admin/Admin';
import AddAdmin from '../pages/Admin/AddAdmin';
import GestionUser from '../pages/GestionUser'
import Image from '../pages/Image';
import Livraison from '../pages/Livraison';
import MarketingUser from '../pages/MarketingUser';
import Shipping from '../pages/Shipping';


const Routers = () => {
  return (
    <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Signin" element={<Signin />} />

        <Route path="/Admin" element={<Admin />} />
        <Route path="/AddAdmin" element={<AddAdmin />} />


        <Route path="/GestionUser" element={<GestionUser />} />
        <Route path="/Image" element={<Image />} />
        <Route path="/Livraison" element={<Livraison />} />
        <Route path="/MarketingUser" element={<MarketingUser />} />
        <Route path="/Shipping" element={<Shipping />} />
        
    </Routes>
  )
}

export default Routers