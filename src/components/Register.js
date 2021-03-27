import React from 'react'

const Register = () => {
    return (
        <form className='add-form loginContainer' >
        <div className='form-contro'>
            <label className='label'>Parent/Guardian Username</label>
            <input
             type='text' required='required'  
             placeholder='Enter Name' 
            /> 
        </div>
        <div className='form-contro'>
            <label className='label'>Email</label>
            <input
             type='email' required='required'   
            /> 
        </div>
        <div className='form-contro'>
            <label className='label'>Phone Number</label>
            <input
             type='tel'  required='required'  
             placeholder='Enter 10 digit phone number' pattern="[0-9]{10}" 
            /> 
        </div>
        <div className='form-contro '>
            <label className='label' >Password</label>
            <input type='password' required='required'
            /> 
        </div>
        <div className='form-contro '>
            <label className='label'>Confirm Password</label>
            <input type='password' required='required'
            /> 
        </div>
        <input type='submit' className='butn butn-block' value='Register'/>
    </form>
    )
}

export default Register
