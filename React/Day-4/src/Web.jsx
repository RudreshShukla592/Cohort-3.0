import React, { useState } from "react";

const Web = () => {

    const [name, setName] = useState("")

  return (

    <div>
      <input 
      type="text" placeholder="Name...." 
      className="border-2" 
      onChange={(e)=> {
        setName(e.target.value)
      }}
      />
      <h1>name {name}</h1>
    </div>
  );
};

export default Web;
