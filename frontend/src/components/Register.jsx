import React from "react";
import { useState } from "react";
import axios from "axios";

export default function Register(){
    const [formData,setFormData]=useState({name:"",email:"",password:"",role:"user"});
   
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        try{
        const res=await axios.post("http://localhost:8080/api/auth/register",formData)
        alert(res.data.message)
        }catch(err){
            if(err.response && err.response.data)
            alert(err.response.data.message||"Error")
        }
    }
    return(
        <div className="flex h-screen w-screen justify-center items-center bg-red-200">
           <form onSubmit={handleSubmit} className="text-center flex flex-col shadow-md bg-amber-400 border-2 rounded-2xl p-6 m-3">
            <h2>Register</h2>
            <input className="border-1 border-black rounded-2xl p-2 m-4 w-full" type="text" name="name" placeholder="Name" onChange={handleChange}/>
            <input className="border-1 border-black rounded-2xl p-2 m-4 w-full" type="email" name="email" placeholder="Email" onChange={handleChange}/>
            <input className="border-1 border-black rounded-2xl p-2 m-4 w-full" type="password" name="password" placeholder="Password" onChange={handleChange}/>
            <select name="role" className="text-black p-2 border-1 border-black rounded-2xl m-4 w-full" onChange={handleChange} >
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
            <button>Submit</button>
           </form>
        </div>
    )
}




