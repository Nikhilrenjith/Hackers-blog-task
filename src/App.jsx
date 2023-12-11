import React from "react";
import Homepage from "./Components/Homepage";
import { Route, Routes, Link } from "react-router-dom";
const App = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </div>
  );
};

export default App;
