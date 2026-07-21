import React from 'react'
import { Navigate } from 'react-router';

const ProtectionRoute = ({children}) => {
    let isAdmin = false;

    if(!isAdmin){
        <Navigate to={"/"} />
    }
  return children
}

export default ProtectionRoute