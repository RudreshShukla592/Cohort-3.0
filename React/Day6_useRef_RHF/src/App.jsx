import React from 'react'
import Form from './components/Form'
import RHF from './components/RHF'

const App = () => {
  
   
  return (
    <div className='h-screen w-full p-5 bg-gray-300 flex flex-col gap-5'>
      <h1>Below is the Form</h1>
      {/* <Form/> */}
       <RHF/>
       
    </div>
  )
}

export default App