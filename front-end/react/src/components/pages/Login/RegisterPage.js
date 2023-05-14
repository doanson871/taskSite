import React from 'react'

import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from "react";

import './App.css'

export default function SignUpPage() {

    const name=useRef()
    const password=useRef()
    const email=useRef()
    const [showHome,setShowHome]=useState(false)
    const [show,setShow]=useState(false)
    const localSignUp=localStorage.getItem("signUp")
    const localEmail=localStorage.getItem("email")
    const localPassword=localStorage.getItem("password")
    const localName=localStorage.getItem("name")
    useEffect(()=>{
     if(localSignUp){
         setShowHome(true)
     }
     if(localEmail){
         setShow(true)
     }
    })
    const handleClick=()=>{
        if(name.current.value&&email.current.value&&password.current.value)
       {
         localStorage.setItem("name",name.current.value)
         localStorage.setItem("email",email.current.value)
         localStorage.setItem("password",password.current.value)
         localStorage.setItem("signUp",email.current.value)
         alert("Account created successfully!!")
         window.location.reload()
       }
    }
 
    return (
        <div className="text-center m-5-auto">
            <h2>Join us</h2>
            <h5>Create your personal account</h5>
            <form action="/">
                <p>
                    <label>Username</label><br/>
                    <input type="text" placeholder='Username' ref={name} />
                </p>
                <p>
                    <label>Email address</label><br/>
                    <input type="email" placeholder='Email' ref={email} />
                </p>
                <p>
                    <label>Password</label><br/>
                    <input type="password" placeholder='Password' ref={password} />
                </p>
                <p> 
                    <label>Confirm Password</label><br/>
                    <input type="password" placeholder='Confirm Password' ref={password} />
                </p>
                <label for="role-select">Role</label><br/>
                <select name="roles" id="role-select"> required
                    <option value=""> -- Pick a role -- </option>
                    <option value="Employee">Employee</option>
                    <option value="Boss">Boss</option>
                </select>
                <p>
                    <button id="sub_btn" onClick={handleClick}>Register</button>
                </p>
            </form>
            <footer>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )

}
