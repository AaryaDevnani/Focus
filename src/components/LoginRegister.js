import React from 'react'
import { useState } from 'react'
import Login from './Login'
import Register from './Register'

function LoginRegister() {
    const [showLogin,setShowLogin]=useState(true)
    const [showRegister,setShowRegister]=useState(false)
    const onLogin=()=>{
        if(!showLogin)
        {
            setShowLogin(!showLogin)
            setShowRegister(!showRegister)
        }
    }
    const onRegister=()=>{
        if(!showRegister)
        {
            setShowRegister(!showRegister)
            setShowLogin(!showLogin)
        }
    }
    return (
        <div  >
            <div className='center'>
            <button className='loginBtn'
             onClick={onLogin}  >Login</button>
             <span><b>or</b></span>
             <button className='loginBtn' 
             onClick={onRegister} >Register</button> 
            </div>
            {showLogin &&  <div className='loginContainer'>
                <Login />
            </div> }

            {showRegister && <div className='loginContainer'>
                <Register />
            </div> }
        </div>
    )
}

export default LoginRegister
