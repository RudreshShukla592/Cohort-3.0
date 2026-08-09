import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../../shared/ui/components/Navbar'

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white">

      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Outlet />
      </main>

    </div>
  )
}

export default MainLayout