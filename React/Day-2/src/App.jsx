import { useState } from "react"
import About from "./About"


const App = () => {

  const [count, setcount] = useState(0)
  
  let increase = ()=>{
    setcount(prev => prev + 1)
    setcount(prev => prev + 1)
    setcount(prev => prev + 1)
  }
  let decrease = ()=>{
    setcount(prev => prev - 1)
  }

  return (
    <div>
      <h1>count - {count}</h1> 
      <button onClick={increase}>Increment</button>
      <button onClick={decrease}>Decrement</button>
      <About name="natwaaaaa2" age={19} />
    </div>
  )
}

export default App