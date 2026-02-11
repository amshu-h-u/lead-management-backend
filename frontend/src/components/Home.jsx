import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Home() {
const navigate=useNavigate();
const token=localStorage.getItem("token");

const handleLogout=()=>{
    localStorage.removeItem("token");
    navigate("/");
}
  return (
    <div>
        <h2>Lead Management System</h2>
        {!token?(
            <div>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
            </div>
        ):(
            <div>
                <button onClick={()=>navigate("/dashboard")}>Dashboard</button>
                <button onClick={handleLogout}>Logout</button>
            </div>
        )}
    </div>
  )
}
