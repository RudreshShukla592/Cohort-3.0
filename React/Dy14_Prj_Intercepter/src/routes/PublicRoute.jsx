import React, { useContext } from 'react'
import { MyShop } from '../context/MyContext'
import { Navigate, Outlet } from 'react-router'

const PublicRoute = () => {
   let {loggedUser} = useContext(MyShop)

   if(loggedUser){
    return <Navigate to={"/main"} />
  }

  return <Outlet/>
}

export default PublicRoute