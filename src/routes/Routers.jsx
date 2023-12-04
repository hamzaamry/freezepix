import React from 'react'
import { Routes, Route } from "react-router-dom";

import Home from '../pages/Home';
import Signin from '../pages/Signin'

const Routers = () => {
  return (
    <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Signin" element={<Signin />} />
        
    </Routes>
  )
}

export default Routers