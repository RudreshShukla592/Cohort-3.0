import React from 'react'
import { createBrowserRouter , RouterProvider} from "react-router";
import AuthLayout from '../layout/AuthLayout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import MainLayout from '../layout/MainLayout';
import RouteProtection from './RouteProtection';


const AppRoutes = () => {

    let router =createBrowserRouter([
        {
            path:"/",
            element: <AuthLayout/>,
            children:[
                {
                    path:"",
                    element:<Login/>
                },
                {
                    path:"register",
                    element:<Register/>
                }
            ]
        },
        {
            path:"/main",
            element:<RouteProtection/>,
            children:[
                {
                    path:"",
                    element:<MainLayout/>
                }
            ]
                
        }
    ])

  return <RouterProvider router={router}/>
}

export default AppRoutes