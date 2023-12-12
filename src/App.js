import React from "react";
import { Routes, Route } from 'react-router-dom';
import HomePage from "./Components/HomePage";
import PostDetailPage from "./Components/PostDetailPage";


function App() {
  return (
    <div className="bg-black h-[100vh]">
      <Routes>
        <Route index="/" element={<HomePage/>} />
        <Route path="/post/:id" element={<PostDetailPage/>}/> 
      </Routes>
    </div>
  );
}

export default App;
