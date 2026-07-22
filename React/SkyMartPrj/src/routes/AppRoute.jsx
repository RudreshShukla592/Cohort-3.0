import React from 'react'
import { Routes, Route } from "react-router";
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home'

const AppRoute = () => {
  return (
    <Routes>
       <Route path="/login" element={<Login/>} />
       <Route path="/register" element={<Register/>} />   
       <Route path="/home" element={<Home/>} />   
    </Routes>
  )
}

export default AppRoute