import React, { useEffect, useState } from 'react'
import "../css/admin.css"
import axios from "axios";
const Admin = () => {
const [data , setData ] = useState([]);
  
useEffect(()=>{
      async function  fecthData()
      {
         const response = await axios.get(
           "http://localhost:4000/api/users/getuserprofile"
         );
         setData(response.data.users);
        
      }
      fecthData()
  },[])

  // Modified
  
  return (
    <>
      <header className="user">
        <div className="container">
          <div className="user-wrapper">
            <h3>Admin Dashboard</h3>
          </div>
        </div>
      </header>
      <section className="userlist">
        <div className="container">
          <div className="admin-container">
            <table className="admin-info" border={0}>
              <thead>
                 {data.map((item) => (
                  <tr key={item._id}>
                    <td className="thead">
                      <strong>
                        Username: <span>{item.name}</span>
                      </strong>
                    </td>
                    <td>
                      <strong>
                        Email: <span>{item.email}</span>
                      </strong>
                    </td>
                  </tr>
                ))} 
              </thead>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

export default Admin
