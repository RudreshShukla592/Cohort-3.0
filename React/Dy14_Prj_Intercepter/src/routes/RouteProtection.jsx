import React, { useContext } from 'react'
import { MyShop } from '../context/MyContext'
import { Outlet, Navigate } from 'react-router'

const RouteProtection = () => {

  let {loggedUser} = useContext(MyShop)

   if(!loggedUser){
    return <Navigate to={"/"} />
  }

  return <Outlet/>
}

export default RouteProtection