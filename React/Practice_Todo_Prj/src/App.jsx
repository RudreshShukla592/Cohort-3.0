import React, { useContext } from "react";
import TodoForm from "./components/TodoForm";
import Nav from "./components/Nav";
import TodoList from "./components/TodoList";
import { MyShop } from "./context/Mycontext";

const App = () => {
  let { toggle } = useContext(MyShop);
  return (
    <div className="p-5 bg-gray-800 text-white flex flex-col gap-5">
      <Nav />

      {toggle ? (
        <div className="min-h-screen bg-gray-800 flex items-start justify-center pt-20 px-4">
          <TodoForm />
        </div>
      ) : (
        <div className="min-h-screen bg-gray-800 px-4">
          <TodoList />
        </div>
      )}

    </div>
  );
};

export default App;
