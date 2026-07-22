import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Cart = () => {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <Navbar />

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-14 px-4 py-8 sm:px-6 lg:px-8">
        <h1>Cart page</h1>
      </main>

      <Footer />
    </div>
  )
}

export default Cart