import React, { useState } from 'react'

const App = () => {

  console.log("app rendering...");
  
  const [count, setCount] = useState(0)
  const [user, setUser] = useState({
    name:"Raman"
  })

  let handleCount=()=>{
   setCount(perv => perv + 1) 
  }

  let handleName = ()=>{
    user.name="Baman"
  }
  
  return (
    <div>
      <h1>Name - {user.name}</h1>
      <h2>Count - {count}</h2>
      <button onClick={handleCount}>Change count</button>
      <button onClick={handleName}>change name</button>
    </div>
  )
}

export default App