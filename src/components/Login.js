import React from 'react'

const Login = () => {
    return (
    <form className='add-form' >
        <div className='form-control'>
            <label className='label'>Username</label>
            <input
             type='text' required='required'  
             placeholder='Enter Username' 
            /> 
        </div>
        <div className='form-control '>
            <label className='label'>Password</label>
            <input type='password' required='required'
            /> 
        </div>
        <input type='submit' className='btn btn-block' value='Login'/>
    </form>
    )
}

export default Login
