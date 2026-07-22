import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Shop = () => {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <Navbar />

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-14 px-4 py-8 sm:px-6 lg:px-8">
        <h1>Shop page</h1>
      </main>

      <Footer />
    </div>
  )
}

export default Shop