import React, { useState } from 'react';
import axios from "axios"

export default function Login() {
    const [formData,setFormData]=useState({email:'',password:''});
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    } 

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
          const res=await axios.post("http://localhost:8080/api/auth/login",formData);
          localStorage.setItem("token",res.data.token)
          alert(res.data.message)
          window.location.href="/dashboard"
        }catch(err){
           if(err.response && err.response.data){
            alert(err.response.data.message||"Error")
           }
        }
    }

  return (
    <div className='flex justify-center items-center h-screen w-screen'>
        <form className="flex flex-col border-2 border-amber-200 p-5 m-3 h-1/2 w-100 rounded-2xl" onSubmit={handleSubmit}>
            <h2 className='text-center'>Login</h2>
            <input className="border-2 border-amber-600 p-3 m-5 rounded-2xl" name='email' type='text' onChange={handleChange} placeholder="Email"/>
            <input className="border-2 border-amber-600 p-3 m-5 rounded-2xl" name='password' type='password' onChange={handleChange} placeholder="Password"/>
            <button>Submit</button>
        </form>
    </div>
  )
}
