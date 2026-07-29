import React, { useContext } from 'react'
import { AuthShop } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router'

const RouteProtection = () => {

  let {currentUser} = useContext(AuthShop)

  if(!currentUser){
     return <Navigate to={"/"} />
  }

  return <Outlet/>
}

export default RouteProtection