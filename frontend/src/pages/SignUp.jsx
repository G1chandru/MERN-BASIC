import React, { useState } from 'react'
import "../css/signup.css";
import { Link, useNavigate } from "react-router-dom"; 
import axios from 'axios';

const Signup = () => {
  const [ name , setname ] = useState("")
  const [ password , setpassword ] = useState("")
  const [ email , setemail ] = useState("")
  const navigate = useNavigate();
 async function handleSignUp(e)
 {
        e.preventDefault();
   try {
     const formData = { 
         name,
       password,
       email
   }
        const res  = await  axios.post("http://localhost:4000/api/users/createuser",formData,
          {
              headers: {
      'Content-Type': 'application/json', // Specify that the request contains JSON data
                    }
          }
        );  
     if(res.status == 201)
      { 
          
          localStorage.setItem("ID", JSON.stringify(res.data.name)); 
          navigate("/todo")
      }        

  } catch (error) {
      
  }  
 }
 

  return (
    <>
      <div className="signup-container">
         <h2>SignUp</h2>
        <form className="signup-form">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required   value={name} onChange={(e)=>{setname(e.target.value)}}/>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required  value={email}  onChange={(e)=>{setemail(e.target.value)}} />
          <label htmlFor="password">Password:</label>  
          <input type="password" id="password" name="password" required value={password} onChange={(e)=>{setpassword(e.target.value)}} />
          <div style={{display:"flex",justifyContent:"center"}}>
          <button type="submit" onClick={handleSignUp}>Sign up</button>
          </div>
        </form>
        <span>
          Already have an account ?<Link to="/"> Login</Link>
        </span>
      </div>
    </>
  );
}

export default Signup;
