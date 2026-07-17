import React from "react";
import Nav from "./component/Nav";
import AppRoute from "./routes/AppRoute";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navbar */}
      <Nav />

      {/* Sections */}
      <AppRoute />
    </div>
  );
};

export default App;
