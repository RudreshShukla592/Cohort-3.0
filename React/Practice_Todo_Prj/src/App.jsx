import React, { useContext } from "react";
import TodoForm from "./components/TodoForm";
import Nav from "./components/Nav";
import TodoList from "./components/TodoList";
import { MyShop } from "./context/Mycontext";

const App = () => {
  let { toggle } = useContext(MyShop);
  return (
    <div className="p-3 h-screen bg-gray-800 text-white flex flex-col gap-5">
      <Nav />

      {toggle ? (
        <div>
          <TodoForm />
        </div>
      ) : (
        <div>
          <TodoList />
        </div>
      )}
      
    </div>
  );
};

export default App;
