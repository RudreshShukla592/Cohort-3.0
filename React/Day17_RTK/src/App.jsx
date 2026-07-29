import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, incrementByInput, reset } from "./features/counterSlice";

const App = () => {
  let { count } = useSelector((store) => store.counter);
  let dispatch = useDispatch();

  const [inpNum, setInpNum] = useState("");

  return (
    <div className="container">
      <h1>{count}</h1>

      <div className="btn-group">
        <button onClick={() => dispatch(increment())}>Increment</button>

        <button onClick={() => dispatch(decrement())}>Decrement</button>

        <button onClick={() => dispatch(reset())}>Reset</button>

        <button onClick={()=> dispatch(incrementByInput(Number(inpNum)))}>Increment By the Below input</button>
        <input
          type="text"
          value={inpNum}
          onChange={(e) => setInpNum(e.target.value)}
          placeholder="write number"
        />
      </div>
    </div>
  );
};

export default App;
