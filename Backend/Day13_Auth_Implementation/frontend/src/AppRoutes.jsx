import React from 'react'
import {createBrowserRouter, RouterProvider} from "react-router"
import Register from './pages/Register'
import Profile from './pages/Profile'

const AppRoutes = () => {

    const router = createBrowserRouter([
        {
            path:"/register",
            element:<Register/>
        },
        {
            path:"/profile",
            element:<Profile/>
        }
    ])

  return <RouterProvider router={router}/>
}

export default AppRoutes