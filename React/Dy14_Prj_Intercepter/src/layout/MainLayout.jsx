import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router'

const MainLayout = () => {
  return (
    <div className="h-screen p-2 flex grid grid-cols-[1fr_6fr] ">
      <Navbar/>
      <div className='h-full overflow-auto p-2'>
        <Outlet/>
      </div>
    </div>
  )
}

export default MainLayout