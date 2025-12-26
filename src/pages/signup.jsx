import "./login.css";
import { useState } from "react";
import { Link } from "react-router-dom"; 
import signupUser from "../firebase/signupUser.js";


export default function Signup() {

  const [data,setData]=useState({});

  const handleInput = (e) =>{
    setData({...data,[e.target.name]:e.target.value});
  }

  const {name,email,password}=data;
  

  const handleSubmit =  (e)=>{
    e.preventDefault();
    if(!email || !name || !password) {
      console.log("All fields are required");
      return;
    }
    signupUser(name,email,password);
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
        <button  className="login-btn">Signup with Google</button>
      </div>
    </div>
  );
}
