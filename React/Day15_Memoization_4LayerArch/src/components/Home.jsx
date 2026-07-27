import React, { useState } from 'react'

const Home = () => {
  console.log("Home rendering.....");
    
  const [count, setCount] = useState(5)
  return (
    <div>
         <h1>Home part below</h1>
       <h1>{count}</h1>
      <button onClick={()=> setCount(count+1)}>Increment from 5</button>
     
    </div>
  )
}

export default React.memo(Home);