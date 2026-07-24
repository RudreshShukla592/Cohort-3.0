import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, incrementByinput } from "./redux/feature/counterSlice";

const App = () => {
  // for work to done
  const dispatch = useDispatch();

  // to show the work on ui which is now done
  const count = useSelector((state) => state.counter.value);

  const [num, setnum] = useState(5)

  return (
    <div className="container">
      <h1>{count}</h1>

      <div className="btn-group">
        <button
          onClick={() => {
            dispatch(increment());
          }}
        >
          Increment
        </button>

        <button
          onClick={() => {
            dispatch(decrement());
          }}
        >
          Decrement
        </button>
        <input 
        type="text"
        value={num} 
        onChange={(e)=> setnum(e.target.value)}
        />
        <button
          onClick={() => {
            dispatch(incrementByinput(Number(num)));
          }}
        >
          incrementByinput
        </button>
      </div>
    </div>
  );
};

export default App;
