import React, { useState } from 'react'
import "../css/login.css"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [ email , setemail ] = useState("");
  const [password , setpassword ] = useState("");
  const navigate = useNavigate(); 
 async function handleLogin(e)
{
   e.preventDefault()
     try {
         const formData = {
            email,
            password
         }
        const response = await axios.post(
          "http://localhost:4000/api/users/login",
          formData,
          {
            headers: {
              "Content-Type": "application/json", // Specify that the request contains JSON data
            },
          }
        );
         if(response)
         {   
          console.log()
                   localStorage.setItem(
                     "ID",
                     JSON.stringify(response.data.name)
                   );     
                   navigate("/todo");
         }
     } catch (error) {
      
     }
}

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={email} onChange={(e)=>{setemail(e.target.value)}} required />
        <label htmlFor="password">Password:</label>  
        <input type="password" id="password" name="password" value={password} onChange={(e)=>{setpassword(e.target.value)}} required />
           <div style={{display:"flex",justifyContent:"center"}}>
           <button type="submit" onClick={handleLogin}>Login</button>
           </div>
      </form>
      <span>Create an account ?<Link to="/signup"> SignUp</Link></span>
    </div>
  );
}

export default Login
