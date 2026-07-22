import React, { useContext } from 'react'
import { MyShop } from '../context/MyContext'
import { Navigate } from 'react-router';

const ProtectedRoute = ({children}) => {

  let {currentUser} =  useContext(MyShop)

  if(!currentUser){
    return <Navigate to={"/login"} />
  }

  return children
}

export default ProtectedRoute