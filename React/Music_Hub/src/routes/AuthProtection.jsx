import React, { useContext } from 'react'
import { AuthShop } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router'

const AuthProtection = () => {
  let {currentUser} = useContext(AuthShop)

  if(currentUser){
     return <Navigate to={"/main"} replace />
  }

  return <Outlet/>
}

export default AuthProtection