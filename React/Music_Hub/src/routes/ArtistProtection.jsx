import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router'
import { AuthShop } from '../context/AuthContext'

const ArtistProtection = () => {

    let {currentUser} = useContext(AuthShop)

    if(currentUser.role !== "artist"){
        return <Navigate to={"/main/"}/>
    }
    

  return <Outlet/>
}

export default ArtistProtection