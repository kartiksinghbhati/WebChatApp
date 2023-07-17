import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from "./Components/Chat/Chat";
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import SetAvatar from './Components/SetAvatar/SetAvatar';

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/setavatar" element={<SetAvatar/>}/>
          <Route exact path="/" element={<Chat/>}/>
           
        </Routes>
      </Router>
    </>
  )
}
