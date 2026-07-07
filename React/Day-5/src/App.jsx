import React from 'react'
import Login from './components/Login'
import Register from './components/Register'
import { useState } from 'react'

const App = () => {

  const [toggle, setToggle] = useState(true)
  const [users, setUsers] = useState([])
  
  return (
    <div className='bg-gray-300 h-screen flex items-center justify-center'>
      {toggle ? <Login setToggle={setToggle}/> : <Register setUsers={setUsers} setToggle={setToggle}/>}
    </div>
  )
}

export default App