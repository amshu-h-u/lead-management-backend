import React from 'react'
import Register from "./components/Register";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from "./components/Login";
import Home from './components/Home';
import Dashboard from './components/Dashboard';

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={ <Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
    </BrowserRouter> 
  )
}
