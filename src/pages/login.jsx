import React, { useState,useContext } from "react";
import "./login.css";
import loginUser  from "../firebase/loginUser";         
import { Link } from "react-router-dom";
import UserContext from '../context/UserContext'; 



export default function Login() {


const [data,setData]=useState({});

  const handleInput = (e) =>{
    setData({...data,[e.target.name]:e.target.value});
  }

  const {email,password}=data;

  /*const handleSubmit = (e)=>{
    e.preventDefault();
    if(!email || !password){
      console.log("All fields are required");
      return;
    } 

    loginUser(email,password);
  }*/
 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    console.log("All fields are required");
    return;
  }

  await loginUser(email, password);
};

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
         
        </p>
          <button className="login-btn">Login</button>
        </form>
        <p className="p-2">OR</p>
        <button  className="login-btn">Login with Google</button>
      </div>
    </div>
  );
}
