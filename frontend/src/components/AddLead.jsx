import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddLead() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "New",
    source: "website"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:8080/api/lead/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Lead Added Successfully ✅");

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        status: "New",
        source: "website"
      });

      // Go back to dashboard
      navigate("/dashboard");

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h3>Add Lead</h3>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Converted">Converted</option>
        </select>

        <select
          name="source"
          value={formData.source}
          onChange={handleChange}
        >
          <option value="website">Website</option>
          <option value="facebook">Facebook</option>
          <option value="referal">Referral</option>
        </select>

        <button type="submit">Add Lead</button>
      </form>
    </div>
  );
}










// import React, { useState } from 'react'
// import axios from "axios";
// export default function AddLead({onLeadAdded}) {
//     const [formData,setFormData]=useState({name:"",email:"",phone:"",status:"New",source:"website"})
//     const handleChange=(e)=>{
//       setFormData({...formData,[e.target.name]:e.target.value})
//     }
//     const handleSubmit=async(e)=>{
//       e.preventDefault();
//       try{
//         const token=localStorage.getItem("token")
//         const res=await axios.post("http://localhost:8080/api/lead/",formData,{
//           headers:{
//             Authorization:`Bearer ${token}`
//           }
//         })
//         alert(res.data.message);
//         onLeadAdded();
//         setFormData({
//           name:"",email:"",phone:"",status:"New",source:"website"
//         })
//       }catch(err){
//          console.log(err)
//       }
//     }
//   return (
//     <form onSubmit={handleSubmit}>
//       <h3>Add Lead</h3>
//       <input name="name" placeholder="Name" value={formData.name} onChange={handleChange}/>
//       <input name="email" placeholder="Email" value={formData.email} onChange={handleChange}/>
//       <input name="phone" placeholder='Phone' value={formData.phone} onChange={handleChange}/>
//       <select name="status" value={formData.status} onChange={handleChange}>
//         <option value="New">New</option>
//         <option value="Contacted">Contacted</option>
//         <option value="Converted">Converted</option>
//       </select>
//       <select name="source" value={formData.source} onChange={handleChange}>
//         <option value="website">Website</option>
//         <option value="facebook">Facebook</option>
//         <option value="referal">Referral</option>
//       </select>
//       <button type="submit">Add Lead</button>
//     </form>

//   )
// }
