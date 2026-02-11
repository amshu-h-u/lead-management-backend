import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"

export default function Dashboard() {
    const navigate=useNavigate();
    const [leads,setLeads]=useState([])
    useEffect(()=>{
        const token=localStorage.getItem("token");
        if(!token){
            navigate("/login")
            return;
        }
        const fetchLeads=async()=>{
            try{
               const res=await axios.get(
                "http://localhost:8080/api/lead/leads",{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
               )
               setLeads(res.data.leads||res.data);
            }catch(err){
               console.log(err)
            }
        }
        fetchLeads();
    },[navigate]);

    const handleLogout=()=>{
        localStorage.removeItem('token');
        navigate("/");
    }

  return (
    <div>
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
        <div>
            <h2>Leads</h2>
            {leads.length===0?(
                <p>No leads found</p>
            ):(
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Status</th>
                            <th>Source</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leads.map((lead)=>(
                           <tr key={lead._id}>
                            <td>{lead.name}</td>
                            <td>{lead.email}</td>
                            <td>{lead.phone}</td>
                            <td>{lead.status}</td>
                            <td>{lead.source}</td>
                           </tr> 
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    </div>
  )
}
