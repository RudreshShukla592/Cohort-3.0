import React from 'react'
import ProductCard from './components/ProductCard'
import Nav from './components/Nav'

const App = () => {

  

  return (
    <div className="p-3 h-screen bg-gray-800 text-white flex flex-col gap-5">
      <Nav/>
      <ProductCard/>
    </div>
  )
}

export default App