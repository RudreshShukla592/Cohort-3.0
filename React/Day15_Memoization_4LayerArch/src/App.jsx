import React, { useState } from 'react'
import Home from './components/Home';

const App = () => {

  console.log("App rendering..");
  const [count, setCount] = useState(0)
  

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={()=> setCount(count+1)}>Increment!!</button>
      <Home/>
    </div>
  )
}

export default App