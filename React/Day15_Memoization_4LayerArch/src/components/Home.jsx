import React from 'react'

const Home = ({ greet}) => {
  console.log("Home rendering.....");
    
 
  return (
    <div>
         <h1>Home part below</h1>
       
     
    </div>
  )
}

export default React.memo(Home);