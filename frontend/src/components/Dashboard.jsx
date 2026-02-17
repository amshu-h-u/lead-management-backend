import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"

export default function Dashboard() {

  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);

  // Fetch leads
  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:8080/api/lead/leads",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setLeads(res.data.leads || res.data);

    } catch (err) {
      console.log(err);
    }
  };

  // Run when page loads
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetchLeads();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>

      <div>
        <h1>Dashboard</h1>

        <button onClick={() => navigate("/addlead")}>
          Add Lead
        </button>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div>
        <h2>Leads</h2>

        {leads.length === 0 ? (
          <p>No leads found</p>
        ) : (
          <table border="1">
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
              {leads.map((lead) => (
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
  );
}





// import React, { useState } from 'react'
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function AddLead() {

//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     status: "New",
//     source: "website"
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const token = localStorage.getItem("token");

//       await axios.post(
//         "http://localhost:8080/api/lead/",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//       alert("Lead Added Successfully ✅");

//       // Reset form
//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         status: "New",
//         source: "website"
//       });

//       // Go back to dashboard
//       navigate("/dashboard");

//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div>
//       <h3>Add Lead</h3>

//       <form onSubmit={handleSubmit}>
//         <input
//           name="name"
//           placeholder="Name"
//           value={formData.name}
//           onChange={handleChange}
//         />

//         <input
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//         />

//         <input
//           name="phone"
//           placeholder="Phone"
//           value={formData.phone}
//           onChange={handleChange}
//         />

//         <select
//           name="status"
//           value={formData.status}
//           onChange={handleChange}
//         >
//           <option value="New">New</option>
//           <option value="Contacted">Contacted</option>
//           <option value="Converted">Converted</option>
//         </select>

//         <select
//           name="source"
//           value={formData.source}
//           onChange={handleChange}
//         >
//           <option value="website">Website</option>
//           <option value="facebook">Facebook</option>
//           <option value="referal">Referral</option>
//         </select>

//         <button type="submit">Add Lead</button>
//       </form>
//     </div>
//   );
// }
