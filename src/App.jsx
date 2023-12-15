import React from "react";
import Homepage from "./Components/Homepage";
import { Route, Routes } from "react-router-dom";
import Details from "./Components/Details";
const App = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </div>
  );
};

export default App;
