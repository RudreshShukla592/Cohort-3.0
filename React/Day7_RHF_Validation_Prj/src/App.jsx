import React, { useState } from "react";
import Nav from "./components/Nav";
import UserCard from "./components/UserCard";
import Form from "./components/Form";

const App = () => {
  const [toggle, setToggle] = useState(false);
  const [users, setUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("users")) || [];
  });
  const [update, setUpdate] = useState(null)

  const delUser = (id)=>{
    let filterUser = users.filter((val,idx)=> idx !== id)
    setUsers(filterUser)
    localStorage.setItem("users",JSON.stringify(filterUser)) 
  }

  return (
    <div className="p-3 h-screen bg-gray-800 text-white flex flex-col gap-5">
      <Nav setToggle={setToggle} />

      {toggle ? (
        <div className="flex gap-4 flex-wrap">
          {users.map((elem, idx) => {
            return <UserCard setUpdate={setUpdate} idx={idx} delUser={delUser} key={idx} user={elem} setToggle={setToggle} />;
          })}
        </div>
      ) : (
        <div className="flex justify-center items-center h-[70%]">
          <Form update={update} users={users} setUsers={setUsers} setToggle={setToggle} />
        </div>
      )}
    </div>
  );
};

export default App;
