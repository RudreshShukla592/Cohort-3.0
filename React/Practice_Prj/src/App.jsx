import React, { useState } from "react";
import Nav from "./components/Nav";
import Form from "./components/Form";
import Usercard from "./components/Usercard";

const App = () => {
  const [toggle, setToggle] = useState(true);
  const [users, setUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("users")) || [];
  });
  const [updata, setUpdata] = useState(null);
  console.log(users);

  const delBtn = (id) => {
    let filterUser = users.filter((val, idx) => idx !== id);
    setUsers(filterUser);
    localStorage.setItem("users", JSON.stringify(filterUser));
  };

  return (
    <div className="p-3 h-screen bg-gray-800 text-white flex flex-col gap-5">
      <Nav setToggle={setToggle} />

      {toggle ? (
        <div className="flex gap-4 flex-wrap">
          {users.map((user, idx) => {
            return (
              <Usercard
                setUpdata={setUpdata}
                idx={idx}
                delBtn={delBtn}
                key={user.id}
                user={user}
                setToggle={setToggle}
              />
            );
          })}
        </div>
      ) : (
        <div className="flex justify-center items-center h-[70%]">
          <Form
            setUpdata={setUpdata}
            updata={updata}
            users={users}
            setUsers={setUsers}
            setToggle={setToggle}
          />
        </div>
      )}
    </div>
  );
};

export default App;
