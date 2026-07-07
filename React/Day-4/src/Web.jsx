import React, { useState } from "react";

const Web = () => {

    const [formData, setFormData] = useState({})

    let handelChange = (e)=> {
        setFormData({...formData,[e.target.name]:e.target.value})
      }

  return (

    <div>
      <input 
      type="text" placeholder="Name...." 
      className="border-2" 
      onChange={handelChange}
      name="name"
      />
      <input type="text" placeholder="email"
       className="border-2" 
       onChange={handelChange}
       name="email"
      />

      <h1>name {formData.name}</h1>
      <h1>email {formData.email}</h1>
    </div>
  );
};

export default Web;
