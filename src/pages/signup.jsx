import "./login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import signupUser from "../firebase/auth/signupUser.js";
import { googleAuth } from "../firebase/auth/googleAuth.js";


export default function Signup() {

  const [data,setData]=useState({});
  const navigate = useNavigate(); 

  const handleInput = (e) =>{
    setData({...data,[e.target.name]:e.target.value});
  }

  const {name,email,password}=data;
  

  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(!email || !name || !password) {
      console.log("All fields are required");
      return;
    }
    
    try {
      const user = await signupUser(name, email, password); // Get user back
      navigate(`/dashboard/${user.uid}`);
    } catch (error) {
      console.error("Signup failed:", error); // Handle errors (e.g., weak password, email exists)
    }
  };
  
  const handleGoogleLogin=async(e)=>{
    e.preventDefault();
    try{
      const user = await googleAuth(name, email, password); // Get user back
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
            type="text"
            name="name"
            placeholder="Enter name"
            className="input-box"
            onChange={handleInput}
          />

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
          Already have an account? <Link to ="/login">Login</Link>
          </p>
          <button type="submit" className="login-btn">
            Sign Up
          </button>
        </form>
        <p className="p-2">OR</p>
        <button  className="login-btn" onClick={handleGoogleLogin}>Signup with Google</button>
      </div>
    </div>
  );
}
