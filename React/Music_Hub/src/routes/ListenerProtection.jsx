import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router'
import { AuthShop } from '../context/AuthContext'

const ListenerProtection = () => {
  let {currentUser} = useContext(AuthShop)

    if(currentUser.role !== "listener"){
        return <Navigate to={"/main/"}/>
    }
    

  return <Outlet/>
}

export default ListenerProtection