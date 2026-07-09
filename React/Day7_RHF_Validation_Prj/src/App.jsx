import React, { useState } from "react";
import Nav from "./components/Nav";
import UserCard from "./components/UserCard";
import Form from "./components/Form";

const App = () => {
  const [toggle, setToggle] = useState(false);
  const [users, setUsers] = useState([])
  return (
    <div className="p-3 h-screen bg-gray-800 text-white flex flex-col gap-5">
      <Nav setToggle={ setToggle}/>

      {toggle ? (
        <div className="flex gap-4">
          {users.map((elem)=>{
            return <UserCard  user={elem}/>
          })}
        </div>
      ) : (
        <div className="flex justify-center items-center h-[70%]">
          <Form setUsers={setUsers} setToggle={ setToggle}/>
        </div>
      )}
    </div>
  );
};

export default App;
