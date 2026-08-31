import React from "react";
import Notes from "./components/Notes";
import { useState } from "react";
import Form from "./components/Form";

const App = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <Notes setIsVisible={setIsVisible} />

      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]">
          <div className="w-full max-w-2xl">
            <Form setIsVisible={setIsVisible} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
