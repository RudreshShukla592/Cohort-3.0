import React from 'react'
import { Outlet, useNavigate } from 'react-router'

const Home = () => {
  let navigate =  useNavigate()
  return (
    <div>
      <h1 className='text-8xl'>Home</h1>
      <button onClick={()=> navigate("/details")}>Navigate to details</button>
      <Outlet/>
    </div>
  )
}

export default Home