import React from "react";
import Navbar from "./components/Navbar";
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./components/screens/Home";
import Signin from "./components/screens/Signin";
import Signup from "./components/screens/Signup";
import Profile from "./components/screens/Profile";
import CreatePost from "./components/screens/CreatePost";


function App() {
  return (
    <>

      <BrowserRouter>
        <Navbar />
          <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create" element={<CreatePost />} />

          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
