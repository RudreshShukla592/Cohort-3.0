import React from "react";
import { Routes, Route } from "react-router";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Details from "../pages/Details";

const AppRoute = () => {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12 space-y-24">
      <Routes>
        <Route path="/" element={<Home />} >
           <Route path="details" element={<Details/>}/>
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </main>
  );
};

export default AppRoute;
