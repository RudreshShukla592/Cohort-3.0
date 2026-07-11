import React from 'react'

const Nav = () => {
  return (
    <div className="p-6 rounded-2xl bg-black flex items-center justify-between">
        <div>logo</div>
        <div className=" flex gap-6 font-semibold">
            <p>Home</p>
            <p>Cart</p>
        </div>
        <button>LogIn</button>
    </div>
  )
}

export default Nav