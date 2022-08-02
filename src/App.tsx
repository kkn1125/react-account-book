import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/templates/Layout";
import About from "./pages/About";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='' element={<Home />} />
        <Route path='about' element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;
