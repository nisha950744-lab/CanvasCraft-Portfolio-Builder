import React, { useState,useContext } from "react";
import "./login.css";
import loginUser  from "../firebase/auth/loginUser";         
import UserContext from '../context/UserContext'; 
import { googleAuth } from "../firebase/auth/googleAuth.js";
import { Link, useNavigate } from "react-router-dom"; 



export default function Login() {


const [data,setData]=useState({});

const navigate = useNavigate();

  const handleInput = (e) =>{
    setData({...data,[e.target.name]:e.target.value});
  }

  const {email,password}=data;

  
 const handleSubmit = async (e) => {
   e.preventDefault();
   
  if (!email || !password) {
    console.log("All fields are required");
    return;
  }
      
  try {
    const user = await loginUser( email, password); // Get user back
    navigate(`/dashboard/${user.uid}`);
  } catch (error) {
    console.error("login failed:", error); // Handle errors (e.g., weak password, email exists)
  }
}; 

const handleGoogleLogin=async(e)=>{
    e.preventDefault();
    try{
      const user = await googleAuth(); // Get user back
      navigate(`/dashboard/${user.uid}`);
      
    }catch(error){
      console.log("error occurred while sign up",error);
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="title">CanvasX</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            className="input-box"
            onChange={handleInput}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            className="input-box"
            onChange={handleInput}
          />
         
        <p className="signup-text">
          Don't have an account? <Link to ="/signup">Create one</Link>
          </p>
          <button className="login-btn">Login</button>
        </form>
        <p className="p-2">OR</p>
        <button  className="login-btn" onClick={handleGoogleLogin}>Login with Google</button>
      </div>
    </div>
  );
}
